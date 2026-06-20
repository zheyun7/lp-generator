"use client";

import { useState } from "react";
import {
  ArrowRight,
  Check,
  Copy,
  ExternalLink,
  Plus,
  Trash2,
  Sparkles,
  Zap,
  Shield,
  Globe,
  Code,
  BarChart3,
  Palette,
  Layers,
  CreditCard,
  MessageCircle,
  ChevronLeft,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Feature, PricingPlan, FAQItem } from "@/lib/types";
import type { ColorTheme } from "@/lib/colors";
import { getThemeStyles, colorThemes } from "@/lib/colors";

const ICON_OPTIONS = [
  { key: "Sparkles", label: "Sparkles", icon: Sparkles },
  { key: "Zap", label: "Zap", icon: Zap },
  { key: "Shield", label: "Shield", icon: Shield },
  { key: "Globe", label: "Globe", icon: Globe },
  { key: "Code", label: "Code", icon: Code },
  { key: "BarChart3", label: "Chart", icon: BarChart3 },
  { key: "Palette", label: "Palette", icon: Palette },
  { key: "Layers", label: "Layers", icon: Layers },
  { key: "CreditCard", label: "Credit Card", icon: CreditCard },
  { key: "MessageCircle", label: "Message", icon: MessageCircle },
];

const COLOR_OPTIONS: { key: ColorTheme; label: string; hex: string }[] = [
  { key: "indigo", label: "Indigo", hex: "#6366f1" },
  { key: "violet", label: "Violet", hex: "#8b5cf6" },
  { key: "blue", label: "Blue", hex: "#3b82f6" },
  { key: "rose", label: "Rose", hex: "#f43f5e" },
  { key: "orange", label: "Orange", hex: "#f97316" },
];

const STEPS = ["Basic Info", "Features", "Pricing", "FAQ"];

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const },
};

