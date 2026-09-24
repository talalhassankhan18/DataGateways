import { useId, useRef, useState } from 'react';
import {
  CONTACT_FIELD_LIMITS,
  type ContactBranch,
  type ContactPayload,
} from '@datagateways/shared';
import { Button } from '@/components/primitives/Button';
import { SplitHeading } from '@/components/primitives/SplitHeading';
import { ContactError, postContact } from '@/lib/api';
import { cn } from '@/lib/cn';
import { contact } from '@/content/contact';

export interface ContactFormProps {
  branch: ContactBranch;
  qualifier: string;
  /** When the wizard was opened. The API rejects anything completed impossibly fast. */
  startedAt: number;
}

type FieldName = 'name' | 'email' | 'organisation' | 'message';
type Status = 'idle' | 'sending' | 'sent' | 'error';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const EMPTY = { name: '', email: '', organisation: '', message: '', website: '' };

const FIELD_CLASS =
  'w-full rounded-sm border bg-bg-base px-4 py-3 text-body-sm text-ink-primary transition-colors duration-hover placeholder:text-ink-muted';

export function ContactForm({ branch, qualifier, startedAt }: ContactFormProps) {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [status, setStatus] = useState<Status>('idle');
  const [formError, setFormError] = useState<string | null>(null);
  const [reference, setReference] = useState('');

  const fieldId = useId();
  const successRef = useRef<HTMLParagraphElement>(null);

  const { fields, errors: messages } = contact.form;

  const setValue = (name: keyof typeof EMPTY, value: string) =>
    setValues((previous) => ({ ...previous, [name]: value }));

  const validate = (): boolean => {
    const next: Partial<Record<FieldName, string>> = {};

    if (values.name.trim().length === 0) next.name = messages.name;
    else if (values.name.length > CONTACT_FIELD_LIMITS.name) next.name = messages.tooLong;

    if (!EMAIL.test(values.email.trim())) next.email = messages.email;
    else if (values.email.length > CONTACT_FIELD_LIMITS.email) next.email = messages.tooLong;

    if (values.organisation.trim().length === 0) next.organisation = messages.organisation;
    else if (values.organisation.length > CONTACT_FIELD_LIMITS.organisation)
      next.organisation = messages.tooLong;

    if (values.message.trim().length === 0) next.message = messages.message;
    else if (values.message.length > CONTACT_FIELD_LIMITS.message) next.message = messages.tooLong;

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);
    if (!validate()) return;

    setStatus('sending');

    const payload: ContactPayload = {
      branch,
      qualifier,
      name: values.name.trim(),
      email: values.email.trim(),
      organisation: values.organisation.trim(),
      message: values.message.trim(),
      website: values.website,
      elapsedMs: Date.now() - startedAt,
    };

    try {
      const accepted = await postContact(payload);
      setReference(accepted.reference);
      setStatus('sent');
      setValues(EMPTY);
      window.setTimeout(() => successRef.current?.focus(), 0);
    } catch (error) {
      setStatus('error');
      setFormError(
        error instanceof ContactError && error.kind === 'rateLimited'
          ? messages.rateLimited
          : messages.generic,
      );
    }
  };

  if (status === 'sent') {
    return (
      <div className="rounded-sm border border-accent/30 bg-bg-surface/60 p-8">
        <SplitHeading
          as="h3"
          roman={contact.form.success.heading.roman}
          accent={contact.form.success.heading.accent}
        />
        <p ref={successRef} tabIndex={-1} className="mt-4 max-w-measure text-body-sm text-ink-secondary outline-none">
          {contact.form.success.body}
        </p>
        <p className="mt-6 font-mono text-index text-ink-dim">
          {contact.form.success.referenceLabel}: <span className="text-accent-ink">{reference}</span>
        </p>
        <Button variant="ghost" className="mt-8" onClick={() => setStatus('idle')}>
          {contact.form.success.again}
        </Button>
      </div>
    );
  }

  const field = (name: FieldName, type: 'text' | 'email' | 'textarea') => {
    const id = `${fieldId}-${name}`;
    const errorId = `${id}-error`;
    const hintId = `${id}-hint`;
    const invalid = Boolean(errors[name]);
    const hint = name === 'message' ? fields.message.hint : undefined;

    const shared = {
      id,
      name,
      value: values[name],
      'aria-invalid': invalid || undefined,
      'aria-describedby': cn(invalid && errorId, hint && hintId) || undefined,
      className: cn(FIELD_CLASS, invalid ? 'border-accent-ink' : 'border-hairline/15'),
      onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setValue(name, event.target.value),
    };

    return (
      <div key={name} className={cn(name === 'message' && 'sm:col-span-2')}>
        <label htmlFor={id} className="mb-2 block text-eyebrow uppercase text-ink-dim">
          {fields[name].label}
        </label>

        {type === 'textarea' ? (
          <textarea {...shared} rows={4} maxLength={CONTACT_FIELD_LIMITS.message} />
        ) : (
          <input {...shared} type={type} autoComplete={fields[name].autoComplete} />
        )}

        {hint ? (
          <p id={hintId} className="mt-2 text-body-sm text-ink-muted">
            {hint}
          </p>
        ) : null}

        {invalid ? (
          <p id={errorId} role="alert" className="mt-2 text-body-sm text-accent-ink">
            {errors[name]}
          </p>
        ) : null}
      </div>
    );
  };

  return (
    <form onSubmit={onSubmit} noValidate>
      <fieldset className="border-0 p-0">
        <legend className="sr-only">{contact.form.legend}</legend>

        <div className="grid gap-6 sm:grid-cols-2">
          {field('name', 'text')}
          {field('email', 'email')}
          {field('organisation', 'text')}
          {field('message', 'textarea')}
        </div>

        {/* Honeypot. Hidden from sight and from assistive tech, so only a bot fills it in. */}
        <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
          <label htmlFor={`${fieldId}-website`}>{fields.website.label}</label>
          <input
            id={`${fieldId}-website`}
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={values.website}
            onChange={(event) => setValue('website', event.target.value)}
          />
        </div>
      </fieldset>

      {formError ? (
        <p role="alert" className="mt-6 rounded-sm border border-accent/40 bg-accent/10 px-4 py-3 text-body-sm text-ink-primary">
          {formError}
        </p>
      ) : null}

      <Button type="submit" disabled={status === 'sending'} className="mt-8">
        {status === 'sending' ? contact.form.submitting : contact.form.submit}
      </Button>
    </form>
  );
}
