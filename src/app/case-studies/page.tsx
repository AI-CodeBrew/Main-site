import { PageHero } from "@/components/common/page-hero";
import { CaseStudies } from "@/components/features/contact/case-studies";
import { Contact } from "@/components/features/contact/contact";

export default function CaseStudiesPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <PageHero 
        title="Case Studies"
        subtitle="Success Stories"
        description="Discover how we've helped businesses transform their operations with AI automation and e-commerce solutions"
        backgroundImage="/case study.jpeg"
        showButtons={true}
      />
      
      {/* Overview Section */}
      <section className="py-24 bg-white">
        <div className="container-page">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                  Real Results, Real Impact
                </h2>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Our case studies showcase the transformative power of AI automation and e-commerce solutions. 
                  From startups to enterprise clients, we've delivered measurable results that drive growth and efficiency.
                </p>
                <div className="grid grid-cols-2 gap-8">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-[#0A0045] mb-2">100+</div>
                    <div className="text-gray-600">Projects Delivered</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-[#0A0045] mb-2">95%</div>
                    <div className="text-gray-600">Client Satisfaction</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-[#0A0045] mb-2">20+</div>
                    <div className="text-gray-600">Countries Served</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-[#0A0045] mb-2">24/7</div>
                    <div className="text-gray-600">Support Available</div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                  <img 
                    src="/case study.jpeg" 
                    alt="Case Studies Overview"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 bg-gray-50">
        <div className="container-page">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Our Approach to Success
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Every project follows our proven methodology that ensures maximum impact and sustainable growth for our clients.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-[#0A0045] to-[#1a1a2e] rounded-2xl flex items-center justify-center mb-6">
                <span className="text-white text-2xl font-bold">1</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Discovery & Analysis</h3>
              <p className="text-gray-600 leading-relaxed">
                We start by understanding your business goals, challenges, and opportunities through comprehensive analysis and stakeholder interviews.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-[#0A0045] to-[#1a1a2e] rounded-2xl flex items-center justify-center mb-6">
                <span className="text-white text-2xl font-bold">2</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Strategy & Planning</h3>
              <p className="text-gray-600 leading-relaxed">
                Our team develops a customized strategy and detailed implementation plan tailored to your specific needs and objectives.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-[#0A0045] to-[#1a1a2e] rounded-2xl flex items-center justify-center mb-6">
                <span className="text-white text-2xl font-bold">3</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Implementation & Support</h3>
              <p className="text-gray-600 leading-relaxed">
                We execute the solution with precision and provide ongoing support to ensure long-term success and continuous optimization.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Client Success Stories Section */}
      <CaseStudies />

      {/* Ready to Get Started Section */}
      <Contact />
    </main>
  );
}