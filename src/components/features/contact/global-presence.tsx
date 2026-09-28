"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { companyAddress } from "@/lib/content/company";

/** Markets we serve — links only to existing country routes. */
const regions = [
  {
    name: "Pakistan",
    image: "/lahore.jpg",
    description: "Lahore delivery center",
    path: "/contact",
  },
  {
    name: "United States",
    image: "/computer-4795762_1280.jpg",
    description: "US market",
    path: "/countries/america",
  },
  {
    name: "MENA & Gulf",
    image: "/saudiarabia.jpg",
    description: "UAE, KSA and MENA",
    path: "/countries/mena",
  },
  {
    name: "Kingdom of Saudi Arabia",
    image: "/saudiarabia.jpg",
    description: "KSA & Gulf",
    path: "/countries/ksa-en",
  },
  {
    name: "United Kingdom",
    image: "/Towerbridge.jpg",
    description: "Europe & UK",
    path: "/countries/europe-uk",
  },
];

export function GlobalPresence() {
  const router = useRouter();

  return (
    <section className="py-24 bg-surface relative overflow-hidden">
      <div className="container-page relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-heading">
            Markets we serve
          </h2>
          <p className="text-xl text-body max-w-3xl mx-auto">
            Based in Lahore, we build AI automation and e-commerce systems for clients in Pakistan, the Gulf, the UK and the US.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 mb-16"
        >
          {regions.map((region, index) => (
            <motion.div
              key={region.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer"
              onClick={() => router.push(region.path)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") router.push(region.path);
              }}
              role="link"
              tabIndex={0}
            >
              <div className="relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group-hover:scale-105">
                <div className="aspect-[3/4] relative">
                  <Image
                    src={region.image}
                    alt={region.description}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 20vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white font-bold text-center text-lg md:text-xl group-hover:text-white/90 transition-colors">
                    {region.name}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-surface rounded-2xl p-8 md:p-12 text-left shadow-lg border border-line">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-heading">
              {companyAddress.label}
            </h3>
            <p className="text-lg mb-2 text-body">
              {companyAddress.line1}
              <br />
              {companyAddress.line2}, {companyAddress.country}
            </p>
            <p className="text-lg font-medium text-heading">
              Email: {companyAddress.email}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
