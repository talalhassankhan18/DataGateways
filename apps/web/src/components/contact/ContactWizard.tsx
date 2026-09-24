import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { isContactBranch, type ContactBranch } from '@datagateways/shared';
import { ArrowLink } from '@/components/primitives/ArrowLink';
import { PlaceholderBadge } from '@/components/primitives/PlaceholderBadge';
import { SplitHeading } from '@/components/primitives/SplitHeading';
import { wizardVariants } from '@/lib/motion';
import { contact } from '@/content/contact';
import { ContactForm } from './ContactForm';
import { WizardOption } from './WizardOption';
import { WizardProgress } from './WizardProgress';

const HEADING_ID = 'wizard-step-heading';

/**
 * Three steps, branching after the first. Back keeps earlier answers; Start over clears them.
 *
 * The heading is the focus target on every step change — without that, a keyboard or screen reader
 * user chooses an option and is left with focus on a button that no longer exists.
 */
export function ContactWizard() {
  const [step, setStep] = useState(1);
  const [branch, setBranch] = useState<ContactBranch | null>(null);
  const [qualifier, setQualifier] = useState<string | null>(null);
  const [direction, setDirection] = useState(1);

  const reduced = useReducedMotion() ?? false;
  const startedAt = useRef(Date.now());
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    document.getElementById(HEADING_ID)?.focus();
  }, [step]);

  const { labels, step1, step2, step3, totalSteps } = contact.wizard;

  const question =
    step === 1
      ? step1
      : step === 2 && branch
        ? step2[branch]
        : null;

  const heading =
    step === 3 && branch ? step3[branch].heading : (question?.heading ?? step1.heading);

  const announcement = labels.stepChanged
    .replace('{current}', String(step))
    .replace('{total}', String(totalSteps))
    .replace(
      '{question}',
      step === 3 && branch
        ? `${step3[branch].heading.roman} ${step3[branch].heading.accent}`
        : (question?.question ?? ''),
    );

  const chooseBranch = (id: string) => {
    if (!isContactBranch(id)) return;
    setBranch(id);
    setQualifier(null);
    setDirection(1);
    setStep(2);
  };

  const chooseQualifier = (id: string) => {
    setQualifier(id);
    setDirection(1);
    setStep(3);
  };

  const goBack = () => {
    setDirection(-1);
    setStep((current) => Math.max(1, current - 1));
  };

  const startOver = () => {
    setDirection(-1);
    setBranch(null);
    setQualifier(null);
    setStep(1);
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-6 border-b border-hairline/10 pb-6">
        <WizardProgress current={step} total={totalSteps} />

        <div className="flex items-center gap-6 text-body-sm">
          {step > 1 ? (
            <button
              type="button"
              onClick={goBack}
              className="text-ink-secondary transition-colors duration-hover hover:text-ink-primary"
            >
              {labels.back}
            </button>
          ) : null}
          {step > 1 ? (
            <button
              type="button"
              onClick={startOver}
              className="text-ink-secondary transition-colors duration-hover hover:text-ink-primary"
            >
              {labels.startOver}
            </button>
          ) : null}
        </div>
      </div>

      {/* Polite, because the heading focus already interrupts — this is the belt to that braces. */}
      <p aria-live="polite" className="sr-only">
        {announcement}
      </p>

      <div className="relative overflow-hidden pt-10">
        <motion.div
          key={step}
          custom={direction}
          variants={wizardVariants(reduced)}
          initial="enter"
          animate="center"
        >
            <SplitHeading
              id={HEADING_ID}
              as="h2"
              tabIndex={-1}
              roman={heading.roman}
              accent={heading.accent}
              className="max-w-[16ch]"
            />

            {step < 3 && question ? (
              <ul className="mt-10 flex flex-col gap-3">
                {question.options.map((option) => (
                  <WizardOption
                    key={option.id}
                    option={option}
                    onSelect={step === 1 ? chooseBranch : chooseQualifier}
                  />
                ))}
              </ul>
            ) : null}

            {step === 3 && branch && qualifier ? (
              <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-8">
                <div className="lg:col-span-5">
                  <p className="max-w-measure text-body text-ink-secondary">{step3[branch].body}</p>

                  <div className="mt-8 flex flex-col items-start gap-4">
                    <PlaceholderBadge item={step3[branch].email}>
                      <a
                        href={`mailto:${step3[branch].email.value}`}
                        className="text-body-sm text-accent-ink transition-colors duration-hover hover:text-ink-primary"
                      >
                        {step3[branch].email.value}
                      </a>
                    </PlaceholderBadge>

                    <ArrowLink
                      label={step3[branch].secondary.label}
                      to={step3[branch].secondary.href}
                    />
                  </div>
                </div>

                <div className="lg:col-span-6 lg:col-start-7">
                  <ContactForm branch={branch} qualifier={qualifier} startedAt={startedAt.current} />
                  <p className="mt-6 text-body-sm text-ink-muted">
                    {contact.form.mailtoPrefix}{' '}
                    <a
                      href={`mailto:${step3[branch].email.value}`}
                      className="text-accent-ink transition-colors duration-hover hover:text-ink-primary"
                    >
                      {step3[branch].email.value}
                    </a>
                  </p>
                </div>
              </div>
          ) : null}
        </motion.div>
      </div>
    </div>
  );
}
