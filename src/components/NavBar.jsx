import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/Gemini_Generated_Image_2dbyc12dbyc12dby.png";

const navItems = [
  { label: "Product", href: "#product" },
  { label: "Features", href: "#features" },
  { label: "Security", href: "#security" },
  { label: "Get Started", href: "#get-started" },
];

const NavBar = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/70 bg-slate-950/95 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-10 lg:px-12">
        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="Nexus Pay logo"
            className="h-10 w-10 rounded-2xl object-cover ring-1 ring-slate-700/60"
          />
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-300">
              Nexus Pay
            </p>
            <p className="text-xs text-slate-500">Banking app</p>
          </div>
        </div>
        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm text-slate-300 transition hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/signIn"
            className="rounded-full border border-slate-700/80 bg-slate-900/80 px-5 py-2.5 text-sm font-semibold text-slate-100 transition hover:border-slate-500/90 hover:bg-slate-800"
          >
            Login
          </Link>
          <Link
            to="/signUp"
            className="hidden rounded-full bg-sky-500 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-sky-400 md:inline-flex"
          >
            Sign Up
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
