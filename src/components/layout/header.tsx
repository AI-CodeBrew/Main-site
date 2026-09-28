"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { CountryDropdown } from "@/components/ui/country-dropdown";
import { useScroll } from "@/hooks/use-scroll";
import { navItems } from "@/lib/constants";

export function Header() {
  const scrolled = useScroll();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [dropdownAnimating, setDropdownAnimating] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  // Prevent body scroll when mobile menu or desktop dropdown is open
  useEffect(() => {
    if (mobileMenuOpen || activeDropdown) {
      // Prevent scrolling on the main page
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = '0';
    } else {
      // Restore scrolling
      document.body.style.overflow = 'unset';
      document.body.style.position = 'unset';
      document.body.style.width = 'unset';
      document.body.style.top = 'unset';
    }

    return () => {
      // Cleanup on unmount
      document.body.style.overflow = 'unset';
      document.body.style.position = 'unset';
      document.body.style.width = 'unset';
      document.body.style.top = 'unset';
    };
  }, [mobileMenuOpen, activeDropdown]);

  const toggleMobileDropdown = (dropdownName: string) => {
    setOpenMobileDropdown(openMobileDropdown === dropdownName ? null : dropdownName);
  };

  const handleDropdownToggle = (dropdownName: string) => {
    if (activeDropdown === dropdownName) {
      // Closing dropdown
      setDropdownAnimating(true);
      setTimeout(() => {
        setActiveDropdown(null);
        setDropdownAnimating(false);
      }, 300); // Match animation duration
    } else {
      // Opening dropdown
      setActiveDropdown(dropdownName);
      setDropdownAnimating(false);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node) && activeDropdown) {
        handleDropdownToggle(activeDropdown);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeDropdown]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all ${
        scrolled ? "bg-surface border-b border-line" : "bg-surface"
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full overflow-hidden ring-1 ring-white/20">
            <Image
              src="/DARK%20BLUE%20Fynk%20Tech%20CMYK%20JPEG%20files-05.jpg"
              alt="Fynk Tech logo"
              width={32}
              height={32}
              className="h-full w-full object-cover"
              priority
            />
          </div>
          <span className="font-semibold text-heading">Fynk Tech</span>
        </Link>
        <nav ref={navRef} className="hidden md:flex items-center gap-6 text-sm">
          {navItems.map((item) => (
            <div key={item.label} className="relative">
              {item.href ? (
                <Link href={item.href} className="text-body hover:text-heading transition link-underline">
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              )}
            </div>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <CountryDropdown mobileMenuOpen={mobileMenuOpen} />
          <Link href="/contact" className="btn btn-primary hide-mobile-cta">Talk to an expert</Link>
          
          {/* Mobile Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-surface-muted transition-colors"
            aria-label="Toggle mobile menu"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span className={`block h-0.5 w-5 bg-gray-600 transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'}`}></span>
              <span className={`block h-0.5 w-5 bg-gray-600 transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
              <span className={`block h-0.5 w-5 bg-gray-600 transition-all duration-300 ease-in-out ${mobileMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'}`}></span>
            </div>
          </button>
        </div>
      </div>

      {/* Full-Screen Desktop Dropdown Overlay */}
      {(activeDropdown || dropdownAnimating) && (
        <div className="fixed inset-0 top-16 z-40 md:block hidden">
          {/* Backdrop */}
          <div 
            className={`absolute inset-0 bg-black/20 backdrop-blur-sm transition-all duration-300 ease-out ${
              activeDropdown && !dropdownAnimating 
                ? 'opacity-100' 
                : 'opacity-0'
            }`}
            onClick={() => handleDropdownToggle(activeDropdown || '')} 
          />
          
          {/* Full-Screen Dropdown Content */}
          <div className={`absolute top-0 left-0 right-0 bg-surface dark:bg-gray-900 shadow-2xl transition-all duration-500 ease-out ${
            activeDropdown && !dropdownAnimating
              ? 'opacity-100 transform translate-y-0'
              : 'opacity-0 transform -translate-y-8'
          }`}>
            <div className="container-page py-8">
              {navItems.find(item => item.label === activeDropdown)?.dropdown && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {navItems.find(item => item.label === activeDropdown)?.dropdown?.map((dropdownItem) => (
                    <Link
                      key={dropdownItem.href}
                      href={dropdownItem.href!}
                      className="block p-6 bg-surface-muted dark:bg-gray-800 rounded-xl hover:bg-[#0A0045] dark:hover:bg-[#0A0045] transition-colors duration-300 ease-out"
                      onClick={() => handleDropdownToggle(activeDropdown || '')}
                    >
                      <h3 className="text-lg font-semibold text-heading dark:text-white hover:text-white transition-colors duration-150 ease-out">
                        {dropdownItem.label}
                      </h3>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

             {/* Mobile Drawer */}
             <div className={`fixed top-16 left-0 right-0 bottom-0 z-50 md:hidden transition-all duration-300 ${mobileMenuOpen ? 'visible opacity-100' : 'invisible opacity-0'}`}>
               {/* Backdrop */}
               <div 
                 className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                 onClick={() => setMobileMenuOpen(false)} 
               />
               
               {/* Drawer */}
               <div className={`absolute right-0 top-0 h-full w-96 max-w-[90vw] bg-surface dark:bg-gray-900 shadow-2xl transform transition-transform duration-300 ease-out flex flex-col ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                 {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-6">
            <div className="space-y-2 px-6">
              {/* Home */}
              <Link 
                href="/"
                className="block px-4 py-3 text-body dark:text-gray-200 hover:text-heading dark:hover:text-white hover:bg-surface-muted dark:hover:bg-gray-800 rounded-lg transition-all duration-200 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>

              {/* AI Automation */}
              <Link
                href="/ai-automation"
                className="block px-4 py-3 text-body dark:text-gray-200 hover:text-heading dark:hover:text-white hover:bg-surface-muted dark:hover:bg-gray-800 rounded-lg transition-all duration-200 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                AI Automation
              </Link>

              {/* Ecommerce */}
              <Link
                href="/ecommerce"
                className="block px-4 py-3 text-body dark:text-gray-200 hover:text-heading dark:hover:text-white hover:bg-surface-muted dark:hover:bg-gray-800 rounded-lg transition-all duration-200 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Ecommerce
              </Link>

              {/* What We Are Dropdown */}
              <div>
                <button
                  onClick={() => toggleMobileDropdown('what-we-are')}
                  className="w-full px-4 py-3 flex items-center justify-between text-body dark:text-gray-200 hover:text-heading dark:hover:text-white hover:bg-surface-muted dark:hover:bg-gray-800 rounded-lg transition-all duration-200 font-medium"
                >
                  What We Are
                  <svg 
                    className={`w-4 h-4 transition-transform duration-200 ${openMobileDropdown === 'what-we-are' ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ease-out ${openMobileDropdown === 'what-we-are' ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="ml-4 space-y-1">
                    <Link
                      href="/about"
                      className="block px-4 py-2 text-body dark:text-gray-300 hover:text-heading dark:hover:text-white hover:bg-surface-muted dark:hover:bg-gray-800 rounded-lg transition-all duration-200 text-sm"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      About us
                    </Link>
                    <Link
                      href="/case-studies"
                      className="block px-4 py-2 text-body dark:text-gray-300 hover:text-heading dark:hover:text-white hover:bg-surface-muted dark:hover:bg-gray-800 rounded-lg transition-all duration-200 text-sm"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Case studies
                    </Link>
                    <Link
                      href="/blog"
                      className="block px-4 py-2 text-body dark:text-gray-300 hover:text-heading dark:hover:text-white hover:bg-surface-muted dark:hover:bg-gray-800 rounded-lg transition-all duration-200 text-sm"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Blogs
                    </Link>
                  </div>
                </div>
              </div>
              <Link
                href="/team"
                className="block px-4 py-3 text-body dark:text-gray-200 hover:text-heading dark:hover:text-white hover:bg-surface-muted dark:hover:bg-gray-800 rounded-lg transition-all duration-200 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Team
              </Link>
              <Link
                href="/contact"
                className="block px-4 py-3 text-body dark:text-gray-200 hover:text-heading dark:hover:text-white hover:bg-surface-muted dark:hover:bg-gray-800 rounded-lg transition-all duration-200 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </nav>
          
          {/* Footer CTA */}
          <div className="p-6 border-t border-line dark:border-gray-700 bg-surface dark:bg-gray-900">
            <Link 
              href="/contact" 
              className="block w-full text-center px-6 py-3 bg-gradient-to-r from-[#0A0045] to-[#1a1a2e] text-white font-semibold rounded-lg hover:from-[#070643] hover:to-[#16213e] transition-all duration-300 shadow-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              Talk to an expert
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}


