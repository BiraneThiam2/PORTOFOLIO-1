import { Mail, Github, Linkedin, Send, MessageCircle, FileText } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function Contact() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSent(false), 4000);
  };

  const socials = [
    {
      icon: Mail,
      label: 'Email',
      value: 'biranethiam916@gmail.com',
      href: 'mailto:biranethiam916@gmail.com',
      color: 'text-violet-400',
      bg: 'bg-violet-500/10 border-violet-500/20',
    },
    {
      icon: Github,
      label: 'GitHub',
      value: 'github.com/BiraneThiam2',
      href: 'https://github.com/BiraneThiam2',
      color: 'text-gray-300',
      bg: 'bg-white/5 border-white/10',
      external: true,
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'El Hadji Birane Cisse Thiam',
      href: 'https://www.linkedin.com/in/el-hadji-birane-cisse-thiam-1917a9336/',
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/10 border-cyan-500/20',
      external: true,
    },
    {
      icon: FileText,
      label: 'Mon CV',
      value: 'Télécharger mon CV (PDF)',
      href: '/cv.pdf',
      color: 'text-pink-400',
      bg: 'bg-pink-500/10 border-pink-500/20',
      download: 'CV_ElHadjiBiraneCisseThiam.pdf',
    },
  ];

  const inputClass = 'w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-violet-500/50 focus:bg-white/8 transition-all duration-200';

  return (
    <section id="contact" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-950/5 to-transparent pointer-events-none" />
      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className={`text-center mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="section-tag mx-auto w-fit mb-4">Contact</div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white">
            Travaillons <span className="gradient-text">ensemble</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto">
            Opportunité de stage, projet collaboratif ou simple échange ? Je suis disponible.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: socials */}
          <div
            className={`transition-all duration-700 delay-100 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
          >
            <div className="flex items-center gap-3 mb-6">
              <MessageCircle size={22} className="text-violet-400" />
              <h3 className="text-xl font-bold text-white">Restons connectés</h3>
            </div>
            <p className="text-gray-400 mb-8 leading-relaxed">
              Je suis ouvert aux opportunités de stage, collaborations sur des projets innovants
              et échanges avec des professionnels du secteur.
            </p>

            <div className="space-y-3">
              {socials.map(({ icon: Icon, label, value, href, color, bg, external, download }) => (
                <a
                  key={label}
                  href={href}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  {...(download ? { download } : {})}
                  className={`flex items-center gap-4 p-4 rounded-xl border ${bg} glass-card hover:scale-[1.02] transition-all`}
                >
                  <div className={`p-2.5 rounded-lg border ${bg} flex-shrink-0`}>
                    <Icon size={20} className={color} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{label}</p>
                    <p className="text-xs text-gray-500 truncate max-w-[200px] sm:max-w-none">{value}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <div
            className={`transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
          >
            <div className="glass-card rounded-2xl border border-white/8 p-6 sm:p-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />

              {sent ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-4">
                    <Send size={24} className="text-emerald-400" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">Message envoyé !</h4>
                  <p className="text-gray-400 text-sm">Je vous répondrai dans les plus brefs délais.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-xl font-bold text-white mb-6">Envoyez-moi un message</h3>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-1.5">Nom complet</label>
                      <input type="text" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                        placeholder="Votre nom" className={inputClass} />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-1.5">Email</label>
                      <input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                        placeholder="votre@email.com" className={inputClass} />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1.5">Sujet</label>
                    <input type="text" required value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })}
                      placeholder="Objet de votre message" className={inputClass} />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1.5">Message</label>
                    <textarea required rows={5} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                      placeholder="Votre message..." className={`${inputClass} resize-none`} />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 text-white font-semibold shadow-lg shadow-violet-500/20 hover:shadow-violet-500/40 hover:scale-[1.02] transition-all duration-200"
                  >
                    <Send size={16} />
                    Envoyer le message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
