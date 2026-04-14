import React from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const features = [
  {
    title: "Smart money management",
    description:
      "Automated budgets, real-time spending insights, and intelligent saving goals to stretch every dollar.",
  },
  {
    title: "Fast transfers anywhere",
    description:
      "Move funds across accounts, pay bills, and send money globally with bank-grade security.",
  },
  {
    title: "Business-friendly tools",
    description:
      "Manage invoices, track receivables, and access credit options from a single dashboard.",
  },
];

const stats = [
  { value: "24/7", label: "Support" },
  { value: "99.99%", label: "Uptime" },
  { value: "1M+", label: "Accounts" },
];

const pillars = [
  {
    title: "Unified finance hub",
    description:
      "One interface for accounts, payments, cards, and treasury reporting.",
  },
  {
    title: "Next-gen expense controls",
    description:
      "Issue virtual cards, set budgets, and automate approvals with ease.",
  },
  {
    title: "Secure compliance stack",
    description:
      "Encryption, risk monitoring, and permissions built for fast-growing organizations.",
  },
];

const LandingPage = () => {
  return (
    <>
    <NavBar/>
      <main className="bg-slate-950 text-slate-100">
        <section id="product" className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_35%),radial-gradient(circle_at_20%_20%,_rgba(59,130,246,0.14),_transparent_20%)]" />
          <div className="relative mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:px-12 lg:py-24">
            <div className="grid gap-16 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div className="space-y-8">
                <span className="inline-flex rounded-full bg-sky-500/10 px-4 py-1 text-sm font-semibold tracking-[0.24em] text-sky-300 ring-1 ring-sky-500/20">
                  Built for modern banking teams
                </span>
                <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                  The bank operating system for fast, secure money movement.
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
                  Nexus Pay helps individuals and businesses control cash flow,
                  automate payments, and get deeper financial clarity with one
                  powerful dashboard.
                </p>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <button className="inline-flex items-center justify-center rounded-full bg-sky-500 px-6 py-3 text-base font-semibold text-slate-950 transition hover:bg-sky-400">
                    Start free trial
                  </button>
                  <button className="inline-flex items-center justify-center rounded-full border border-slate-700/80 bg-slate-900/80 px-6 py-3 text-base font-semibold text-slate-100 transition hover:border-slate-500/90 hover:bg-slate-800">
                    Explore features
                  </button>
                </div>
                <div className="mt-10 grid gap-4 sm:grid-cols-3">
                  {pillars.map((pillar) => (
                    <div
                      key={pillar.title}
                      className="rounded-3xl border border-slate-800/80 bg-slate-900/70 p-6 shadow-[0_24px_70px_-40px_rgba(15,23,42,0.8)]"
                    >
                      <h3 className="text-lg font-semibold text-white">
                        {pillar.title}
                      </h3>
                      <p className="mt-3 text-sm leading-6 text-slate-400">
                        {pillar.description}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-3xl border border-slate-800/80 bg-slate-900/70 p-5 text-center"
                    >
                      <p className="text-3xl font-semibold text-white">
                        {stat.value}
                      </p>
                      <p className="mt-2 text-sm uppercase tracking-[0.2em] text-slate-500">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
                <div
                  id="security"
                  className="mt-10 rounded-3xl border border-slate-800/80 bg-slate-900/70 p-6 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.8)]"
                >
                  <p className="text-sm uppercase tracking-[0.3em] text-sky-300">
                    Security
                  </p>
                  <p className="mt-4 text-slate-300 leading-7">
                    Bank-grade encryption, continuous fraud monitoring, and
                    granular permission controls keep every transfer protected.
                  </p>
                </div>
              </div>
              <div className="rounded-[2rem] border border-white/10 bg-slate-900/75 p-8 shadow-[0_30px_90px_-40px_rgba(15,23,42,0.9)] backdrop-blur-xl">
                <div className="mb-8 rounded-3xl bg-slate-950/90 p-6 ring-1 ring-slate-700/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm uppercase tracking-[0.25em] text-sky-300">
                        Account balance
                      </p>
                      <p className="mt-3 text-4xl font-semibold text-white">
                        $58,420.75
                      </p>
                    </div>
                    <div className="rounded-2xl bg-slate-800/80 px-4 py-3 text-sm text-slate-200">
                      Active
                    </div>
                  </div>
                  <div className="mt-8 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-3xl bg-slate-950 p-4">
                      <p className="text-sm text-slate-400">Available credit</p>
                      <p className="mt-2 text-lg font-semibold text-white">
                        $12,300
                      </p>
                    </div>
                    <div className="rounded-3xl bg-slate-950 p-4">
                      <p className="text-sm text-slate-400">Monthly savings</p>
                      <p className="mt-2 text-lg font-semibold text-white">
                        $4,510
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="rounded-3xl bg-slate-950/90 p-6 ring-1 ring-slate-700/40">
                    <p className="text-sm uppercase tracking-[0.24em] text-slate-500">
                      Recent activity
                    </p>
                    <ul className="mt-6 space-y-4 text-sm text-slate-300">
                      <li className="flex items-center justify-between rounded-3xl bg-slate-900/80 px-4 py-4">
                        <span>
                          <p className="font-medium text-white">Card payment</p>
                          <p className="text-slate-500">Stripe - 18 Apr</p>
                        </span>
                        <span className="text-sm text-emerald-400">+ $420</span>
                      </li>
                      <li className="flex items-center justify-between rounded-3xl bg-slate-900/80 px-4 py-4">
                        <span>
                          <p className="font-medium text-white">Subscription</p>
                          <p className="text-slate-500">
                            Calendar Pro - 17 Apr
                          </p>
                        </span>
                        <span className="text-sm text-slate-300">- $29</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="border-t border-slate-800/70 py-16">
          <div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-12">
            <div className="grid gap-10 lg:grid-cols-3">
              {features.map((feature) => (
                <article
                  key={feature.title}
                  className="rounded-[2rem] border border-slate-800/80 bg-slate-900/80 p-8 shadow-[0_25px_80px_-45px_rgba(15,23,42,0.85)] transition hover:-translate-y-1 hover:bg-slate-900"
                >
                  <div className="mb-4 inline-flex rounded-2xl bg-sky-500/10 px-3 py-2 text-sm font-semibold text-sky-300">
                    Feature
                  </div>
                  <h2 className="text-2xl font-semibold text-white">
                    {feature.title}
                  </h2>
                  <p className="mt-4 text-slate-400">{feature.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="get-started" className="bg-slate-900/80 py-16">
          <div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-12">
            <div className="rounded-[2rem] border border-slate-800/80 bg-slate-950/95 p-10 text-center shadow-[0_35px_100px_-60px_rgba(15,23,42,0.9)]">
              <p className="text-sm uppercase tracking-[0.3em] text-sky-300">
                Ready to modernize banking?
              </p>
              <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
                Move money faster, safer, and smarter with Nexus Pay.
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-400">
                Start your team with a banking platform built for payments,
                approvals, and financial operations — all in one place.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a
                  href="#"
                  className="inline-flex items-center justify-center rounded-full bg-sky-500 px-7 py-3 text-base font-semibold text-slate-950 transition hover:bg-sky-400"
                >
                  Start free trial
                </a>
              </div>
            </div>
          </div>
        </section>
        <Footer/>
      </main>
    </>
  );
};

export default LandingPage;