export default function Home() {
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ slug: string; url: string } | null>(
    null
  );
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  // Form state
  const [productName, setProductName] = useState("");
  const [tagline, setTagline] = useState("");
  const [description, setDescription] = useState("");
  const [colorTheme, setColorTheme] = useState<ColorTheme>("indigo");
  const [ctaText, setCtaText] = useState("Get Started");
  const [ctaUrl, setCtaUrl] = useState("#");
  const [features, setFeatures] = useState<Feature[]>([
    { icon: "Sparkles", title: "", description: "" },
    { icon: "Zap", title: "", description: "" },
    { icon: "Shield", title: "", description: "" },
  ]);
  const [pricing, setPricing] = useState<PricingPlan[]>([
    {
      name: "Free",
      price: "$0",
      features: ["5 projects", "Basic support"],
      highlighted: false,
    },
    {
      name: "Pro",
      price: "$19/mo",
      features: [
        "Unlimited projects",
        "Priority support",
        "Advanced analytics",
      ],
      highlighted: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      features: ["Everything in Pro", "SSO", "Custom SLA"],
      highlighted: false,
    },
  ]);
  const [faq, setFaq] = useState<FAQItem[]>([
    { question: "", answer: "" },
    { question: "", answer: "" },
  ]);

  const themeStyle = getThemeStyles(colorTheme);
  const themeInfo = colorThemes[colorTheme];

  const addFeature = () => {
    if (features.length < 6) {
      setFeatures([
        ...features,
        { icon: "Sparkles", title: "", description: "" },
      ]);
    }
  };

  const removeFeature = (i: number) => {
    if (features.length > 1)
      setFeatures(features.filter((_, idx) => idx !== i));
  };

  const updateFeature = (i: number, f: Partial<Feature>) => {
    setFeatures(
      features.map((item, idx) => (idx === i ? { ...item, ...f } : item))
    );
  };

  const updatePricingFeature = (ti: number, fi: number, val: string) => {
    setPricing(
      pricing.map((t, idx) =>
        idx === ti
          ? { ...t, features: t.features.map((f, i) => (i === fi ? val : f)) }
          : t
      )
    );
  };

  const addPricingFeature = (ti: number) => {
    setPricing(
      pricing.map((t, idx) =>
        idx === ti ? { ...t, features: [...t.features, ""] } : t
      )
    );
  };

  const removePricingFeature = (ti: number, fi: number) => {
    setPricing(
      pricing.map((t, idx) =>
        idx === ti
          ? { ...t, features: t.features.filter((_, i) => i !== fi) }
          : t
      )
    );
  };

  const addFaq = () => {
    if (faq.length < 8) setFaq([...faq, { question: "", answer: "" }]);
  };

  const removeFaq = (i: number) => {
    if (faq.length > 1) setFaq(faq.filter((_, idx) => idx !== i));
  };

  const updateFaq = (i: number, v: Partial<FAQItem>) => {
    setFaq(faq.map((item, idx) => (idx === i ? { ...item, ...v } : item)));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/pages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productName,
          tagline,
          description,
          colorTheme,
          ctaText,
          ctaUrl,
          features: features.filter((f) => f.title),
          pricing,
          faq: faq.filter((f) => f.question),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create page");
      setResult(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  const copyUrl = () => {
    if (result) {
      navigator.clipboard.writeText(
        `${window.location.origin}${result.url}`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // ── Success view ──
  if (result) {
    return (
      <motion.div
        className="mx-auto max-w-2xl px-4 pb-32 pt-40 text-center sm:px-6"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Confetti dots */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-2 w-2 rounded-full"
              style={{
                backgroundColor:
                  Object.values(colorThemes)[i % 5].primary,
                left: `${10 + Math.random() * 80}%`,
                top: "20%",
              }}
              initial={{ y: 0, opacity: 1, scale: 1 }}
              animate={{
                y: 300 + Math.random() * 200,
                opacity: 0,
                scale: 0,
              }}
              transition={{
                duration: 1.5 + Math.random(),
                delay: Math.random() * 0.5,
                ease: "easeOut",
              }}
            />
          ))}
        </div>

        <div
          className="relative rounded-2xl border border-slate-200 bg-white p-10 shadow-2xl dark:border-slate-800 dark:bg-slate-900"
          style={themeStyle}
        >
          <div
            className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full"
            style={{ backgroundColor: "rgb(var(--primary-rgb) / 0.1)" }}
          >
            <Check
              className="h-8 w-8"
              style={{ color: "var(--primary)" }}
            />
          </div>
          <h1 className="mb-4 text-3xl font-bold text-slate-900 dark:text-white">
            Page Created!
          </h1>
          <p className="mb-8 text-slate-600 dark:text-slate-400">
            Your landing page is live at:
          </p>
          <div className="mb-6 flex items-center justify-center gap-3">
            <code className="rounded-lg bg-slate-100 px-4 py-3 text-lg font-mono text-slate-800 dark:bg-slate-800 dark:text-slate-200">
              /p/{result.slug}
            </code>
            <button
              onClick={copyUrl}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </button>
          </div>
          <div className="flex justify-center gap-4">
            <a
              href={result.url}
              target="_blank"
              className="inline-flex h-10 items-center justify-center gap-1.5 rounded-lg px-6 text-sm font-medium text-white transition-all hover:opacity-90"
              style={{ backgroundColor: "var(--primary)" }}
            >
              View Page <ExternalLink className="h-4 w-4" />
            </a>
            <button
              onClick={() => {
                setResult(null);
                setStep(0);
              }}
              className="inline-flex h-10 items-center justify-center rounded-lg border border-slate-200 bg-white px-6 text-sm font-medium text-slate-700 shadow-sm transition-all hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
            >
              Create Another
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  // ── Form view ──
  return (
    <div
      className="relative mx-auto max-w-3xl px-4 pb-32 pt-28 sm:px-6"
      style={themeStyle}
    >
      {/* Background glow */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2"
        aria-hidden="true"
      >
        <div
          className="h-[400px] w-[600px] rounded-full opacity-10 blur-[100px]"
          style={{ backgroundColor: "var(--primary)" }}
        />
      </div>

      {/* Header */}
      <motion.div
        className="relative mb-12 text-center"
        {...fadeIn}
        transition={{ ...fadeIn.transition, delay: 0 }}
      >
        <div className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white/80 px-4 py-1.5 text-sm font-medium text-slate-600 shadow-sm backdrop-blur-sm dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-400">
          <Sparkles className="h-3.5 w-3.5" style={{ color: "var(--primary)" }} />
          SaaS Landing Page Generator
        </div>
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">
          Create Your Landing Page
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Fill in your product details and get a beautiful landing page in
          seconds.
        </p>
      </motion.div>

      {/* Step indicator */}
      <motion.div className="mb-10" {...fadeIn} transition={{ ...fadeIn.transition, delay: 0.1 }}>
        <div className="flex items-center justify-center gap-1 rounded-full bg-white p-1 shadow-sm dark:bg-slate-900">
          {STEPS.map((s, i) => (
            <button
              key={i}
              onClick={() => setStep(i)}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition-all ${
                i === step
                  ? "text-white shadow-md"
                  : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              }`}
              style={
                i === step
                  ? { backgroundColor: "var(--primary)" }
                  : undefined
              }
            >
              <span
                className={`flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold ${
                  i === step
                    ? "bg-white/20"
                    : "bg-slate-200 text-slate-500 dark:bg-slate-800"
                }`}
              >
                {i + 1}
              </span>
              <span className="hidden sm:inline">{s}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Form card */}
      <motion.div
        key={step}
        className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900 sm:p-10"
        {...fadeIn}
        transition={{ ...fadeIn.transition, delay: 0.15 }}
      >
        <AnimatePresence mode="wait">
          {/* Step 1: Basic Info */}
          {step === 0 && (
            <motion.div key="step1" className="space-y-6" {...fadeIn}>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Product Name *
                </label>
                <input
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="e.g. FlowAI"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm transition-all focus:border-transparent focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-800"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Tagline / Slogan *
                </label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder="e.g. Automate your workflow, amplify your output"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm transition-all focus:border-transparent focus:bg-white focus:outline-none focus:ring-2 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-800"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Description *
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your product in 1-2 sentences..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm transition-all focus:border-transparent focus:bg-white focus:outline-none focus:ring-2 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-800"
                />
              </div>
              <div>
                <label className="mb-3 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Color Theme
                </label>
                <div className="flex flex-wrap gap-3">
                  {COLOR_OPTIONS.map((c) => (
                    <button
                      key={c.key}
                      onClick={() => setColorTheme(c.key)}
                      className={`flex items-center gap-2 rounded-xl border-2 px-4 py-2.5 text-sm font-medium transition-all hover:scale-105 ${
                        colorTheme === c.key
                          ? "shadow-md"
                          : "border-transparent bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400"
                      }`}
                      style={
                        colorTheme === c.key
                          ? {
                              borderColor: "var(--primary)",
                              backgroundColor: "rgb(var(--primary-rgb) / 0.05)",
                              color: "var(--primary-dark)",
                            }
                          : undefined
                      }
                    >
                      <span
                        className="inline-block h-5 w-5 rounded-full"
                        style={{ backgroundColor: c.hex }}
                      />
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 2: Features */}
          {step === 1 && (
            <motion.div key="step2" className="space-y-6" {...fadeIn}>
              {features.map((f, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-slate-100 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-800/50"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                      Feature {i + 1}
                    </span>
                    {features.length > 1 && (
                      <button
                        onClick={() => removeFeature(i)}
                        className="rounded-lg p-1 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="mb-1.5 block text-xs font-medium text-slate-500 dark:text-slate-400">
                      Icon
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {ICON_OPTIONS.map((opt) => (
                        <button
                          key={opt.key}
                          type="button"
                          onClick={() => updateFeature(i, { icon: opt.key })}
                          className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
                            f.icon === opt.key
                              ? "shadow-sm"
                              : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400"
                          }`}
                          style={
                            f.icon === opt.key
                              ? {
                                  borderColor: "rgb(var(--primary-rgb) / 0.5)",
                                  backgroundColor:
                                    "rgb(var(--primary-rgb) / 0.05)",
                                  color: "var(--primary-dark)",
                                }
                              : undefined
                          }
                        >
                          <opt.icon className="h-3.5 w-3.5" />
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      value={f.title}
                      onChange={(e) =>
                        updateFeature(i, { title: e.target.value })
                      }
                      placeholder="Feature title"
                      className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm transition-all focus:border-transparent focus:outline-none focus:ring-2 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                        />
                  </div>
                  <div>
                    <textarea
                      rows={2}
                      value={f.description}
                      onChange={(e) =>
                        updateFeature(i, { description: e.target.value })
                      }
                      placeholder="Feature description"
                      className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm transition-all focus:border-transparent focus:outline-none focus:ring-2 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                        />
                  </div>
                </div>
              ))}
              {features.length < 6 && (
                <button
                  onClick={addFeature}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-200 py-4 text-sm font-medium text-slate-500 transition-all hover:border-slate-300 hover:text-slate-700 dark:border-slate-700 dark:hover:border-slate-600 dark:hover:text-slate-300"
                >
                  <Plus className="h-4 w-4" /> Add Feature
                </button>
              )}
            </motion.div>
          )}

          {/* Step 3: Pricing */}
          {step === 2 && (
            <motion.div key="step3" className="space-y-8" {...fadeIn}>
              {pricing.map((tier, ti) => (
                <div
                  key={ti}
                  className="rounded-xl border p-5 dark:border-slate-700"
                  style={
                    tier.highlighted
                      ? {
                          borderColor: "rgb(var(--primary-rgb) / 0.4)",
                          backgroundColor: "rgb(var(--primary-rgb) / 0.03)",
                        }
                      : {
                          borderColor: "rgb(229 231 235)",
                          backgroundColor: "rgb(249 250 251)",
                        }
                  }
                >
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="font-semibold text-slate-900 dark:text-white">
                      {tier.name}
                    </h3>
                    <label className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                      <input
                        type="checkbox"
                        checked={tier.highlighted}
                        onChange={() =>
                          setPricing(
                            pricing.map((t, idx) =>
                              idx === ti
                                ? { ...t, highlighted: !t.highlighted }
                                : { ...t, highlighted: false }
                            )
                          )
                        }
                        className="accent-current rounded"
                        style={{ accentColor: "var(--primary)" }}
                      />
                      Highlighted
                    </label>
                  </div>
                  <div className="mb-4">
                    <label className="mb-1 block text-xs font-medium text-slate-500 dark:text-slate-400">
                      Price
                    </label>
                    <input
                      type="text"
                      value={tier.price}
                      onChange={(e) => {
                        setPricing(
                          pricing.map((t, idx) =>
                            idx === ti ? { ...t, price: e.target.value } : t
                          )
                        );
                      }}
                      className="w-32 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-transparent focus:outline-none focus:ring-2 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
                        />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-medium text-slate-500 dark:text-slate-400">
                      Features
                    </label>
                    <div className="space-y-2">
                      {tier.features.map((f, fi) => (
                        <div key={fi} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={f}
                            onChange={(e) =>
                              updatePricingFeature(ti, fi, e.target.value)
                            }
                            placeholder="Feature description"
                            className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm focus:border-transparent focus:outline-none focus:ring-2 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
                                    />
                          {tier.features.length > 1 && (
                            <button
                              onClick={() => removePricingFeature(ti, fi)}
                              className="rounded p-1 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-500"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => addPricingFeature(ti)}
                      className="mt-2 text-xs font-medium transition-colors hover:underline"
                      style={{ color: "var(--primary)" }}
                    >
                      + Add feature
                    </button>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* Step 4: FAQ */}
          {step === 3 && (
            <motion.div key="step4" className="space-y-6" {...fadeIn}>
              {faq.map((item, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-slate-100 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-800/50"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                      FAQ {i + 1}
                    </span>
                    {faq.length > 1 && (
                      <button
                        onClick={() => removeFaq(i)}
                        className="rounded-lg p-1 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      value={item.question}
                      onChange={(e) =>
                        updateFaq(i, { question: e.target.value })
                      }
                      placeholder="Question"
                      className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm focus:border-transparent focus:outline-none focus:ring-2 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                        />
                  </div>
                  <div>
                    <textarea
                      rows={3}
                      value={item.answer}
                      onChange={(e) =>
                        updateFaq(i, { answer: e.target.value })
                      }
                      placeholder="Answer"
                      className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm focus:border-transparent focus:outline-none focus:ring-2 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                        />
                  </div>
                </div>
              ))}
              {faq.length < 8 && (
                <button
                  onClick={addFaq}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-200 py-4 text-sm font-medium text-slate-500 transition-all hover:border-slate-300 hover:text-slate-700 dark:border-slate-700 dark:hover:border-slate-600 dark:hover:text-slate-300"
                >
                  <Plus className="h-4 w-4" /> Add FAQ
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error message */}
        {error && (
          <motion.div
            className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-900/30 dark:text-red-400"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {error}
          </motion.div>
        )}

        {/* Navigation buttons */}
        <div className="mt-10 flex items-center justify-between">
          <button
            onClick={() => setStep(Math.max(0, step - 1))}
            disabled={step === 0}
            className="inline-flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition-all hover:text-slate-900 disabled:opacity-30 dark:text-slate-400 dark:hover:text-white"
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </button>

          {step < 3 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="inline-flex h-10 items-center justify-center gap-1.5 rounded-lg px-6 text-sm font-medium text-white shadow-sm transition-all hover:opacity-90 hover:shadow-md"
              style={{ backgroundColor: "var(--primary)" }}
            >
              Next <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={
                submitting || !productName || !tagline || !description
              }
              className="inline-flex h-10 items-center justify-center gap-1.5 rounded-lg px-6 text-sm font-medium text-white shadow-lg transition-all hover:opacity-90 hover:shadow-xl disabled:opacity-50"
              style={{ backgroundColor: "var(--primary)" }}
            >
              {submitting ? (
                <span className="inline-flex items-center gap-2">
                  <svg
                    className="h-4 w-4 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Generating...
                </span>
              ) : (
                <>
                  Generate My Landing Page{" "}
                  <Sparkles className="h-4 w-4" />
                </>
              )}
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
