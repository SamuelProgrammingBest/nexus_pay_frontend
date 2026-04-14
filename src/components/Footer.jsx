import React from "react";

const Footer = () => {
  return (
    <footer className="border-t border-slate-800/70 bg-slate-950/95 px-6 py-10 text-slate-400 sm:px-10 lg:px-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 md:flex-row md:items-start md:justify-between">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-sky-300">
            Nexus Pay
          </p>
          <p className="max-w-md text-sm leading-7 text-slate-400">
            Modern business banking for teams that move fast. Secure payments,
            smarter approvals, and real-time visibility—all in one platform.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-200">
              Product
            </p>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>Payments</li>
              <li>Accounts</li>
              <li>Insights</li>
            </ul>
          </div>
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-200">
              Company
            </p>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>About us</li>
              <li>Careers</li>
              <li>Contact</li>
            </ul>
          </div>
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-200">
              Resources
            </p>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>Support</li>
              <li>Security</li>
              <li>Blog</li>
            </ul>
          </div>
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-200">
              Legal
            </p>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>Privacy</li>
              <li>Terms</li>
              <li>Cookies</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-4 border-t border-slate-800/70 pt-6 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} Nexus Pay. All rights reserved.</p>
        <p>Built for fast, secure business banking.</p>
      </div>
    </footer>
  );
};

export default Footer;
