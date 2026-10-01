"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useScroll } from "@/hooks/use-scroll";
import { navItems } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";

export function Header() {
  const scrolled = useScroll();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [dropdownAnimating, setDropdownAnimating] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  // Prevent body scroll when mobile menu or desktop dropdown is open
  useEffect(() => {
    if (mobileMenuOpen || activeDropdown) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.top = "0";
    } else {
      document.body.style.overflow = "unset";
      document.body.style.position = "unset";
      document.body.style.width = "unset";
      document.body.style.top = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      document.body.style.position = "unset";
      document.body.style.width = "unset";
      document.body.style.top = "unset";
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

  return (
    <header
      className={`sticky top-0 z-50 bg-[#F3F4F6] transition-all ${
        scrolled ? "border-b border-gray-200" : ""
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-3"
          onClick={() => trackNav("/", "Home", "header_logo")}
        >
          <div className="h-8 w-8 rounded-full overflow-hidden ring-1 ring-white/20">
            <Image
              src="/DARK%20BLUE%20Fynk%20Tech%20CMYK%20JPEG%20files-05.jpg"
              alt="Fynk Tech"
              width={32}
              height={32}
              className="h-full w-full object-cover"
              priority
            />
          </div>
          <span className="text-lg font-semibold text-heading">Fynk Tech</span>
        </Link>
        <nav
          ref={navRef}
          className="hidden md:flex items-center gap-6 lg:gap-10 text-[15px] lg:text-base font-medium"
        >
          {navItems.map((item) => (
            <div key={item.label} className="relative">
              {item.href ? (
                <Link
                  href={item.href}
                  className="text-body hover:text-heading transition link-underline"
                  onClick={() => trackNav(item.href!, item.label, "header_desktop")}
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  className="text-body hover:text-heading transition-all duration-300 ease-out cursor-pointer flex items-center gap-1 hover:scale-105"
                  onClick={() => handleDropdownToggle(item.label)}
                >
                  {item.label}
                  <svg
                    className={`h-4 w-4 transition-all duration-500 ease-out ${
                      activeDropdown === item.label ? "rotate-180 scale-110" : "rotate-0 scale-100"
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
        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="btn btn-primary hide-mobile-cta"
            onClick={() => trackEvent("cta_click", { cta: "talk_to_expert", location: "header" })}
          >
            Talk to an expert
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-surface-muted transition-colors"
            aria-label="Toggle mobile menu"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span
                className={`block h-0.5 w-5 bg-gray-600 transition-all duration-300 ease-in-out ${
                  mobileMenuOpen ? "rotate-45 translate-y-1" : "-translate-y-1"
                }`}
              />
              <span
                className={`block h-0.5 w-5 bg-gray-600 transition-all duration-300 ease-in-out ${
                  mobileMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`block h-0.5 w-5 bg-gray-600 transition-all duration-300 ease-in-out ${
                  mobileMenuOpen ? "-rotate-45 -translate-y-1" : "translate-y-1"
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {(activeDropdown || dropdownAnimating) && (
        <div className="fixed inset-0 top-16 z-40 md:block hidden">
          <div
            className={`absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300 ${
              dropdownAnimating ? "opacity-0" : "opacity-100"
            }`}
            onClick={() => activeDropdown && handleDropdownToggle(activeDropdown)}
          />
          <div
            className={`absolute top-0 left-0 right-0 bg-surface dark:bg-gray-900 shadow-2xl border-b border-line dark:border-gray-700 transition-all duration-300 ${
              dropdownAnimating ? "opacity-0 -translate-y-4" : "opacity-100 translate-y-0"
            }`}
          >
            <div className="container-page py-8" />
          </div>
        </div>
      )}

      <div
        className={`fixed top-16 left-0 right-0 bottom-0 z-50 md:hidden transition-all duration-300 ${
          mobileMenuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />

        <div
          className={`absolute right-0 top-0 h-full w-96 max-w-[90vw] bg-surface dark:bg-gray-900 shadow-2xl transform transition-transform duration-300 ease-out flex flex-col ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <nav className="flex-1 overflow-y-auto py-6">
            <div className="space-y-2 px-6">
              <Link
                href="/"
                className="block px-4 py-3 text-body dark:text-gray-200 hover:text-heading dark:hover:text-white hover:bg-surface-muted dark:hover:bg-gray-800 rounded-lg transition-all duration-200 font-medium"
                onClick={() => {
                  trackNav("/", "Home", "header_mobile");
                  setMobileMenuOpen(false);
                }}
              >
                Home
              </Link>

              <Link
                href="/ai-automation"
                className="block px-4 py-3 text-body dark:text-gray-200 hover:text-heading dark:hover:text-white hover:bg-surface-muted dark:hover:bg-gray-800 rounded-lg transition-all duration-200 font-medium"
                onClick={() => {
                  trackNav("/ai-automation", "AI Automation", "header_mobile");
                  setMobileMenuOpen(false);
                }}
              >
                AI Automation
              </Link>

              <Link
                href="/ecommerce"
                className="block px-4 py-3 text-body dark:text-gray-200 hover:text-heading dark:hover:text-white hover:bg-surface-muted dark:hover:bg-gray-800 rounded-lg transition-all duration-200 font-medium"
                onClick={() => {
                  trackNav("/ecommerce", "Ecommerce", "header_mobile");
                  setMobileMenuOpen(false);
                }}
              >
                Ecommerce
              </Link>

              <Link
                href="/contact"
                className="block px-4 py-3 text-body dark:text-gray-200 hover:text-heading dark:hover:text-white hover:bg-surface-muted dark:hover:bg-gray-800 rounded-lg transition-all duration-200 font-medium"
                onClick={() => {
                  trackNav("/contact", "Contact", "header_mobile");
                  setMobileMenuOpen(false);
                }}
              >
                Contact
              </Link>
            </div>
          </nav>

          <div className="p-6 border-t border-line dark:border-gray-700 bg-surface dark:bg-gray-900">
            <Link
              href="/contact"
              className="block w-full text-center px-6 py-3 bg-gradient-to-r from-[#0A0045] to-[#1a1a2e] text-white font-semibold rounded-lg hover:from-[#070643] hover:to-[#16213e] transition-all duration-300 shadow-lg"
              onClick={() => {
                trackEvent("cta_click", { cta: "talk_to_expert", location: "header_mobile" });
                setMobileMenuOpen(false);
              }}
            >
              Talk to an expert
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
