"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showPolicy, setShowPolicy] = useState(false);
  
  useEffect(() => {
    const v = typeof window !== "undefined" && window.localStorage.getItem("cookie-consent");
    if (!v) setVisible(true);
  }, []);
  
  if (!visible) return null;
  
  return (
    <>
      {/* Cookie Consent Banner */}
      <div className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:max-w-md z-[60]">
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
          {/* Header with Logo */}
          <div className="bg-gradient-to-r from-[#0A0045] to-[#1a1a2e] p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-white/20">
              <Image
                src="/DARK%20BLUE%20Fynk%20Tech%20CMYK%20JPEG%20files-05.jpg"
                alt="FynkTech"
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg">FynkTech</h3>
              <p className="text-white/70 text-sm">AI & E-commerce Solutions</p>
            </div>
          </div>
          
          {/* Content */}
          <div className="p-6">
            <div className="flex items-start gap-3 mb-4">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-2">We use cookies to enhance your experience</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  We use cookies to provide you with the best possible experience on our website. 
                  They help us understand how you use our site and improve our services.
                </p>
              </div>
            </div>
            
            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                className="flex-1 bg-gradient-to-r from-[#0A0045] to-[#1a1a2e] text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 hover:scale-105"
                onClick={() => {
                  window.localStorage.setItem("cookie-consent", "true");
                  setVisible(false);
                }}
              >
                Accept All
              </button>
              <button 
                className="flex-1 border-2 border-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:border-[#0A0045] hover:text-[#0A0045] transition-all duration-200"
                onClick={() => setShowPolicy(true)}
              >
                Customize
              </button>
            </div>
            
            {/* Privacy Policy Link */}
            <div className="mt-4 text-center">
              <button 
                className="text-sm text-gray-500 hover:text-[#0A0045] transition-colors duration-200 underline-offset-2 hover:underline"
                onClick={() => setShowPolicy(true)}
              >
                Privacy Policy & Terms
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Privacy Policy Modal */}
      {showPolicy && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowPolicy(false)} />
          <div className="relative z-[71] max-w-2xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#0A0045] to-[#1a1a2e] p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-white/20">
                <Image
                  src="/DARK%20BLUE%20Fynk%20Tech%20CMYK%20JPEG%20files-05.jpg"
                  alt="FynkTech"
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-white font-bold text-xl">Cookie Preferences</h2>
                <p className="text-white/70">Manage your privacy settings</p>
              </div>
            </div>
            
            {/* Modal Content */}
            <div className="p-6 max-h-96 overflow-y-auto">
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Essential Cookies</h3>
                  <p className="text-sm text-gray-600 mb-3">These cookies are necessary for the website to function properly.</p>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Always Active</span>
                    <div className="w-12 h-6 bg-[#0A0045] rounded-full flex items-center justify-end px-1">
                      <div className="w-4 h-4 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Analytics Cookies</h3>
                  <p className="text-sm text-gray-600 mb-3">Help us understand how visitors interact with our website.</p>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Optional</span>
                    <div className="w-12 h-6 bg-gray-300 rounded-full flex items-center px-1">
                      <div className="w-4 h-4 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Marketing Cookies</h3>
                  <p className="text-sm text-gray-600 mb-3">Used to track visitors across websites for advertising purposes.</p>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Optional</span>
                    <div className="w-12 h-6 bg-gray-300 rounded-full flex items-center px-1">
                      <div className="w-4 h-4 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Modal Footer */}
            <div className="p-6 bg-gray-50 flex flex-col sm:flex-row gap-3">
              <button 
                className="flex-1 border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:border-gray-400 transition-all duration-200"
                onClick={() => setShowPolicy(false)}
              >
                Cancel
              </button>
              <button 
                className="flex-1 bg-gradient-to-r from-[#0A0045] to-[#1a1a2e] text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200"
                onClick={() => {
                  window.localStorage.setItem("cookie-consent", "true");
                  setVisible(false);
                  setShowPolicy(false);
                }}
              >
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}


