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
} from "lucide-react";
import type { Feature, PricingPlan, FAQItem } from "@/lib/types";
import type { ColorTheme } from "@/lib/colors";

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

const COLOR_OPTIONS: { key: ColorTheme; label: string; class: string }[] = [
  { key: "indigo", label: "Indigo", class: "bg-indigo-500" },
  { key: "violet", label: "Violet", class: "bg-violet-500" },
  { key: "blue", label: "Blue", class: "bg-blue-500" },
  { key: "rose", label: "Rose", class: "bg-rose-500" },
  { key: "orange", label: "Orange", class: "bg-orange-500" },
];

const STEPS = ["Basic Info", "Features", "Pricing", "FAQ"];

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
      features: ["Unlimited projects", "Priority support", "Advanced analytics"],
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

  const addFeature = () => {
    if (features.length < 6) {
      setFeatures([...features, { icon: "Sparkles", title: "", description: "" }]);
    }
  };

  const removeFeature = (i: number) => {
    if (features.length > 1) setFeatures(features.filter((_, idx) => idx !== i));
  };

  const updateFeature = (i: number, f: Partial<Feature>) => {
    setFeatures(features.map((item, idx) => (idx === i ? { ...item, ...f } : item)));
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

  if (result) {
    return (
      <div className="mx-auto max-w-2xl px-4 pb-32 pt-40 text-center sm:px-6">
        <div className="rounded-2xl border border-gray-200 bg-white p-10 shadow-xl">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="mb-4 text-3xl font-bold">Page Created!</h1>
          <p className="mb-8 text-gray-600">
            Your landing page is live at:
          </p>
          <div className="mb-6 flex items-center justify-center gap-3">
            <code className="rounded-lg bg-gray-100 px-4 py-3 text-lg font-mono text-gray-800">
              /p/{result.slug}
            </code>
            <button
              onClick={copyUrl}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition-colors hover:bg-gray-50"
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
              className="btn bg-linear-to-t from-indigo-600 to-indigo-500 bg-[length:100%_100%] bg-[bottom] text-white shadow-sm hover:bg-[length:100%_150%]"
            >
              <span className="inline-flex items-center gap-1.5">
                View Page <ExternalLink className="h-4 w-4" />
              </span>
            </a>
            <button
              onClick={() => {
                setResult(null);
                setStep(0);
              }}
              className="btn bg-white text-gray-700 shadow-sm hover:bg-gray-50"
            >
              Create Another
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 pb-32 pt-28 sm:px-6">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
          Landing Page Generator
        </h1>
        <p className="text-lg text-gray-600">
          Fill in your product details and get a beautiful landing page in seconds.
        </p>
      </div>

      {/* Step indicator */}
      <div className="mb-10">
        <div className="flex items-center justify-center gap-2">
          {STEPS.map((s, i) => (
            <button
              key={i}
              onClick={() => setStep(i)}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                i === step
                  ? "bg-gray-900 text-white shadow-sm"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              <span
                className={`flex h-5 w-5 items-center justify-center rounded-full text-xs ${
                  i === step ? "bg-white/20" : "bg-gray-200"
                }`}
              >
                {i + 1}
              </span>
              <span className="hidden sm:inline">{s}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Form card */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg sm:p-10">
        {/* Step 1: Basic Info */}
        {step === 0 && (
          <div className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Product Name *
              </label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="e.g. FlowAI"
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm transition-colors focus:border-indigo-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Tagline / Slogan *
              </label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                placeholder="e.g. Automate your workflow, amplify your output"
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm transition-colors focus:border-indigo-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Description *
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your product in 1-2 sentences..."
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm transition-colors focus:border-indigo-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
            <div>
              <label className="mb-3 block text-sm font-medium text-gray-700">
                Color Theme
              </label>
              <div className="flex gap-3">
                {COLOR_OPTIONS.map((c) => (
                  <button
                    key={c.key}
                    onClick={() => setColorTheme(c.key)}
                    className={`h-10 w-10 rounded-full ${c.class} transition-transform hover:scale-110 ${
                      colorTheme === c.key
                        ? "ring-2 ring-indigo-500 ring-offset-2 ring-offset-white"
                        : ""
                    }`}
                    title={c.label}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Features */}
        {step === 1 && (
          <div className="space-y-6">
            {features.map((f, i) => (
              <div
                key={i}
                className="rounded-xl border border-gray-100 bg-gray-50 p-5"
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500">
                    Feature {i + 1}
                  </span>
                  {features.length > 1 && (
                    <button
                      onClick={() => removeFeature(i)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
                <div className="mb-3">
                  <label className="mb-1.5 block text-xs text-gray-500">
                    Icon
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {ICON_OPTIONS.map((opt) => (
                      <button
                        key={opt.key}
                        type="button"
                        onClick={() => updateFeature(i, { icon: opt.key })}
                        className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs transition-colors ${
                          f.icon === opt.key
                            ? "border-indigo-300 bg-indigo-50 text-indigo-700"
                            : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                        }`}
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
                    onChange={(e) => updateFeature(i, { title: e.target.value })}
                    placeholder="Feature title"
                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm transition-colors focus:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
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
                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm transition-colors focus:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>
              </div>
            ))}
            {features.length < 6 && (
              <button
                onClick={addFeature}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-200 py-4 text-sm font-medium text-gray-500 transition-colors hover:border-gray-300 hover:text-gray-700"
              >
                <Plus className="h-4 w-4" /> Add Feature
              </button>
            )}
          </div>
        )}

        {/* Step 3: Pricing */}
        {step === 2 && (
          <div className="space-y-8">
            {pricing.map((tier, ti) => (
              <div
                key={ti}
                className={`rounded-xl border p-5 ${
                  tier.highlighted
                    ? "border-indigo-300 bg-indigo-50/50"
                    : "border-gray-100 bg-gray-50"
                }`}
              >
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{tier.name}</h3>
                  </div>
                  <div className="flex items-center gap-3">
                    <label className="text-xs text-gray-500">
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
                        className="mr-1"
                      />
                      Highlighted
                    </label>
                  </div>
                </div>
                <div className="mb-4">
                  <label className="mb-1 block text-xs text-gray-500">
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
                    className="w-32 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-xs text-gray-500">
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
                          className="flex-1 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm"
                        />
                        {tier.features.length > 1 && (
                          <button
                            onClick={() => removePricingFeature(ti, fi)}
                            className="text-gray-400 hover:text-red-500"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => addPricingFeature(ti)}
                    className="mt-2 text-xs font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    + Add feature
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Step 4: FAQ */}
        {step === 3 && (
          <div className="space-y-6">
            {faq.map((item, i) => (
              <div
                key={i}
                className="rounded-xl border border-gray-100 bg-gray-50 p-5"
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500">
                    FAQ {i + 1}
                  </span>
                  {faq.length > 1 && (
                    <button
                      onClick={() => removeFaq(i)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={item.question}
                    onChange={(e) => updateFaq(i, { question: e.target.value })}
                    placeholder="Question"
                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm"
                  />
                </div>
                <div>
                  <textarea
                    rows={3}
                    value={item.answer}
                    onChange={(e) => updateFaq(i, { answer: e.target.value })}
                    placeholder="Answer"
                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm"
                  />
                </div>
              </div>
            ))}
            {faq.length < 8 && (
              <button
                onClick={addFaq}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-200 py-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
              >
                <Plus className="h-4 w-4" /> Add FAQ
              </button>
            )}
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Navigation buttons */}
        <div className="mt-10 flex items-center justify-between">
          <button
            onClick={() => setStep(Math.max(0, step - 1))}
            disabled={step === 0}
            className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 disabled:opacity-30"
          >
            Back
          </button>

          {step < 3 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="btn bg-linear-to-t from-indigo-600 to-indigo-500 bg-[length:100%_100%] bg-[bottom] text-white shadow-sm hover:bg-[length:100%_150%]"
            >
              <span className="inline-flex items-center gap-1.5">
                Next <ArrowRight className="h-4 w-4" />
              </span>
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={submitting || !productName || !tagline || !description}
              className="btn bg-linear-to-t from-indigo-600 to-indigo-500 bg-[length:100%_100%] bg-[bottom] text-white shadow-sm hover:bg-[length:100%_150%] disabled:opacity-50"
            >
              <span className="inline-flex items-center gap-1.5">
                {submitting ? (
                  "Generating..."
                ) : (
                  <>
                    Generate My Landing Page <Sparkles className="h-4 w-4" />
                  </>
                )}
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
