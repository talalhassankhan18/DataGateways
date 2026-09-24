import { describe, expect, it } from 'vitest';
import { render as baseRender, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { ContactWizard } from './ContactWizard';
import { contact } from '@/content/contact';

/** Step 3 renders router links, so the wizard always needs a router around it. */
const render = () => baseRender(<ContactWizard />, { wrapper: MemoryRouter });

const { labels, step1, step2, step3 } = contact.wizard;

const openEvaluateBranch = async (user: ReturnType<typeof userEvent.setup>) => {
  await user.click(screen.getByRole('button', { name: new RegExp(step1.options[0].title, 'i') }));
};

/**
 * The visible "01 / 03" is split across spans for styling, so it cannot be matched as one string.
 * The screen-reader sentence carries the same fact and is the thing that actually has to be right.
 */
const expectStep = (step: number) => {
  const { stepWord, progressOf } = labels;
  expect(
    screen.getByText(`${stepWord} ${step} ${progressOf} ${contact.wizard.totalSteps}`),
  ).toBeInTheDocument();
};

describe('ContactWizard', () => {
  it('starts on step 1 with no way back', () => {
    render();

    expectStep(1);
    expect(screen.queryByRole('button', { name: labels.back })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: labels.startOver })).not.toBeInTheDocument();
  });

  it('branches to the question that belongs to the chosen intent', async () => {
    const user = userEvent.setup();
    render();

    await openEvaluateBranch(user);

    expectStep(2);
    for (const option of step2.evaluate.options) {
      expect(screen.getByRole('button', { name: new RegExp(option.title, 'i') })).toBeInTheDocument();
    }
    // The partner branch's qualifying question must not leak into the evaluate branch.
    expect(
      screen.queryByRole('button', { name: new RegExp(step2.partner.options[0].title, 'i') }),
    ).not.toBeInTheDocument();
  });

  it('reaches the closing panel with the routed mailbox for that branch', async () => {
    const user = userEvent.setup();
    render();

    await openEvaluateBranch(user);
    await user.click(
      screen.getByRole('button', { name: new RegExp(step2.evaluate.options[0].title, 'i') }),
    );

    expectStep(3);
    expect(
      screen.getAllByRole('link', { name: step3.evaluate.email.value })[0],
    ).toHaveAttribute('href', `mailto:${step3.evaluate.email.value}`);
  });

  it('keeps the earlier answer when going back', async () => {
    const user = userEvent.setup();
    render();

    await openEvaluateBranch(user);
    await user.click(
      screen.getByRole('button', { name: new RegExp(step2.evaluate.options[0].title, 'i') }),
    );
    await user.click(screen.getByRole('button', { name: labels.back }));

    // Back from step 3 lands on step 2 still inside the evaluate branch, not at the start.
    expectStep(2);
    expect(
      screen.getByRole('button', { name: new RegExp(step2.evaluate.options[0].title, 'i') }),
    ).toBeInTheDocument();
  });

  it('clears every answer on start over', async () => {
    const user = userEvent.setup();
    render();

    await openEvaluateBranch(user);
    await user.click(screen.getByRole('button', { name: labels.startOver }));

    expectStep(1);
    expect(
      screen.getByRole('button', { name: new RegExp(step1.options[0].title, 'i') }),
    ).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: labels.back })).not.toBeInTheDocument();
  });

  it('moves focus to the step heading, so keyboard focus is never stranded', async () => {
    const user = userEvent.setup();
    render();

    await openEvaluateBranch(user);

    // The button that had focus no longer exists after the step change.
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveFocus();
  });

  it('announces the step change politely for screen readers', async () => {
    const user = userEvent.setup();
    const { container } = render();

    await openEvaluateBranch(user);

    const live = container.querySelector('[aria-live="polite"]');
    expect(live).not.toBeNull();
    expect(within(live as HTMLElement).getByText(/Step 2 of 3/)).toBeInTheDocument();
  });

  it('is fully operable from the keyboard', async () => {
    const user = userEvent.setup();
    render();

    await user.tab();
    // Tab reaches the first intent option and Enter selects it — no pointer required.
    const first = screen.getByRole('button', { name: new RegExp(step1.options[0].title, 'i') });
    while (document.activeElement !== first) await user.tab();
    await user.keyboard('{Enter}');

    expectStep(2);
  });
});
