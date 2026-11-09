"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Clock, MessageSquare, CheckCircle2, Shield } from "lucide-react";
import { toast } from "sonner";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "Course Inquiry",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      toast.success("Message dispatched to Proxy Support Desk!", {
        description: "Ticket #PRX-7489-XX created. Check your email for updates.",
      });
    }, 600);
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="font-game text-4xl sm:text-6xl text-yellow-400 tracking-wider">
          Contact Us
        </h1>
        <p className="font-game text-lg sm:text-2xl text-gray-300 mt-3 max-w-2xl mx-auto">
          Need help with exercises, account access, or subscription inquiries?
          Reach our developer support desk.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Contact Info Cards (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="p-6 border-4 border-black rounded-2xl bg-zinc-900 shadow-[6px_6px_0_0_#000]">
            <h3 className="font-game text-2xl text-yellow-400 flex items-center gap-2 mb-4">
              <Shield className="w-6 h-6 text-yellow-400" />
              Proxy Support Desk
            </h3>

            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-game text-lg text-gray-400">Support Email</p>
                  <p className="font-sans font-medium text-white select-all">
                    support@codebox.dev
                  </p>
                  <p className="font-mono text-xs text-neutral-500">
                    proxy-relay-XXXX@codebox.internal
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-game text-lg text-gray-400">Helpline (Proxy)</p>
                  <p className="font-sans font-medium text-white select-all">
                    +1 (555) 019-XXXX
                  </p>
                  <p className="font-mono text-xs text-neutral-500">
                    Desk Ext: XXXX-XX (Toll-Free)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-game text-lg text-gray-400">Headquarters (Proxy)</p>
                  <p className="font-sans text-neutral-300">
                    CodeBox Interactive Labs Inc.
                  </p>
                  <p className="font-sans text-xs text-neutral-400">
                    Proxy Gateway Building, Suite 404-XX
                  </p>
                  <p className="font-sans text-xs text-neutral-400">
                    100 Cyber Arcade Way, San Francisco, CA 94107
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-game text-lg text-gray-400">Operating Hours</p>
                  <p className="font-sans text-neutral-300">
                    Monday – Friday: 09:00 – 18:00 UTC
                  </p>
                  <p className="font-sans text-xs text-emerald-400">
                    ● Automated Exercise Verifier: 24/7 Active
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Response SLA Card */}
          <div className="p-5 border-2 border-zinc-800 rounded-xl bg-zinc-950/80">
            <h4 className="font-game text-xl text-white mb-1">
              Guaranteed SLA
            </h4>
            <p className="font-game text-sm text-neutral-400">
              All tickets submitted through this portal are prioritized and answered within 24 business hours.
            </p>
          </div>
        </div>

        {/* Contact Form (3 cols) */}
        <div className="lg:col-span-3">
          <div className="p-6 sm:p-8 border-4 border-black rounded-2xl bg-zinc-900 shadow-[8px_8px_0_0_#000]">
            {submitted ? (
              <div className="py-12 flex flex-col items-center text-center space-y-4">
                <CheckCircle2 className="w-16 h-16 text-emerald-400 animate-bounce" />
                <h3 className="font-game text-3xl text-white">
                  Message Dispatched!
                </h3>
                <p className="font-game text-lg text-neutral-300 max-w-md">
                  Thank you for reaching out. Ticket{" "}
                  <span className="text-yellow-400 font-mono">#PRX-7489-XX</span> has been assigned to a support engineer.
                </p>
                <div className="pt-4">
                  <Button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: "",
                        email: "",
                        category: "Course Inquiry",
                        subject: "",
                        message: "",
                      });
                    }}
                    variant="pixel"
                    className="font-game text-lg"
                  >
                    Send Another Message
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare className="w-5 h-5 text-yellow-400" />
                  <h3 className="font-game text-2xl text-white">
                    Send a Direct Message
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-game text-lg text-gray-300 mb-1">
                      Your Name *
                    </label>
                    <Input
                      type="text"
                      required
                      placeholder="Alex Developer"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="bg-zinc-800 border-2 border-zinc-700 text-white font-sans"
                    />
                  </div>

                  <div>
                    <label className="block font-game text-lg text-gray-300 mb-1">
                      Email Address *
                    </label>
                    <Input
                      type="email"
                      required
                      placeholder="alex@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="bg-zinc-800 border-2 border-zinc-700 text-white font-sans"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-game text-lg text-gray-300 mb-1">
                    Inquiry Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-zinc-800 border-2 border-zinc-700 rounded-md text-white font-sans text-sm focus:outline-none focus:border-yellow-400"
                  >
                    <option value="Course Inquiry">Course Content & Curriculum</option>
                    <option value="Billing & Subscription">Billing & Pro Subscription</option>
                    <option value="Bug Report">Exercise Verification Bug Report</option>
                    <option value="Feature Request">Platform Feature Request</option>
                    <option value="General Support">General Support</option>
                  </select>
                </div>

                <div>
                  <label className="block font-game text-lg text-gray-300 mb-1">
                    Subject
                  </label>
                  <Input
                    type="text"
                    placeholder="Brief description of your question"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    className="bg-zinc-800 border-2 border-zinc-700 text-white font-sans"
                  />
                </div>

                <div>
                  <label className="block font-game text-lg text-gray-300 mb-1">
                    Message *
                  </label>
                  <Textarea
                    required
                    rows={4}
                    placeholder="Provide details about your question, chapter number, or issue..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="bg-zinc-800 border-2 border-zinc-700 text-white font-sans"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  variant="pixel"
                  className="w-full font-game text-xl py-3 mt-2"
                >
                  {loading ? "Dispatching..." : "Send Message"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
