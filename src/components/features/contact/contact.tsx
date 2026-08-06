"use client";

import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Globe, Crown } from "lucide-react";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  company: z.string().optional(),
  country: z.string().optional(),
  service: z.string().optional(),
  message: z.string().min(10),
});

export function Contact() {
  const form = useForm<z.infer<typeof schema>>();

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Dark Blue-Purple Gradient Background */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #0A0A3C 0%, #1E3296 30%, #2A2A6A 70%, #0A0A3C 100%)'
        }}
      />
      
      {/* Subtle overlay for depth */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at top center, rgba(30, 50, 150, 0.3) 0%, transparent 60%)',
          filter: 'blur(1px)'
        }}
      />
      
      <div className="container-page relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#80DFFF' }}>Ready To Get Started</h2>
          <p className="text-xl max-w-3xl mx-auto" style={{ color: '#FFFFFF' }}>
            Connect with us to explore how our expertise can drive value to your needs.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="backdrop-blur-sm rounded-2xl p-8 border"
            style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.1)', 
              borderColor: 'rgba(255, 255, 255, 0.2)',
              color: '#FFFFFF',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
            }}
          >
            <form
              onSubmit={form.handleSubmit((d) => {
                const parsed = schema.safeParse(d);
                if (!parsed.success) {
                  const first = parsed.error.issues[0];
                  alert(`Please fix: ${first.path.join(".")} — ${first.message}`);
                  return;
                }
                console.log("submit", parsed.data);
              })}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input 
                  className="w-full rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-[#070643]/50 border" 
                  placeholder="Full Name" 
                  style={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.1)', 
                    color: '#FFFFFF', 
                    borderColor: 'rgba(255, 255, 255, 0.3)'
                  }}
                  {...form.register("name")} 
                />
                <input 
                  className="w-full rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-[#070643]/50 border" 
                  placeholder="Email Address" 
                  type="email" 
                  style={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.1)', 
                    color: '#FFFFFF', 
                    borderColor: 'rgba(255, 255, 255, 0.3)'
                  }}
                  {...form.register("email")} 
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input 
                  className="w-full rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-[#070643]/50 border" 
                  placeholder="Phone Number" 
                  style={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.1)', 
                    color: '#FFFFFF', 
                    borderColor: 'rgba(255, 255, 255, 0.3)'
                  }}
                  {...form.register("phone")} 
                />
                <input 
                  className="w-full rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-[#070643]/50 border" 
                  placeholder="Company Name" 
                  style={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.1)', 
                    color: '#FFFFFF', 
                    borderColor: 'rgba(255, 255, 255, 0.3)'
                  }}
                  {...form.register("company")} 
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <select 
                  className="w-full rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-[#070643]/50 border" 
                  style={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.1)', 
                    color: '#FFFFFF', 
                    borderColor: 'rgba(255, 255, 255, 0.3)'
                  }}
                  {...form.register("country")}
                >
                  <option value="">Select Country</option>
                  <option value="AF">Afghanistan</option>
                  <option value="AL">Albania</option>
                  <option value="DZ">Algeria</option>
                  <option value="AR">Argentina</option>
                  <option value="AM">Armenia</option>
                  <option value="AU">Australia</option>
                  <option value="AT">Austria</option>
                  <option value="AZ">Azerbaijan</option>
                  <option value="BH">Bahrain</option>
                  <option value="BD">Bangladesh</option>
                  <option value="BY">Belarus</option>
                  <option value="BE">Belgium</option>
                  <option value="BZ">Belize</option>
                  <option value="BO">Bolivia</option>
                  <option value="BA">Bosnia and Herzegovina</option>
                  <option value="BR">Brazil</option>
                  <option value="BG">Bulgaria</option>
                  <option value="KH">Cambodia</option>
                  <option value="CA">Canada</option>
                  <option value="CL">Chile</option>
                  <option value="CN">China</option>
                  <option value="CO">Colombia</option>
                  <option value="CR">Costa Rica</option>
                  <option value="HR">Croatia</option>
                  <option value="CY">Cyprus</option>
                  <option value="CZ">Czech Republic</option>
                  <option value="DK">Denmark</option>
                  <option value="DO">Dominican Republic</option>
                  <option value="EC">Ecuador</option>
                  <option value="EG">Egypt</option>
                  <option value="EE">Estonia</option>
                  <option value="FI">Finland</option>
                  <option value="FR">France</option>
                  <option value="GE">Georgia</option>
                  <option value="DE">Germany</option>
                  <option value="GH">Ghana</option>
                  <option value="GR">Greece</option>
                  <option value="GT">Guatemala</option>
                  <option value="HN">Honduras</option>
                  <option value="HK">Hong Kong</option>
                  <option value="HU">Hungary</option>
                  <option value="IS">Iceland</option>
                  <option value="IN">India</option>
                  <option value="ID">Indonesia</option>
                  <option value="IR">Iran</option>
                  <option value="IQ">Iraq</option>
                  <option value="IE">Ireland</option>
                  <option value="IL">Israel</option>
                  <option value="IT">Italy</option>
                  <option value="JM">Jamaica</option>
                  <option value="JP">Japan</option>
                  <option value="JO">Jordan</option>
                  <option value="KZ">Kazakhstan</option>
                  <option value="KE">Kenya</option>
                  <option value="KW">Kuwait</option>
                  <option value="LV">Latvia</option>
                  <option value="LB">Lebanon</option>
                  <option value="LT">Lithuania</option>
                  <option value="LU">Luxembourg</option>
                  <option value="MK">Macedonia</option>
                  <option value="MY">Malaysia</option>
                  <option value="MX">Mexico</option>
                  <option value="MD">Moldova</option>
                  <option value="MN">Mongolia</option>
                  <option value="MA">Morocco</option>
                  <option value="NP">Nepal</option>
                  <option value="NL">Netherlands</option>
                  <option value="NZ">New Zealand</option>
                  <option value="NI">Nicaragua</option>
                  <option value="NG">Nigeria</option>
                  <option value="NO">Norway</option>
                  <option value="OM">Oman</option>
                  <option value="PK">Pakistan</option>
                  <option value="PA">Panama</option>
                  <option value="PY">Paraguay</option>
                  <option value="PE">Peru</option>
                  <option value="PH">Philippines</option>
                  <option value="PL">Poland</option>
                  <option value="PT">Portugal</option>
                  <option value="QA">Qatar</option>
                  <option value="RO">Romania</option>
                  <option value="RU">Russia</option>
                  <option value="SA">Saudi Arabia</option>
                  <option value="SG">Singapore</option>
                  <option value="SK">Slovakia</option>
                  <option value="SI">Slovenia</option>
                  <option value="ZA">South Africa</option>
                  <option value="KR">South Korea</option>
                  <option value="ES">Spain</option>
                  <option value="LK">Sri Lanka</option>
                  <option value="SE">Sweden</option>
                  <option value="CH">Switzerland</option>
                  <option value="TW">Taiwan</option>
                  <option value="TH">Thailand</option>
                  <option value="TR">Turkey</option>
                  <option value="UA">Ukraine</option>
                  <option value="AE">United Arab Emirates</option>
                  <option value="GB">United Kingdom</option>
                  <option value="US">United States</option>
                  <option value="UY">Uruguay</option>
                  <option value="UZ">Uzbekistan</option>
                  <option value="VE">Venezuela</option>
                  <option value="VN">Vietnam</option>
                  <option value="YE">Yemen</option>
                  <option value="ZW">Zimbabwe</option>
                </select>
                <select 
                  className="w-full rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-[#070643]/50 border" 
                  style={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.1)', 
                    color: '#FFFFFF', 
                    borderColor: 'rgba(255, 255, 255, 0.3)'
                  }}
                  {...form.register("service")}
                >
                  <option value="">Select Service</option>
                  <optgroup label="AI Automation">
                    <option value="ai-voice-chat">AI Voice & Chat Automation</option>
                    <option value="business-workflow">Business Workflow Automation</option>
                    <option value="ai-sales-marketing">AI Sales & Marketing Automation</option>
                    <option value="data-analytics">Data, Analytics & AI Insight Systems</option>
                    <option value="custom-agents">Custom AI Agent Development</option>
                    <option value="web-development">Web Development</option>
                    <option value="mobile-development">Mobile App Development</option>
                    <option value="ui-ux">UI/UX Design</option>
                    <option value="cloud-application">Cloud Application</option>
                    <option value="qa-support">Quality Assurance, Maintenance & Support</option>
                  </optgroup>
                  <optgroup label="E-commerce Solutions">
                    <option value="store-setup">Store Setup & Development (Shopify / Woo / Custom)</option>
                    <option value="product-sourcing">Product Sourcing & Supply Chain Management</option>
                    <option value="marketing-growth">Marketing & Growth Systems</option>
                    <option value="sales-funnel">Sales Funnel Optimization</option>
                    <option value="operations-automation">Operations & Automation (AI + Workflow + Support)</option>
                    <option value="data-analytics-ecommerce">Data Analytics & Scaling Roadmaps</option>
                    <option value="branding-creative">Branding & Creative Production</option>
                    <option value="maintenance">Maintenance & Long-Term Store Management</option>
                    <option value="ai-ecommerce">AI for eCommerce (Customer Support Bots, Return Bots, Upsell AI, Review Generation)</option>
                  </optgroup>
                </select>
              </div>
              
              <textarea 
                className="w-full rounded-lg px-4 py-3 outline-none min-h-32 focus:ring-2 focus:ring-[#070643]/50 border" 
                placeholder="Your Message" 
                style={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.1)', 
                    color: '#FFFFFF', 
                    borderColor: 'rgba(255, 255, 255, 0.3)'
                }}
                {...form.register("message")} 
              />
              
              <div className="flex items-center gap-2">
                <input type="checkbox" id="recaptcha" className="rounded" />
                <label htmlFor="recaptcha" className="text-sm text-zinc-300">
                  I agree to the terms and conditions
                </label>
              </div>
              
              <button 
                className="w-full text-lg py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105" 
                type="submit"
                style={{
                  background: 'linear-gradient(135deg, #4A4A9A 0%, #2A2A6A 100%)',
                  color: '#FFFFFF',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)'
                }}
              >
                Send Message
              </button>
            </form>
          </motion.div>
          
          {/* Information Blocks */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8 flex flex-col justify-start"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10 min-h-[200px] flex flex-col justify-center">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#0A0045] to-[#0B0050] flex items-center justify-center">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold">Global Presence</h3>
              </div>
              <p className="text-zinc-300">
                With offices across 5 continents, our global reach ensures seamless service delivery and local expertise wherever you are.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10 min-h-[200px] flex flex-col justify-center">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#0A0045] to-[#0B0050] flex items-center justify-center">
                  <Crown className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold">Global Leaders</h3>
              </div>
              <p className="text-zinc-300">
                Our leadership team comprises industry veterans and innovators dedicated to driving success and innovation in every project.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


