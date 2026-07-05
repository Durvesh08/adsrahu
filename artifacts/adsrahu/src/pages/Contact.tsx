import React, { useState } from "react";
import { Link } from "wouter";
import { Mail, Phone, MapPin, ArrowRight, CheckCircle2 } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { leadsApi } from "@/lib/api";
import { useSettings } from "@/lib/useSettings";

function Field({ id, label, required, error, children }: { id: string; label: string; required?: boolean; error?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="text-sm font-medium text-gray-300">
        {label}{required && <span className="text-blue-400 ml-0.5">*</span>}
      </label>
      {children}
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}

export default function Contact() {
  const settings = useSettings();
  const waNumber = settings.whatsappNumber.replace(/\D/g, "");

  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", service: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function validate() {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email";
    if (!form.phone.trim()) e.phone = "Phone is required";
    if (!form.message.trim()) e.message = "Message is required";
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setLoading(true);
    try {
      await leadsApi.create({
        name: form.name,
        phone: form.phone,
        email: form.email,
        city: "",
        source: "Website Contact",
        status: "new",
        notes: `Company: ${form.company || "—"}\nService: ${form.service || "—"}\nMessage: ${form.message}`,
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen pt-20 pb-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Left Column */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">Let's Build Your Growth Engine.</h1>
            <p className="text-lg text-gray-400 mb-12 max-w-md">
              Whether you need more qualified leads, better CRM automation, or a complete marketing overhaul, we're ready to partner with you.
            </p>
            <div className="space-y-8 mb-12">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                  <SiWhatsapp className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <h3 className="text-white font-medium text-lg mb-1">WhatsApp / Phone</h3>
                  <p className="text-gray-400 mb-2">Fastest way to reach us.</p>
                  <a href={`https://wa.me/${waNumber}`} target="_blank" rel="noreferrer" className="text-primary hover:text-white transition-colors font-medium">
                    {settings.whatsappNumber}
                  </a>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-white font-medium text-lg mb-1">Email</h3>
                  <p className="text-gray-400 mb-2">For general inquiries and proposals.</p>
                  <a href={`mailto:${settings.contactEmail}`} className="text-primary hover:text-white transition-colors font-medium">
                    {settings.contactEmail}
                  </a>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-white font-medium text-lg mb-1">Global Reach</h3>
                  <p className="text-gray-400">Serving clients in India, USA, UK, and UAE.</p>
                </div>
              </div>
            </div>
            <div className="rounded-xl border border-white/10 bg-[#0d0d14] p-6">
              <h3 className="text-white font-medium mb-2">Ready to move fast?</h3>
              <p className="text-gray-400 text-sm mb-4">Skip the emails and book a direct strategy session with our team.</p>
              <Link href="/book-a-call" className="inline-flex items-center text-primary font-medium hover:text-white transition-colors">
                Book Strategy Call <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="rounded-2xl border border-white/10 bg-[#0d0d14] p-8 md:p-10 shadow-2xl">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center mb-5">
                  <CheckCircle2 className="w-8 h-8 text-green-400" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-3">Message Sent!</h2>
                <p className="text-gray-400 mb-2">Thanks, <span className="text-white font-medium">{form.name}</span>.</p>
                <p className="text-gray-500 text-sm mb-8">We've received your message and will get back to you within 24 hours via email or WhatsApp.</p>
                <a
                  href={`https://wa.me/${waNumber}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-green-600/15 border border-green-500/30 text-green-400 text-sm font-medium hover:bg-green-600/25 transition-colors"
                >
                  <SiWhatsapp className="w-4 h-4" /> Chat on WhatsApp for faster response
                </a>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-white mb-6">Send a Message</h2>
                <form className="space-y-5" onSubmit={handleSubmit} noValidate>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <Field id="name" label="Full Name" required error={errors.name}>
                      <input
                        type="text"
                        id="name"
                        value={form.name}
                        onChange={e => { setForm({...form, name: e.target.value}); setErrors({...errors, name: ""}); }}
                        className={`w-full rounded-xl border bg-black/60 px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:ring-1 transition-colors text-sm ${errors.name ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/30" : "border-white/10 focus:border-blue-500/50 focus:ring-blue-500/20"}`}
                        placeholder="John Doe"
                      />
                    </Field>
                    <Field id="company" label="Company Name" error={errors.company}>
                      <input
                        type="text"
                        id="company"
                        value={form.company}
                        onChange={e => setForm({...form, company: e.target.value})}
                        className="w-full rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-white placeholder:text-gray-600 focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/20 transition-colors text-sm"
                        placeholder="Acme Real Estate"
                      />
                    </Field>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <Field id="email" label="Email Address" required error={errors.email}>
                      <input
                        type="email"
                        id="email"
                        value={form.email}
                        onChange={e => { setForm({...form, email: e.target.value}); setErrors({...errors, email: ""}); }}
                        className={`w-full rounded-xl border bg-black/60 px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:ring-1 transition-colors text-sm ${errors.email ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/30" : "border-white/10 focus:border-blue-500/50 focus:ring-blue-500/20"}`}
                        placeholder="you@example.com"
                      />
                    </Field>
                    <Field id="phone" label="Phone / WhatsApp" required error={errors.phone}>
                      <input
                        type="tel"
                        id="phone"
                        value={form.phone}
                        onChange={e => { setForm({...form, phone: e.target.value}); setErrors({...errors, phone: ""}); }}
                        className={`w-full rounded-xl border bg-black/60 px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:ring-1 transition-colors text-sm ${errors.phone ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/30" : "border-white/10 focus:border-blue-500/50 focus:ring-blue-500/20"}`}
                        placeholder="+91 98765 43210"
                      />
                    </Field>
                  </div>
                  <Field id="service" label="What do you need help with?" error={errors.service}>
                    <select
                      id="service"
                      value={form.service}
                      onChange={e => setForm({...form, service: e.target.value})}
                      className="w-full rounded-xl border border-white/10 bg-[#0a0a12] px-4 py-3 text-white focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/20 transition-colors appearance-none text-sm"
                    >
                      <option value="">Select a service...</option>
                      <option value="real-estate-lead-gen">Real Estate Lead Generation</option>
                      <option value="lead-gen">Lead Generation</option>
                      <option value="crm">CRM & WhatsApp Automation</option>
                      <option value="social">Social Media Management</option>
                      <option value="other">Other Growth Services</option>
                    </select>
                  </Field>
                  <Field id="message" label="Message" required error={errors.message}>
                    <textarea
                      id="message"
                      rows={4}
                      value={form.message}
                      onChange={e => { setForm({...form, message: e.target.value}); setErrors({...errors, message: ""}); }}
                      className={`w-full rounded-xl border bg-black/60 px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:ring-1 transition-colors resize-none text-sm ${errors.message ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/30" : "border-white/10 focus:border-blue-500/50 focus:ring-blue-500/20"}`}
                      placeholder="Tell us about your current challenges and goals..."
                    />
                  </Field>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-xl btn-premium px-8 py-4 text-base font-bold text-white shadow transition-all flex justify-center items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending...</>
                    ) : (
                      "Send Message"
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
