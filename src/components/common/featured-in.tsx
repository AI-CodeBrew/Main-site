"use client";

export function FeaturedIn() {
  const media = [
    "Forbes", "Yahoo! Finance", "Khaleej Times", "Mashable", "BENZINGA", 
    "New York Times", "BUSINESS INSIDER", "Associated Press", "TechCrunch",
    "Wired", "The Verge", "Ars Technica", "Engadget", "Gizmodo", "CNET",
    "VentureBeat", "Fast Company", "Inc.", "Entrepreneur", "Harvard Business Review"
  ];

  // Duplicate the media array for seamless scrolling
  const duplicatedMedia = [...media, ...media];

  return (
    <section className="py-20 relative" style={{ backgroundColor: '#FFFFFF' }}>
      {/* Background network elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-[#070643] rounded-full"></div>
        <div className="absolute top-1/3 right-1/3 w-24 h-24 border border-[#070643] rounded-full"></div>
        <div className="absolute bottom-1/4 left-1/3 w-20 h-20 border border-[#070643] rounded-full"></div>
        <div className="absolute bottom-1/3 right-1/4 w-28 h-28 border border-[#070643] rounded-full"></div>
      </div>
      
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-50/30 to-transparent"></div>
      
      <div className="container-page relative z-10">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12" style={{ color: '#070643' }}>
            Featured in
          </h2>
          
          {/* Revolving animation - scrolling right */}
          <div className="overflow-hidden">
            <div className="flex animate-scroll-right">
              {duplicatedMedia.map((outlet, index) => (
                <div key={`right-${index}`} className="flex-shrink-0 mx-8">
                  <div className="relative px-6 py-4">
                    <span className="text-lg font-bold text-center transition-colors duration-300 whitespace-nowrap" style={{ color: '#070643' }}>
                      {outlet}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
