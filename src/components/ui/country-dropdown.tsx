"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { CountryOption } from "@/types";
import { countryOptions } from "@/lib/constants";
import { useClickOutside } from "@/hooks/use-click-outside";

interface CountryDropdownProps {
  mobileMenuOpen?: boolean;
}

export function CountryDropdown({ mobileMenuOpen = false }: CountryDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<CountryOption>(countryOptions[0]); // Default to Global
  const dropdownRef = useClickOutside<HTMLDivElement>(() => setIsOpen(false));
  const pathname = usePathname();

  // Detect current page and set appropriate country
  useEffect(() => {
    const pathToCountry: Record<string, string> = {
      "/": "global",
      "/countries/mena": "mena",
      "/countries/ksa-en": "ksa-en",
      "/countries/america": "america",
      "/countries/europe-uk": "europe-uk"
    };

    const currentCountryValue = pathToCountry[pathname] || "global";
    const currentCountry = countryOptions.find(option => option.value === currentCountryValue) || countryOptions[0];
    setSelectedCountry(currentCountry);
  }, [pathname]);

  const handleCountrySelect = (country: CountryOption) => {
    setSelectedCountry(country);
    setIsOpen(false);
    
    // Navigate to country-specific page
    const countryRoutes: Record<string, string> = {
      "global": "/",
      "mena": "/countries/mena",
      "ksa-en": "/countries/ksa-en",
      "america": "/countries/america",
      "europe-uk": "/countries/europe-uk"
    };
    
    const route = countryRoutes[country.value];
    if (route && route !== window.location.pathname) {
      window.location.href = route;
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm text-body hover:text-heading transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 rounded-md"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span>{selectedCountry.label}</span>
        <svg 
          className={`h-4 w-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className={`absolute top-full right-0 mt-2 w-48 sm:w-56 md:w-64 bg-surface backdrop-blur-sm border border-line rounded-lg py-2 shadow-xl ${mobileMenuOpen ? 'z-[70]' : 'z-50'}`}>
          {countryOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleCountrySelect(option)}
              className={`w-full text-left px-4 py-2 text-sm transition-colors duration-200 ${
                selectedCountry.value === option.value
                  ? "text-white bg-[#0A0045]"
                  : "text-heading hover:text-white hover:bg-[#0A0045]"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
