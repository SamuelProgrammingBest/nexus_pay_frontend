import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import Logout from "./Logout";

const defaultLinks = [
  {
    label: "Dashboard",
    to: "/dashboard",
    description: "Account overview and balance snapshot",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M3 13h8V3H3v10z" />
        <path d="M13 21h8V11h-8v10z" />
        <path d="M13 7h8" />
        <path d="M3 17h8" />
      </svg>
    ),
  },
  {
    label: "Transfer funds",
    to: "/transfer",
    description: "Send money instantly to any account",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M4 12h16" />
        <path d="M14 6l6 6-6 6" />
        <path d="M20 18v-4" />
      </svg>
    ),
  },
  {
    label: "Pay bills",
    to: "/bills",
    description: "Manage recurring payments and invoices",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        <path d="M9 12h6" />
        <path d="M12 9v6" />
      </svg>
    ),
  },
  {
    label: "Transaction history",
    to: "/transfer-history",
    description: "Review every payment and receipt",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M12 8v4l3 3" />
        <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

// defaultLinks.sli

const Sidebar = ({ className = "", links = defaultLinks }) => {
  return (
    <div className={`min-h-screen bg-slate-950 text-slate-100 ${className}`}>
      {/* <div className="mx-auto max-w-7xl px-6 py-8 sm:px-10 lg:px-12"> */}
        <div className="grid gap-8 xl:grid-cols-[365px_1fr]">
          <aside className="border-r border-slate-800/80 rounded-tr-3xl rounded-br-3xl bg-slate-950/90 p-6 shadow-[0_25px_80px_-35px_rgba(15,23,42,0.9)] backdrop-blur-xl">
            <div className="mb-8">
              <p className="text-xs uppercase tracking-[0.3em] text-sky-300">
                Nexus Pay
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-white">
                Quick access
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Navigate your most important banking workflows from one polished
                panel.
              </p>
            </div>

            <nav className="space-y-3">
              {links.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `group flex items-center justify-between rounded-3xl border border-slate-800/90 bg-slate-900/70 px-4 py-4 transition duration-200 hover:border-sky-500/60 hover:bg-slate-900 ${
                      isActive ? "border-sky-500 bg-slate-900" : ""
                    }`
                  }
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-11 w-13 items-center justify-center rounded-2xl border border-slate-800/80 bg-slate-950 text-sky-300 transition group-hover:border-sky-400 group-hover:text-sky-200">
                      {item.icon}
                    </div>
                    <div>
                      <p className="font-semibold text-white">{item.label}</p>
                      <p className="max-w-xs text-sm text-slate-400">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <span className="text-slate-500 transition group-hover:text-slate-300">
                    →
                  </span>
                </NavLink>
              ))}
            </nav>

            <div className="mt-10 rounded-3xl bg-slate-900/80 p-5 text-sm text-slate-300 ring-1 ring-slate-800/70">
              <p className="font-semibold text-white">Need some context?</p>
              <p className="mt-2 leading-6 text-slate-400">
                Your dashboard gives you a real-time view of balances,
                transfers, bills, and transaction history—all in a single secure
                workspace.
              </p>
            </div>
            <Logout className="cursor-pointer my-6"/>
          </aside>

          <section className="space-y-3 p-5">
            <Outlet />
          </section>
        </div>
      {/* </div> */}
    </div>
  );
};

export default Sidebar;
