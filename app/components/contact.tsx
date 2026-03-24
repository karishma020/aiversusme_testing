"use client";

import { useState } from "react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [apiError, setApiError] = useState("");

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email";
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setApiError("");

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setApiError(data.error || "Failed to send message. Please try again.");
        return;
      }

      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      setApiError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="w-full bg-black px-6 pt-6 pb-12">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-6 items-start">

        {/* LEFT: Contact Info */}
        <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-6 w-full md:w-[300px] flex-shrink-0">
          <h2 className="text-xl font-semibold text-white mb-1">Contact Info</h2>
          <p className="text-gray-400 text-xs mb-6 leading-relaxed">
            Feel free to reach out through any of the channels below.
          </p>

          {/* Address */}
          <div className="flex items-start gap-3 mb-5">
            <div className="bg-white/10 rounded-full p-2 mt-0.5 flex-shrink-0">
              <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <div>
              <p className="text-white font-semibold text-xs mb-1">Office Address</p>
              <p className="text-gray-400 text-xs leading-relaxed">
                <span className="text-white font-medium"></span>Torsecure Cyber LLP, Door No. 4-9-765/17, Second Floor, Manasa Towers, MG Road, Kodialbail, Mangalore, Karnataka
              </p>
              <p className="text-gray-400 text-xs leading-relaxed mt-1.5">
              </p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-start gap-3 mb-5">
            <div className="bg-white/10 rounded-full p-2 mt-0.5 flex-shrink-0">
              <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l1.27-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </div>
            <div>
              <p className="text-white font-semibold text-xs mb-1">Call Us</p>
              <p className="text-gray-400 text-xs">+91 89515 11111</p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start gap-3">
            <div className="bg-white/10 rounded-full p-2 mt-0.5 flex-shrink-0">
              <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <polyline points="2,4 12,13 22,4" />
              </svg>
            </div>
            <div>
              <p className="text-white font-semibold text-xs mb-1">Email Us</p>
              <p className="text-gray-400 text-xs">support@torsecure.com</p>
            </div>
          </div>
        </div>

        {/* RIGHT: Form */}
        <div className="flex-1 w-full">
          <h1 className="text-3xl md:text-4xl font-semibold text-white mb-1">Get In Touch</h1>
          <p className="text-gray-400 text-sm mb-5">
            Fill out the form below and I&apos;ll get back to you as soon as possible.
          </p>

          {submitted && (
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl px-4 py-3 mb-4 text-green-400 text-sm">
              ✅ Message sent successfully! I&apos;ll get back to you soon.
            </div>
          )}

          {apiError && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 mb-4 text-red-400 text-sm">
              ❌ {apiError}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
            <div>
              <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange}
                className={`bg-white/5 border rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none transition w-full ${errors.name ? "border-red-500/60" : "border-white/10 focus:border-white/30"}`}
              />
              {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
            </div>
            <div>
              <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange}
                className={`bg-white/5 border rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none transition w-full ${errors.email ? "border-red-500/60" : "border-white/10 focus:border-white/30"}`}
              />
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
            </div>
          </div>

          <div className="mb-3">
            <input type="text" name="subject" placeholder="Subject" value={formData.subject} onChange={handleChange}
              className={`bg-white/5 border rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none transition w-full ${errors.subject ? "border-red-500/60" : "border-white/10 focus:border-white/30"}`}
            />
            {errors.subject && <p className="text-red-400 text-xs mt-1">{errors.subject}</p>}
          </div>

          <div className="mb-4">
            <textarea name="message" placeholder="Message" value={formData.message} onChange={handleChange} rows={5}
              className={`bg-white/5 border rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none transition w-full resize-none ${errors.message ? "border-red-500/60" : "border-white/10 focus:border-white/30"}`}
            />
            {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
          </div>

          <div className="flex justify-end">
            <button onClick={handleSubmit} disabled={loading}
              className="px-10 py-3 rounded-full text-sm font-semibold transition-all hover:scale-105 active:scale-100 disabled:opacity-60 disabled:cursor-not-allowed bg-white text-black hover:bg-gray-100"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Sending...
                </span>
              ) : "Submit Form"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}