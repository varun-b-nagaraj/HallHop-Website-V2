"use client";

import { useState } from "react";
import { IconArrow, IconCheck } from "./icons";

type Fields = { name: string; email: string; school: string; role: string; message: string };
const initial: Fields = { name: "", email: "", school: "", role: "", message: "" };
const roles = ["School administrator", "District leader", "Technology / IT", "School safety", "Teacher", "Other"];

export function DemoForm() {
  const [fields, setFields] = useState(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  function change(key: keyof Fields, value: string) {
    setFields((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (status === "sending") return;
    const next: Partial<Record<keyof Fields, string>> = {};
    if (!fields.name.trim()) next.name = "Enter your name.";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(fields.email)) next.email = "Enter a valid email address.";
    if (!fields.school.trim()) next.school = "Enter your school or district.";
    if (!fields.role) next.role = "Select your role.";
    setErrors(next);
    if (Object.keys(next).length) {
      document.getElementById(`contact-${Object.keys(next)[0]}`)?.focus();
      return;
    }
    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fields, website }),
      });
      if (!response.ok) throw new Error("Contact request failed");
      setStatus("sent");
      setFields(initial);
      setWebsite("");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") return <div className="border border-ink bg-chalk p-8" role="status"><IconCheck className="h-9 w-9" /><h2 className="display mt-8 text-4xl">Message sent.</h2><p className="mt-4 max-w-md leading-relaxed">Thanks for reaching out. The HallHop team has your details and will get back to you soon.</p><button type="button" onClick={() => setStatus("idle")} className="link-arrow mt-6 cursor-pointer underline">Send another message</button></div>;

  return <form onSubmit={submit} noValidate className="border border-ink bg-panel p-6 sm:p-9">
    <div className="grid gap-6 sm:grid-cols-2">
      <Field id="name" label="Full name" value={fields.name} error={errors.name} onChange={(v) => change("name", v)} autoComplete="name" />
      <Field id="email" label="Work email" type="email" value={fields.email} error={errors.email} onChange={(v) => change("email", v)} autoComplete="email" />
      <Field id="school" label="School or district" value={fields.school} error={errors.school} onChange={(v) => change("school", v)} autoComplete="organization" className="sm:col-span-2" />
      <div className="sm:col-span-2"><label htmlFor="contact-role" className="mb-2 block text-sm font-semibold">Your role</label><select id="contact-role" value={fields.role} onChange={(e) => change("role", e.target.value)} aria-invalid={!!errors.role} className="form-control cursor-pointer"><option value="" disabled>Select a role</option>{roles.map((r) => <option key={r}>{r}</option>)}</select>{errors.role && <FieldError id="contact-role-error">{errors.role}</FieldError>}</div>
      <div className="sm:col-span-2"><label htmlFor="contact-message" className="mb-2 block text-sm font-semibold">What would you like to discuss? <span className="font-normal text-faint">Optional</span></label><textarea id="contact-message" rows={5} value={fields.message} onChange={(e) => change("message", e.target.value)} className="form-control resize-y" placeholder="Tell us about your campus, current pass process, or questions." /></div>
      <div className="absolute -left-[10000px]" aria-hidden="true"><label htmlFor="contact-website">Website</label><input id="contact-website" name="website" value={website} onChange={(event) => setWebsite(event.target.value)} tabIndex={-1} autoComplete="off" /></div>
    </div>
    <button type="submit" disabled={status === "sending"} className="btn btn-dark mt-7 w-full disabled:cursor-wait disabled:opacity-60">{status === "sending" ? "Sending…" : "Send request"} <IconArrow className="h-5 w-5" /></button>
    <p className={`mt-4 text-center text-xs ${status === "error" ? "text-danger" : "text-faint"}`} role="status" aria-live="polite">{status === "error" ? "Something went wrong. Please try again or email hallhop123@gmail.com." : "Your details are sent securely to the HallHop team. Please do not include student information."}</p>
  </form>;
}

function Field({ id, label, value, onChange, error, type = "text", autoComplete, className = "" }: { id: keyof Fields; label: string; value: string; onChange: (value: string) => void; error?: string; type?: string; autoComplete?: string; className?: string }) {
  const fullId = `contact-${id}`;
  return <div className={className}><label htmlFor={fullId} className="mb-2 block text-sm font-semibold">{label}</label><input id={fullId} type={type} value={value} onChange={(e) => onChange(e.target.value)} autoComplete={autoComplete} aria-invalid={!!error} aria-describedby={error ? `${fullId}-error` : undefined} className="form-control" />{error && <FieldError id={`${fullId}-error`}>{error}</FieldError>}</div>;
}

function FieldError({ id, children }: { id: string; children: React.ReactNode }) { return <p id={id} role="alert" className="mt-2 text-xs text-danger">{children}</p>; }
