'use client';

import { useCallback, useId, useRef, useState, type ChangeEvent, type FormEvent, type KeyboardEvent } from 'react';
import { Check, Copy, Mail, MessageCircle, Phone, Send } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { SocialIcon } from '@/components/ui/SocialIcon';
import { buttonClasses } from '@/components/ui/ButtonLink';
import { github, linkedin, mailtoHref, site, whatsappHref } from '@/lib/site';

type Channel = 'email' | 'whatsapp';

interface FormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
  channel: Channel;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const initialValues: FormValues = {
  name: '',
  email: '',
  subject: '',
  message: '',
  channel: 'email',
};

function validateForm(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  if (values.name.trim().length === 0) {
    errors.name = 'Please enter your name.';
  }
  if (values.email.trim().length === 0) {
    errors.email = 'Please enter your email address.';
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = 'Please enter a valid email address (for example, alex@company.com).';
  }
  if (values.message.trim().length === 0) {
    errors.message = 'Please include a short message.';
  }
  return errors;
}

export function ContactSection() {
  const baseId = useId();
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const copyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleCopy = useCallback(async (key: string, text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setStatusMessage(`${label} copied to clipboard.`);
      if (copyTimerRef.current) {
        clearTimeout(copyTimerRef.current);
      }
      copyTimerRef.current = setTimeout(() => {
        setCopiedKey((current) => (current === key ? null : current));
      }, 2200);
    } catch {
      setStatusMessage(`Could not copy automatically. ${label}: ${text}`);
    }
  }, []);

  const handleCopyEmail = useCallback(() => {
    void handleCopy('email', site.email, 'Email address');
  }, [handleCopy]);

  const handleCopyPhone = useCallback(() => {
    void handleCopy('phone', site.phoneDisplay, 'Phone number');
  }, [handleCopy]);

  const handleFieldChange = useCallback((event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      if (!(name in prev)) return prev;
      const next = { ...prev };
      delete next[name as keyof FormErrors];
      return next;
    });
  }, []);

  const handleChannelChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const nextChannel = event.target.value === 'whatsapp' ? 'whatsapp' : 'email';
    setValues((prev) => ({ ...prev, channel: nextChannel }));
  }, []);

  const submitMessage = useCallback(() => {
    const trimmed: FormValues = {
      name: values.name.trim(),
      email: values.email.trim(),
      subject: values.subject.trim(),
      message: values.message.trim(),
      channel: values.channel,
    };

    const nextErrors = validateForm(trimmed);
    setErrors(nextErrors);

    if (nextErrors.name) {
      nameRef.current?.focus();
      return;
    }
    if (nextErrors.email) {
      emailRef.current?.focus();
      return;
    }
    if (nextErrors.message) {
      messageRef.current?.focus();
      return;
    }

    const subjectLine = trimmed.subject.length > 0 ? trimmed.subject : `Portfolio inquiry from ${trimmed.name}`;

    if (trimmed.channel === 'whatsapp') {
      const text = [
        `Hi Daniel, I'm ${trimmed.name} (${trimmed.email}).`,
        trimmed.subject.length > 0 ? `Topic: ${trimmed.subject}` : null,
        '',
        trimmed.message,
      ]
        .filter((line): line is string => line !== null)
        .join('\n');

      const url = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(text)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
      setStatusMessage('Opening WhatsApp with your pre-filled message…');
    } else {
      const body = `${trimmed.message}\n\n—\n${trimmed.name}\n${trimmed.email}`;
      const mailto = `mailto:${site.email}?subject=${encodeURIComponent(subjectLine)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailto;
      setStatusMessage(`Opening your email app addressed to ${site.email}…`);
    }
  }, [values]);

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      submitMessage();
    },
    [submitMessage],
  );

  const handleTextareaKeyDown = useCallback(
    (event: KeyboardEvent<HTMLTextAreaElement>) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
        event.preventDefault();
        submitMessage();
      }
    },
    [submitMessage],
  );

  const nameId = `${baseId}-name`;
  const emailId = `${baseId}-email`;
  const subjectId = `${baseId}-subject`;
  const messageId = `${baseId}-message`;

  return (
    <Section
      id="contact"
      title="Get in touch"
      lead="Hiring for a full-stack or mobile role, or have a project in mind? Reach out directly by email, LinkedIn, GitHub or WhatsApp."
    >
      <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-14">
        <div className="reveal flex flex-col justify-between gap-8">
          <div className="space-y-4">
            {/* Email card */}
            <div className="flex items-center justify-between gap-3 rounded-2xl border border-line bg-surface p-5 shadow-card">
              <div className="min-w-0">
                <p className="text-xs font-medium text-subtle">Email</p>
                <a
                  href={mailtoHref}
                  className="mt-1 block truncate text-base font-semibold text-fg underline decoration-line underline-offset-4 transition-colors hover:decoration-accent"
                >
                  {site.email}
                </a>
              </div>
              <button
                type="button"
                onClick={handleCopyEmail}
                aria-label="Copy email address"
                className="inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-full border border-line bg-surface-2 px-3.5 text-xs font-semibold text-fg transition-colors hover:border-fg/40"
              >
                {copiedKey === 'email' ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-500" aria-hidden="true" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                    Copy
                  </>
                )}
              </button>
            </div>

            {/* Phone & WhatsApp card */}
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-line bg-surface p-5 shadow-card">
              <div className="min-w-0">
                <p className="text-xs font-medium text-subtle">Phone &amp; WhatsApp</p>
                <a
                  href={`tel:${site.phoneE164}`}
                  className="mt-1 block text-base font-semibold text-fg [font-variant-numeric:tabular-nums] underline decoration-line underline-offset-4 transition-colors hover:decoration-accent"
                >
                  {site.phoneDisplay}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-line bg-surface-2 px-3.5 text-xs font-semibold text-fg transition-colors hover:border-fg/40"
                >
                  <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
                  WhatsApp
                </a>
                <button
                  type="button"
                  onClick={handleCopyPhone}
                  aria-label="Copy phone number"
                  className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-line bg-surface-2 px-3.5 text-xs font-semibold text-fg transition-colors hover:border-fg/40"
                >
                  {copiedKey === 'phone' ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-500" aria-hidden="true" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                      Copy
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* LinkedIn & GitHub prominent cards */}
            <div className="grid gap-4 sm:grid-cols-2">
              {[linkedin, github].map((profile) => (
                <a
                  key={profile.id}
                  href={profile.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-3 rounded-2xl border border-line bg-surface p-5 shadow-card transition-colors hover:border-fg/40"
                >
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-subtle">{profile.label}</p>
                    <p className="mt-1 truncate text-sm font-semibold text-fg" translate="no">
                      /{profile.handle}
                    </p>
                  </div>
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-2 text-fg transition-colors group-hover:bg-accent group-hover:text-accent-fg">
                    <SocialIcon id={profile.id} className="h-4 w-4" />
                  </span>
                </a>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-line bg-surface-2/60 p-5 text-sm leading-relaxed text-muted">
            <p className="font-semibold text-fg">Availability</p>
            <p className="mt-1">
              Based in {site.location} and open to full-time remote roles, international relocation and select contract engagements.
            </p>
            <div className="mt-4 flex flex-wrap gap-4 text-xs font-medium text-fg">
              <a href={mailtoHref} className="inline-flex items-center gap-1.5 underline decoration-line underline-offset-4 hover:decoration-accent">
                <Mail className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                {site.email}
              </a>
              <a href={`tel:${site.phoneE164}`} className="inline-flex items-center gap-1.5 underline decoration-line underline-offset-4 hover:decoration-accent">
                <Phone className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                {site.phoneDisplay}
              </a>
            </div>
          </div>
        </div>

        {/* Serverless direct message form */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className="reveal rounded-2xl border border-line bg-surface p-6 shadow-card sm:p-8"
        >
          <h3 className="text-lg font-semibold tracking-tight text-fg">Send a direct message</h3>
          <p className="mt-1 text-sm text-muted">
            Completes in your email client or WhatsApp with one click—no third-party trackers.
          </p>

          <div className="mt-6 space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label htmlFor={nameId} className="text-sm font-medium text-fg">
                  Your name
                </label>
                <input
                  ref={nameRef}
                  id={nameId}
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={values.name}
                  onChange={handleFieldChange}
                  placeholder="Ada Lovelace…"
                  aria-invalid={errors.name ? true : undefined}
                  aria-describedby={errors.name ? `${nameId}-error` : undefined}
                  className="w-full rounded-xl border border-line bg-bg px-3.5 py-2.5 text-base text-fg placeholder:text-subtle focus:border-accent focus:outline-none"
                />
                {errors.name ? (
                  <p id={`${nameId}-error`} role="alert" className="text-xs font-medium text-red-600 dark:text-red-400">
                    {errors.name}
                  </p>
                ) : null}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor={emailId} className="text-sm font-medium text-fg">
                  Your email
                </label>
                <input
                  ref={emailRef}
                  id={emailId}
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  spellCheck={false}
                  value={values.email}
                  onChange={handleFieldChange}
                  placeholder="ada@company.com…"
                  aria-invalid={errors.email ? true : undefined}
                  aria-describedby={errors.email ? `${emailId}-error` : undefined}
                  className="w-full rounded-xl border border-line bg-bg px-3.5 py-2.5 text-base text-fg placeholder:text-subtle focus:border-accent focus:outline-none"
                />
                {errors.email ? (
                  <p id={`${emailId}-error`} role="alert" className="text-xs font-medium text-red-600 dark:text-red-400">
                    {errors.email}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor={subjectId} className="text-sm font-medium text-fg">
                Subject <span className="font-normal text-subtle">(optional)</span>
              </label>
              <input
                id={subjectId}
                name="subject"
                type="text"
                value={values.subject}
                onChange={handleFieldChange}
                placeholder="Full-Stack Engineer role at Acme…"
                className="w-full rounded-xl border border-line bg-bg px-3.5 py-2.5 text-base text-fg placeholder:text-subtle focus:border-accent focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-baseline justify-between gap-2">
                <label htmlFor={messageId} className="text-sm font-medium text-fg">
                  Message
                </label>
                <span className="text-xs text-subtle">⌘/Ctrl&nbsp;+&nbsp;Enter to send</span>
              </div>
              <textarea
                ref={messageRef}
                id={messageId}
                name="message"
                rows={4}
                value={values.message}
                onChange={handleFieldChange}
                onKeyDown={handleTextareaKeyDown}
                placeholder="Tell me about the role, team or project…"
                aria-invalid={errors.message ? true : undefined}
                aria-describedby={errors.message ? `${messageId}-error` : undefined}
                className="w-full resize-y rounded-xl border border-line bg-bg px-3.5 py-2.5 text-base text-fg placeholder:text-subtle focus:border-accent focus:outline-none"
              />
              {errors.message ? (
                <p id={`${messageId}-error`} role="alert" className="text-xs font-medium text-red-600 dark:text-red-400">
                  {errors.message}
                </p>
              ) : null}
            </div>

            <fieldset>
              <legend className="text-sm font-medium text-fg">Send via</legend>
              <div className="mt-2 grid grid-cols-2 gap-3">
                <label className="flex min-h-11 cursor-pointer items-center gap-2.5 rounded-xl border border-line bg-bg px-3.5 py-2.5 text-sm font-medium text-fg transition-colors has-[:checked]:border-accent has-[:checked]:bg-accent/10">
                  <input
                    type="radio"
                    name="channel"
                    value="email"
                    checked={values.channel === 'email'}
                    onChange={handleChannelChange}
                    className="h-4 w-4 accent-accent"
                  />
                  <Mail className="h-4 w-4 text-muted" aria-hidden="true" />
                  <span>Email app</span>
                </label>
                <label className="flex min-h-11 cursor-pointer items-center gap-2.5 rounded-xl border border-line bg-bg px-3.5 py-2.5 text-sm font-medium text-fg transition-colors has-[:checked]:border-accent has-[:checked]:bg-accent/10">
                  <input
                    type="radio"
                    name="channel"
                    value="whatsapp"
                    checked={values.channel === 'whatsapp'}
                    onChange={handleChannelChange}
                    className="h-4 w-4 accent-accent"
                  />
                  <MessageCircle className="h-4 w-4 text-muted" aria-hidden="true" />
                  <span>WhatsApp</span>
                </label>
              </div>
            </fieldset>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <button type="submit" className={buttonClasses('primary')}>
              <Send className="h-4 w-4" aria-hidden="true" />
              {values.channel === 'whatsapp' ? 'Continue on WhatsApp' : 'Compose email'}
            </button>
            <p aria-live="polite" className="text-xs text-muted">
              {statusMessage}
            </p>
          </div>
        </form>
      </div>
    </Section>
  );
}
