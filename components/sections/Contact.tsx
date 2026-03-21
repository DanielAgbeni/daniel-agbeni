'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Section } from '@/components/ui/Section';
import { Mail, Github, Instagram, AtSign, Music, Youtube, MessageCircle } from 'lucide-react';
import { FaXTwitter } from 'react-icons/fa6';

type ContactFormData = {
  name: string;
  email: string;
  reason: string;
  message: string;
};

export function Contact() {
  const [status, setStatus] = useState<string>('');
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    try {
      // 1. Send it to the API (Optional tracking)
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      
      // 2. Open WhatsApp
      const rawMessage = `Name: ${data.name}\nEmail: ${data.email}\nReason: ${data.reason}\nMessage: ${data.message}`;
      const whatsappLink = `https://api.whatsapp.com/send?phone=2349041995875&text=${encodeURIComponent(rawMessage)}`;
      
      window.open(whatsappLink, '_blank');
      
      setStatus('Redirecting to WhatsApp...');
      reset();
    } catch {
      setStatus('Something went wrong.');
    }
  };

  return (
    <Section id="contact" title="Contact">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-primary/10 bg-white p-6 shadow-soft text-sm text-text/80 flex flex-col gap-4">
          <a href="mailto:danielagbeni@uploaddoc.app" className="flex items-center gap-3 hover:text-primary transition group">
            <Mail className="w-5 h-5 text-primary/70 group-hover:text-primary" />
            <span>Email: <span className="text-primary font-medium">danielagbeni@uploaddoc.app</span></span>
          </a>
          
          <a href="https://github.com/DanielAgbeni" target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-primary transition group">
            <Github className="w-5 h-5 text-primary/70 group-hover:text-primary" />
            <span>GitHub: <span className="text-primary font-medium">github.com/DanielAgbeni</span></span>
          </a>
          
          <a href="https://www.instagram.com/daniel_agbeni" target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-primary transition group">
            <Instagram className="w-5 h-5 text-primary/70 group-hover:text-primary" />
            <span>Instagram: <span className="text-primary font-medium">@daniel_agbeni</span></span>
          </a>
          
          <a href="https://x.com/Agbeni_Daniel" target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-primary transition group">
            <FaXTwitter className="w-5 h-5 text-primary/70 group-hover:text-primary" />
            <span>X: <span className="text-primary font-medium">@Agbeni_Daniel</span></span>
          </a>
          
          <a href="https://www.threads.com/@daniel_agbeni" target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-primary transition group">
            <AtSign className="w-5 h-5 text-primary/70 group-hover:text-primary" />
            <span>Threads: <span className="text-primary font-medium">@daniel_agbeni</span></span>
          </a>
          
          <a href="https://www.tiktok.com/@daniel_agbeni" target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-primary transition group">
            <Music className="w-5 h-5 text-primary/70 group-hover:text-primary" />
            <span>TikTok: <span className="text-primary font-medium">@daniel_agbeni</span></span>
          </a>
          
          <a href="https://www.youtube.com/@daniel_agbeni" target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-primary transition group">
            <Youtube className="w-5 h-5 text-primary/70 group-hover:text-primary" />
            <span>YouTube: <span className="text-primary font-medium">@daniel_agbeni</span></span>
          </a>
          
          <a href="https://wa.me//+2349041995875" target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-primary transition group">
            <MessageCircle className="w-5 h-5 text-primary/70 group-hover:text-primary" />
            <span>WhatsApp: <span className="text-primary font-medium">Daniel Agbeni</span></span>
          </a>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="rounded-2xl border border-primary/10 bg-white p-6 shadow-soft space-y-4">
          <div>
            <input {...register('name', { required: 'Name is required' })} placeholder="Name *" className="w-full rounded-xl border border-primary/20 bg-white px-4 py-3 outline-none focus:border-primary placeholder:text-text/40 transition" />
            {errors.name && <p className="text-xs text-red-500 mt-1.5 px-1">{errors.name.message}</p>}
          </div>

          <div>
            <input {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } })} type="email" placeholder="Email *" className="w-full rounded-xl border border-primary/20 bg-white px-4 py-3 outline-none focus:border-primary placeholder:text-text/40 transition" />
            {errors.email && <p className="text-xs text-red-500 mt-1.5 px-1">{errors.email.message}</p>}
          </div>

          <div>
            <input {...register('reason', { required: 'Reason is required' })} placeholder="Reason for contacting *" className="w-full rounded-xl border border-primary/20 bg-white px-4 py-3 outline-none focus:border-primary placeholder:text-text/40 transition" />
            {errors.reason && <p className="text-xs text-red-500 mt-1.5 px-1">{errors.reason.message}</p>}
          </div>

          <div>
            <textarea {...register('message', { required: 'Message is required' })} placeholder="Message *" rows={5} className="w-full rounded-xl border border-primary/20 bg-white px-4 py-3 outline-none focus:border-primary placeholder:text-text/40 transition resize-none" />
            {errors.message && <p className="text-xs text-red-500 mt-1.5 px-1">{errors.message.message}</p>}
          </div>

          <div className="pt-2 flex items-center justify-between">
            {status ? <p className="text-sm font-medium text-primary">{status}</p> : <div />}
            <button disabled={isSubmitting} className="rounded-xl bg-primary px-8 py-3 text-sm font-semibold text-white shadow-md shadow-primary/20 transition hover:bg-primary/90 disabled:opacity-50" type="submit">
              {isSubmitting ? 'Sending...' : 'Send via WhatsApp'}
            </button>
          </div>
        </form>
      </div>
    </Section>
  );
}
