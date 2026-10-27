"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { useScroll } from "@/hooks/use-scroll";
import { navItems } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";

export function Header() {
  const scrolled = useScroll();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [dropdownAnimating, setDropdownAnimating] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const scrollYRef = useRef(0);

  // Lock page scroll without jumping when the mobile overlay opens.
  useEffect(() => {
    if (!mobileMenuOpen && !activeDropdown) return;

    scrollYRef.current = window.scrollY;
    const { body, documentElement } = document;
    const prev = {
      overflow: body.style.overflow,
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
    };

    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollYRef.current}px`;
    body.style.width = "100%";

    return () => {
      body.style.overflow = prev.overflow;
      body.style.position = prev.position;
      body.style.top = prev.top;
      body.style.width = prev.width;
      window.scrollTo(0, scrollYRef.current);
      documentElement.style.scrollBehavior = "";
    };
  }, [mobileMenuOpen, activeDropdown]);

  const handleDropdownToggle = (dropdownName: string) => {
    if (activeDropdown === dropdownName) {
      setDropdownAnimating(true);
      setTimeout(() => {
        setActiveDropdown(null);
        setDropdownAnimating(false);
      }, 300);
    } else {
      setActiveDropdown(dropdownName);
      setDropdownAnimating(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node) && activeDropdown) {
        handleDropdownToggle(activeDropdown);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeDropdown]);

  const trackNav = (destination: string, label: string, location: string) => {
    trackEvent("nav_click", { destination, label, location });
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all ${
          mobileMenuOpen
            ? "bg-white"
            : scrolled
              ? "border-b border-black/[0.04] bg-transparent backdrop-blur-md"
              : "bg-transparent"
        }`}
      >
        <div className="container-page relative flex h-[4.25rem] items-center justify-between gap-3">
          <Link
            href="/"
            className="relative z-10 flex shrink-0 items-center gap-2.5"
            onClick={() => trackNav("/", "Home", "header_logo")}
          >
            <div className="h-8 w-8 overflow-hidden rounded-full ring-1 ring-black/5">
              <Image
                src="/DARK%20BLUE%20Fynk%20Tech%20CMYK%20JPEG%20files-05.jpg"
                alt="FynkTech"
                width={32}
                height={32}
                className="h-full w-full object-cover"
                priority
              />
            </div>
            <span className="text-[1.05rem] font-semibold tracking-tight text-[#0A0045]">
              FynkTech
            </span>
          </Link>

          <nav
            ref={navRef}
            className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center rounded-full bg-transparent px-2 py-1.5 ring-1 ring-black/[0.06] backdrop-blur-sm md:flex"
          >
            {navItems.map((item) => (
              <div key={item.label} className="relative">
                {item.href ? (
                  <Link
                    href={item.href}
                    className="group relative inline-flex items-center rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#1a1a1a] transition-colors lg:px-5"
                    onClick={() => trackNav(item.href!, item.label, "header_desktop")}
                  >
                    {item.label}
                    <span
                      aria-hidden
                      className="absolute inset-x-4 bottom-1.5 h-[2px] origin-left scale-x-0 rounded-full bg-[#01B4D2] transition-transform duration-300 ease-out group-hover:scale-x-100"
                    />
                  </Link>
                ) : (
                  <button
                    type="button"
                    className="group relative inline-flex cursor-pointer items-center gap-1 rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#1a1a1a] transition-colors lg:px-5"
                    onClick={() => handleDropdownToggle(item.label)}
                  >
                    {item.label}
                    <span
                      aria-hidden
                      className="absolute inset-x-4 bottom-1.5 h-[2px] origin-left scale-x-0 rounded-full bg-[#01B4D2] transition-transform duration-300 ease-out group-hover:scale-x-100"
                    />
                    <svg
                      className={`h-3 w-3 transition-transform duration-300 ${
                        activeDropdown === item.label ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                )}
              </div>
            ))}
          </nav>

          <div className="relative z-10 flex shrink-0 items-center gap-2">
            <Link
              href="/contact"
              className="hide-mobile-cta inline-flex items-center gap-2 rounded-full bg-transparent px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#1a1a1a] ring-1 ring-black/[0.08] transition-colors hover:bg-[#01B4D2] hover:text-white hover:ring-[#01B4D2]"
              onClick={() => trackEvent("cta_click", { cta: "talk_to_expert", location: "header" })}
            >
              <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.25} aria-hidden />
              Talk to an expert
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="rounded-full bg-transparent p-2.5 ring-1 ring-black/[0.08] transition-colors hover:bg-black/[0.03] md:hidden"
              aria-label="Toggle mobile menu"
              aria-expanded={mobileMenuOpen}
            >
              <div className="flex h-5 w-5 flex-col items-center justify-center">
                <span
                  className={`block h-0.5 w-4 bg-[#1a1a1a] transition-all duration-300 ${
                    mobileMenuOpen ? "translate-y-0.5 rotate-45" : "-translate-y-1"
                  }`}
                />
                <span
                  className={`block h-0.5 w-4 bg-[#1a1a1a] transition-all duration-300 ${
                    mobileMenuOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`block h-0.5 w-4 bg-[#1a1a1a] transition-all duration-300 ${
                    mobileMenuOpen ? "-translate-y-0.5 -rotate-45" : "translate-y-1"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {(activeDropdown || dropdownAnimating) && (
          <div className="fixed inset-0 top-[4.25rem] z-40 hidden md:block">
            <div
              className={`absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300 ${
                dropdownAnimating ? "opacity-0" : "opacity-100"
              }`}
              onClick={() => activeDropdown && handleDropdownToggle(activeDropdown)}
            />
            <div
              className={`absolute left-0 right-0 top-0 border-b border-line bg-white shadow-2xl transition-all duration-300 ${
                dropdownAnimating ? "-translate-y-4 opacity-0" : "translate-y-0 opacity-100"
              }`}
            >
              <div className="container-page py-8" />
            </div>
          </div>
        )}
      </header>

      {/* Separate full-screen overlay — does not push or scroll the page */}
      <div
        className={`fixed inset-0 z-[60] md:hidden ${
          mobileMenuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!mobileMenuOpen}
      >
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
            mobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={closeMobileMenu}
        />

        <div
          className={`absolute inset-x-0 top-0 flex max-h-[100dvh] flex-col bg-white shadow-xl transition-transform duration-300 ease-out ${
            mobileMenuOpen ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <div className="container-page flex h-[4.25rem] shrink-0 items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2.5"
              onClick={() => {
                trackNav("/", "Home", "header_logo");
                closeMobileMenu();
              }}
            >
              <div className="h-8 w-8 overflow-hidden rounded-full ring-1 ring-black/5">
                <Image
                  src="/DARK%20BLUE%20Fynk%20Tech%20CMYK%20JPEG%20files-05.jpg"
                  alt="FynkTech"
                  width={32}
                  height={32}
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="text-[1.05rem] font-semibold tracking-tight text-[#0A0045]">
                FynkTech
              </span>
            </Link>

            <button
              type="button"
              onClick={closeMobileMenu}
              className="rounded-full bg-transparent p-2.5 ring-1 ring-black/[0.08]"
              aria-label="Close menu"
            >
              <div className="flex h-5 w-5 flex-col items-center justify-center">
                <span className="block h-0.5 w-4 translate-y-0.5 rotate-45 bg-[#1a1a1a]" />
                <span className="block h-0.5 w-4 -translate-y-0.5 -rotate-45 bg-[#1a1a1a]" />
              </div>
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto border-t border-black/[0.06] py-4">
            <div className="container-page space-y-1">
              <Link
                href="/"
                className="block rounded-xl px-4 py-3.5 text-sm font-semibold uppercase tracking-[0.12em] text-[#1a1a1a] transition-colors hover:bg-[#F3F4F6]"
                onClick={() => {
                  trackNav("/", "Home", "header_mobile");
                  closeMobileMenu();
                }}
              >
                Home
              </Link>
              <Link
                href="/ai-automation"
                className="block rounded-xl px-4 py-3.5 text-sm font-semibold uppercase tracking-[0.12em] text-[#1a1a1a] transition-colors hover:bg-[#F3F4F6]"
                onClick={() => {
                  trackNav("/ai-automation", "AI Automation", "header_mobile");
                  closeMobileMenu();
                }}
              >
                AI Automation
              </Link>
              <Link
                href="/ecommerce"
                className="block rounded-xl px-4 py-3.5 text-sm font-semibold uppercase tracking-[0.12em] text-[#1a1a1a] transition-colors hover:bg-[#F3F4F6]"
                onClick={() => {
                  trackNav("/ecommerce", "E-commerce", "header_mobile");
                  closeMobileMenu();
                }}
              >
                E-commerce
              </Link>
              <Link
                href="/contact"
                className="block rounded-xl px-4 py-3.5 text-sm font-semibold uppercase tracking-[0.12em] text-[#1a1a1a] transition-colors hover:bg-[#F3F4F6]"
                onClick={() => {
                  trackNav("/contact", "Contact", "header_mobile");
                  closeMobileMenu();
                }}
              >
                Contact
              </Link>
            </div>
          </nav>

          <div className="shrink-0 border-t border-black/[0.06] bg-[#F3F4F6] px-5 py-4">
            <div className="container-page px-0">
              <Link
                href="/contact"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#1a1a1a] shadow-sm ring-1 ring-black/[0.04]"
                onClick={() => {
                  trackEvent("cta_click", { cta: "talk_to_expert", location: "header_mobile" });
                  closeMobileMenu();
                }}
              >
                <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.25} aria-hidden />
                Talk to an expert
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
