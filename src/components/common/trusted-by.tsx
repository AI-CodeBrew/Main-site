"use client";

import Image from "next/image";

interface Brand {
  name: string;
  logo: string;
  alt: string;
}

const upperBrands: Brand[] = [
  { name: "Microsoft", logo: "/brands/microsoft.svg", alt: "Microsoft" },
  { name: "Google", logo: "/brands/google.svg", alt: "Google" },
  { name: "Amazon", logo: "/brands/amazon.svg", alt: "Amazon" },
  { name: "Apple", logo: "/brands/apple.svg", alt: "Apple" },
  { name: "Meta", logo: "/brands/meta.svg", alt: "Meta" },
  { name: "Netflix", logo: "/brands/netflix.svg", alt: "Netflix" },
  { name: "Tesla", logo: "/brands/tesla.svg", alt: "Tesla" },
  { name: "Spotify", logo: "/brands/spotify.svg", alt: "Spotify" },
];

const lowerBrands: Brand[] = [
  { name: "Adobe", logo: "/brands/adobe.svg", alt: "Adobe" },
  { name: "Salesforce", logo: "/brands/salesforce.svg", alt: "Salesforce" },
  { name: "Shopify", logo: "/brands/shopify.svg", alt: "Shopify" },
  { name: "Slack", logo: "/brands/slack.svg", alt: "Slack" },
  { name: "Zoom", logo: "/brands/zoom.svg", alt: "Zoom" },
  { name: "Dropbox", logo: "/brands/dropbox.svg", alt: "Dropbox" },
  { name: "Airbnb", logo: "/brands/airbnb.svg", alt: "Airbnb" },
  { name: "Uber", logo: "/brands/uber.svg", alt: "Uber" },
];

export function TrustedBy() {
  return (
    <section className="py-20 bg-surface dark:bg-[#070643] overflow-hidden">
      <div className="container-page">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-heading dark:text-white mb-4">
            Trusted by Leading Brands
          </h2>
          <p className="text-body dark:text-gray-300 max-w-2xl mx-auto">
            We power innovation for the world's most successful companies
          </p>
        </div>

        {/* Upper row - revolving left */}
        <div className="relative mb-8">
          <div className="flex animate-scroll-left">
            {/* First set */}
            {upperBrands.map((brand, index) => (
              <div
                key={`upper-1-${index}`}
                className="flex-shrink-0 mx-8 flex items-center justify-center"
              >
                <div className="relative w-32 h-16 opacity-60 hover:opacity-100 transition-opacity duration-300">
                  <Image
                    src={brand.logo}
                    alt={brand.alt}
                    fill
                    className="object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                    sizes="128px"
                  />
                </div>
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {upperBrands.map((brand, index) => (
              <div
                key={`upper-2-${index}`}
                className="flex-shrink-0 mx-8 flex items-center justify-center"
                aria-hidden="true"
              >
                <div className="relative w-32 h-16 opacity-60 hover:opacity-100 transition-opacity duration-300">
                  <Image
                    src={brand.logo}
                    alt=""
                    fill
                    className="object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                    sizes="128px"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lower row - revolving right */}
        <div className="relative">
          <div className="flex animate-scroll-right">
            {/* First set */}
            {lowerBrands.map((brand, index) => (
              <div
                key={`lower-1-${index}`}
                className="flex-shrink-0 mx-8 flex items-center justify-center"
              >
                <div className="relative w-32 h-16 opacity-60 hover:opacity-100 transition-opacity duration-300">
                  <Image
                    src={brand.logo}
                    alt={brand.alt}
                    fill
                    className="object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                    sizes="128px"
                  />
                </div>
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {lowerBrands.map((brand, index) => (
              <div
                key={`lower-2-${index}`}
                className="flex-shrink-0 mx-8 flex items-center justify-center"
                aria-hidden="true"
              >
                <div className="relative w-32 h-16 opacity-60 hover:opacity-100 transition-opacity duration-300">
                  <Image
                    src={brand.logo}
                    alt=""
                    fill
                    className="object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                    sizes="128px"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
