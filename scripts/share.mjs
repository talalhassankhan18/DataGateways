#!/usr/bin/env node
/**
 * Puts the local dev server on a public URL, so someone on a different network can look at it.
 *
 * This opens a Cloudflare "quick tunnel": an outbound connection from this machine to Cloudflare,
 * which hands back a throwaway https://<random>.trycloudflare.com address and forwards requests
 * back down it. No account, no router configuration, nothing listening on your public IP.
 *
 *   npm run share            # tunnels http://localhost:3000
 *   npm run share -- 4173    # tunnels some other port
 *
 * Read this before you send the link to anyone:
 *
 *   - The URL is PUBLIC and UNAUTHENTICATED. It is unguessable, not private. Anyone who has it,
 *     or who is forwarded it, can open the site.
 *   - It lives only while this command runs. Ctrl-C, sleep the machine or drop the Wi-Fi and the
 *     link dies. A new run gives a different address.
 *   - Whoever opens it is reading YOUR dev server — current working state, source maps and all.
 *   - The site still carries unconfirmed compliance marks and an invented partner directory.
 *     See docs/PRE-LAUNCH-SIGNOFF.md. Fine for a named reviewer; not fine somewhere indexable.
 *
 * For a review, `npm run build && npm run preview` first and share that instead: it is the bundle
 * that would actually ship, it loads faster over a tunnel, and it has no HMR socket to fail.
 */
import { spawn } from 'node:child_process';
import { chmod, mkdir, rename, stat } from 'node:fs/promises';
import { createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const toolsDir = join(root, '.tools');

const port = process.argv[2] ?? '3000';

if (!/^\d+$/.test(port)) {
  console.error(`share: "${port}" is not a port number.`);
  process.exit(1);
}

/** Official Cloudflare release assets, by platform. */
const ASSET = {
  win32: { x64: 'cloudflared-windows-amd64.exe', arm64: 'cloudflared-windows-arm64.exe' },
  darwin: { x64: 'cloudflared-darwin-amd64.tgz', arm64: 'cloudflared-darwin-arm64.tgz' },
  linux: { x64: 'cloudflared-linux-amd64', arm64: 'cloudflared-linux-arm64' },
};

const asset = ASSET[process.platform]?.[process.arch];
if (!asset) {
  console.error(
    `share: no cloudflared build for ${process.platform}/${process.arch}.\n` +
      '       Install it yourself and run: cloudflared tunnel --url http://localhost:' + port,
  );
  process.exit(1);
}

if (asset.endsWith('.tgz')) {
  // The macOS asset is an archive, and unpacking it here would mean shipping a tar dependency for
  // one platform. Homebrew is the supported path there anyway.
  console.error(
    'share: on macOS install cloudflared with `brew install cloudflared`, then run:\n' +
      `       cloudflared tunnel --url http://localhost:${port}`,
  );
  process.exit(1);
}

const binary = join(toolsDir, process.platform === 'win32' ? 'cloudflared.exe' : 'cloudflared');

const exists = await stat(binary).then((s) => s.isFile() && s.size > 0).catch(() => false);

if (!exists) {
  const url = `https://github.com/cloudflare/cloudflared/releases/latest/download/${asset}`;
  console.log(`share: fetching cloudflared from ${url}`);
  console.log('       (~55 MB, once — it lands in .tools/, which is gitignored)');

  const response = await fetch(url, { redirect: 'follow' });
  if (!response.ok || !response.body) {
    console.error(`share: download failed — ${response.status} ${response.statusText}`);
    process.exit(1);
  }

  await mkdir(toolsDir, { recursive: true });
  // Written to a temporary name and renamed, so an interrupted download cannot leave a truncated
  // binary behind that the next run would happily try to execute.
  const partial = `${binary}.partial`;
  await pipeline(response.body, createWriteStream(partial));
  await rename(partial, binary);
  if (process.platform !== 'win32') await chmod(binary, 0o755);
}

console.log('');
console.log(`share: tunnelling http://localhost:${port} — the public URL appears below.`);
console.log('share: the link is public and unauthenticated, and dies when you stop this (Ctrl-C).');
console.log('');

/** Runs a child to completion and resolves with its exit code. Ctrl-C is handed straight through. */
const run = (cmd, args) =>
  new Promise((resolve) => {
    const child = spawn(cmd, args, { stdio: 'inherit', shell: process.platform === 'win32' });
    const forward = (sig) => child.kill(sig);
    for (const sig of ['SIGINT', 'SIGTERM']) process.on(sig, forward);
    child.on('exit', (code, signal) => {
      for (const sig of ['SIGINT', 'SIGTERM']) process.off(sig, forward);
      resolve(signal ? 1 : (code ?? 0));
    });
    child.on('error', () => resolve(1));
  });

/*
 * Cloudflare first, because its URL opens straight onto the site. It registers a quick tunnel by
 * POSTing to api.trycloudflare.com, and gives up on a timeout shorter than that request takes on a
 * slow or filtered connection — on the network this was built on the POST reliably took ~26s and
 * cloudflared always aborted. When that happens it is the network, not the setup, so fall through
 * rather than leaving the user with a dead command.
 *
 * `--edge-ip-version 4` and `--protocol http2` skip the two things that most often hang: an IPv6
 * route that goes nowhere, and QUIC on UDP 7844 being blocked.
 */
const cloudflareExit = await run(binary, [
  'tunnel',
  '--no-autoupdate',
  '--edge-ip-version',
  '4',
  '--protocol',
  'http2',
  '--url',
  `http://localhost:${port}`,
]);

if (cloudflareExit === 0) process.exit(0);

console.log('');
console.log('share: Cloudflare would not open a tunnel from this network — falling back to');
console.log('       localtunnel. Note that it shows visitors a warning page first, and they have');
console.log('       to type this machine\'s public IP to get past it. That IP is on the page.');
console.log('');

process.exit(
  await run('npx', ['--yes', 'localtunnel', '--port', String(port), '--subdomain', 'datagateways-preview']),
);
