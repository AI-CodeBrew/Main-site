"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";

const regions = [
  {
    name: "Pakistan",
    image: "/lahore.jpg",
    description: "Badshahi Mosque, Lahore",
    path: "/countries/pakistan"
  },
  {
    name: "United States of America",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
    description: "New York City Skyline",
    path: "/countries/america"
  },
  {
    name: "United Arab Emirates",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
    description: "Burj Al Arab, Dubai",
    path: "/countries/uae"
  },
  {
    name: "Kingdom of Saudi Arabia",
    image: "/saudiarabia.jpg",
    description: "Kingdom Centre Tower, Riyadh",
    path: "/countries/ksa-en"
  },
  {
    name: "United Kingdom",
    image: "/Towerbridge.jpg",
    description: "Tower Bridge, London",
    path: "/countries/europe-uk"
  }
];

const officeInfo = {
  location: "Riyadh, Saudi Arabia Office",
  address: "Office # 302, Al Balad Building near Othman Bakerman Exchange, Riyadh",
  phone: "+966 50 885 4893"
};

export function GlobalPresence() {
  const router = useRouter();

  const handleCardClick = (path: string) => {
    router.push(path);
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container-page relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Our Global Presence
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We support clients in 23+ countries and drive continued growth through innovation and transformation.
          </p>
        </motion.div>

        {/* Region Images Gallery */}
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
              onClick={() => handleCardClick(region.path)}
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

        {/* Office Information */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white rounded-2xl p-8 md:p-12 text-left shadow-lg">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
              {officeInfo.location}
            </h3>
            <p className="text-lg mb-2 text-gray-700">
              {officeInfo.address}
            </p>
            <p className="text-lg font-medium text-gray-900">
              Phone: {officeInfo.phone}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
