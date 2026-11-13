import { useState } from 'react';
import { AlertTriangle, ArrowUpRight, Check, Copy, Linkedin, Loader2, Send } from 'lucide-react';
import { profile } from '../data';
import { useDakarTime } from '../lib/hooks';
import { useLang } from '../lib/i18n';
import { GithubIcon, Magnetic, Reveal, SectionHeading } from './ui';

/* Identifiant Formspree (ex. « xyzabcd ») défini dans le fichier .env : VITE_FORMSPREE_ID=...
   Sans identifiant, le formulaire ouvre la messagerie du visiteur. */
const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID as string | undefined;

const field =
  'peer w-full border-b border-line/20 bg-transparent pb-3 pt-6 text-lg outline-none transition-colors placeholder:text-transparent focus:border-signal';
const floating =
  'pointer-events-none absolute left-0 top-6 text-muted transition-all duration-300 peer-focus:top-0 peer-focus:text-xs peer-focus:text-signal peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs';

type Status = 'idle' | 'sending' | 'sent' | 'mailto' | 'error';
const empty = { name: '', email: '', subject: '', message: '', _gotcha: '' };

export default function Contact() {
  const { t } = useLang();
  const [form, setForm] = useState(empty);
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const time = useDakarTime();

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form._gotcha) return; // champ piège anti-spam rempli par un robot

    if (!FORMSPREE_ID) {
      const body = `${form.message}\n\n— ${form.name} (${form.email})`;
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(body)}`;
      setStatus('mailto');
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          _subject: form.subject,
          message: form.message,
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus('sent');
      setForm(empty);
    } catch {
      setStatus('error');
    }
  };

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [k]: e.target.value });
    if (status !== 'sending') setStatus('idle');
  };

  return (
    <section id="contact" className="relative py-28 sm:py-36">
      <div className="container-x">
        <SectionHeading
          index="07"
          label={t('contact.label')}
          title={
            <>
              {t('contact.title1')} <span className="em">{t('contact.title2')}</span>.
            </>
          }
          intro={t('contact.intro')}
        />

        <div className="grid gap-16 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <Reveal>
              <button
                onClick={copy}
                className="group flex w-full items-center justify-between gap-4 rounded-3xl border border-line/15 p-6 text-left transition-colors hover:border-ink"
              >
                <div className="min-w-0">
                  <div className="label mb-2">Email</div>
                  <div className="truncate text-xl font-medium sm:text-2xl">{profile.email}</div>
                </div>
                <span
                  className={`grid h-12 w-12 shrink-0 place-items-center rounded-full transition-all duration-300 ${
                    copied ? 'scale-110 bg-accent text-[#111]' : 'bg-line/10 group-hover:bg-ink group-hover:text-bg'
                  }`}
                  aria-live="polite"
                >
                  {copied ? <Check size={18} aria-label={t('contact.copied')} /> : <Copy size={18} aria-label={t('contact.copy')} />}
                </span>
              </button>
            </Reveal>

            <Reveal delay={100}>
              <div className="mt-4 grid grid-cols-2 gap-4">
                {[
                  { href: profile.github, label: 'GitHub', icon: <GithubIcon size={20} /> },
                  { href: profile.linkedin, label: 'LinkedIn', icon: <Linkedin size={20} /> },
                ].map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between rounded-3xl border border-line/15 p-6 transition-colors hover:border-ink hover:bg-ink hover:text-bg"
                  >
                    <span className="flex items-center gap-3 font-medium">
                      {l.icon} {l.label}
                    </span>
                    <ArrowUpRight size={18} className="transition-transform duration-300 group-hover:rotate-45" />
                  </a>
                ))}
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="mt-10 space-y-3 font-mono text-sm text-muted">
                <p className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-accent" /> {t('contact.available')}
                </p>
                <p>Dakar, Sénégal — {time} GMT</p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={150}>
            {status === 'sent' ? (
              <div className="flex h-full flex-col items-start justify-center rounded-3xl border border-line/15 p-10 animate-fade-up" role="status">
                <span className="grid h-14 w-14 place-items-center rounded-full bg-accent text-[#111]">
                  <Check size={24} />
                </span>
                <p className="mt-6 text-2xl font-semibold">{t('contact.sent')}</p>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-8">
                <div className="grid gap-8 sm:grid-cols-2">
                  <label className="relative block">
                    <input required value={form.name} onChange={set('name')} placeholder=" " className={field} autoComplete="name" />
                    <span className={floating}>{t('contact.name')}</span>
                  </label>
                  <label className="relative block">
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={set('email')}
                      placeholder=" "
                      className={field}
                      autoComplete="email"
                    />
                    <span className={floating}>{t('contact.email')}</span>
                  </label>
                </div>
                <label className="relative block">
                  <input required value={form.subject} onChange={set('subject')} placeholder=" " className={field} />
                  <span className={floating}>{t('contact.subject')}</span>
                </label>
                <label className="relative block">
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={set('message')}
                    placeholder=" "
                    className={`${field} resize-none`}
                  />
                  <span className={floating}>{t('contact.message')}</span>
                </label>
                {/* Champ invisible anti-spam */}
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form._gotcha}
                  onChange={set('_gotcha')}
                  className="hidden"
                  aria-hidden="true"
                />

                <div className="flex flex-wrap items-center gap-4">
                  <Magnetic>
                    <button type="submit" disabled={status === 'sending'} className="btn-primary group disabled:opacity-70">
                      {status === 'sending' ? t('contact.sending') : t('contact.send')}
                      {status === 'sending' ? (
                        <Loader2 size={16} className="animate-spin" />
                      ) : (
                        <Send size={16} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      )}
                    </button>
                  </Magnetic>
                  {status === 'mailto' && (
                    <span className="animate-fade-up text-sm text-muted" role="status">
                      {t('contact.mailto')}
                    </span>
                  )}
                  {status === 'error' && (
                    <span className="flex animate-fade-up items-center gap-2 text-sm text-hot" role="alert">
                      <AlertTriangle size={15} /> {t('contact.error')}
                    </span>
                  )}
                </div>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
