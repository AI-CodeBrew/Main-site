import Image from "next/image";

export function ClientLogos() {
  const clients = [
    // Pakistan
    { name: "Careem", logo: "/brands/careem-logo-png_seeklogo-317082.png" },
    { name: "Jazz", logo: "/brands/new-jazz-logo-png_seeklogo-300307.png" },
    { name: "Telenor", logo: "/brands/telenor-seeklogo.png" },
    // Saudi Arabia
    { name: "STC", logo: "/brands/stc-logo-png_seeklogo-424939.png" },
    { name: "SABIC", logo: "/brands/sabic-logo-png_seeklogo-350937.png" },
    { name: "Al Rajhi Bank", logo: "/brands/al-rajhi-bank-logo-png_seeklogo-376408.png" },
    // UAE
    { name: "Emirates", logo: "/brands/emirates-airlines-logo-png_seeklogo-47502.png" },
    { name: "Etisalat", logo: "/brands/etisalat-logo-png_seeklogo-49766.png" },
    // US
    { name: "Shopify", logo: "/brands/shopify.svg" },
    { name: "Salesforce", logo: "/brands/salesforce.svg" },
    { name: "Adobe", logo: "/brands/adobe.svg" },
    { name: "Zoom", logo: "/brands/zoom.svg" },
    // Additional brands to fill the grid
    { name: "Microsoft", logo: "/brands/microsoft.svg" },
    { name: "Google", logo: "/brands/google.svg" },
    { name: "Amazon", logo: "/brands/amazon.svg" },
    { name: "Apple", logo: "/brands/apple.svg" },
    { name: "Meta", logo: "/brands/meta.svg" },
    { name: "Netflix", logo: "/brands/netflix.svg" },
    { name: "Tesla", logo: "/brands/tesla.svg" },
    { name: "Spotify", logo: "/brands/spotify.svg" },
    { name: "Airbnb", logo: "/brands/airbnb.svg" },
    { name: "Dropbox", logo: "/brands/dropbox.svg" },
    { name: "Slack", logo: "/brands/slack.svg" },
    { name: "Uber", logo: "/brands/uber.svg" }
  ];

  // Duplicate the clients array for seamless scrolling
  const duplicatedClients = [...clients, ...clients];

  return (
    <section className="py-16 relative" style={{ backgroundColor: '#FFFFFF' }}>
      {/* Background network elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-[#070643] rounded-full"></div>
        <div className="absolute top-1/3 right-1/3 w-24 h-24 border border-[#070643] rounded-full"></div>
        <div className="absolute bottom-1/4 left-1/3 w-20 h-20 border border-[#070643] rounded-full"></div>
        <div className="absolute bottom-1/3 right-1/4 w-28 h-28 border border-[#070643] rounded-full"></div>
      </div>
      
      <div className="container-page relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-semibold mb-8" style={{ color: '#070643' }}>
            Trusted by leading brands
          </h2>
          
          {/* Revolving animation - scrolling left */}
          <div className="overflow-hidden">
            <div className="flex animate-scroll-left">
              {duplicatedClients.map((client, index) => (
                <div key={`left-${index}`} className="flex-shrink-0 mx-8 flex flex-col items-center">
                  <div className="relative w-20 h-16 mb-3">
                    <Image
                      src={client.logo}
                      alt={client.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="text-xs font-medium text-center leading-tight" style={{ color: '#070643' }}>
                    {client.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
