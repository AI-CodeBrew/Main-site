import { PageHero } from "@/components/common/page-hero";


export default function TermsPage() {
  return (
    <main className="min-h-screen">
      <PageHero 
        title="Terms & Conditions"
        backgroundImage="/terms&conditions.png"
        showButtons={false}
      />
      {/* Terms & Conditions Content */}
      <section className="py-24 bg-surface">
        <div className="container-page">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <p className="text-body mb-6">
              The following Terms and Conditions govern the use of each of the websites located at, or linked to, the URLs www.fynktech.com and related services offered on the site; the information provided on the sites and the ability to register in our database, receive newsletters, and promotional emails; as well as any related links (collectively, our "Sites"). Please read the following Terms and Conditions carefully.
            </p>
            <p className="text-body mb-8">
              By using any one of our Sites, you understand and expressly agree to be legally bound by these Terms and Conditions and to follow these Terms and Conditions and all applicable laws and regulations governing our Sites. The Terms and Conditions shall supersede any subsequent terms or conditions included with any purchase order, whether or not such terms or conditions are signed by FynkTech ("FynkTech," "we" or "us").
            </p>
            <p className="text-body mb-8">
              We reserve the right to change these Terms and Conditions at any time, effective immediately upon posting on our Sites. If you violate these Terms and Conditions, we may terminate your use of the Sites, bar you from future use of the Sites, and/or take appropriate legal action against you.
            </p>

            <h2 className="text-2xl font-bold text-heading mb-6">COPYRIGHT AND TRADEMARK NOTICE</h2>
            <p className="text-body mb-6">
              The contents of all material available on our Sites are copyrighted by FynkTech unless otherwise indicated. All rights are reserved and content may not be reproduced, downloaded, disseminated, or transferred, in any form or by any means, except with the prior written agreement of FynkTech or as indicated below.
            </p>
            
            <h3 className="text-xl font-semibold text-heading mb-4">Permitted Use:</h3>
            <p className="text-body mb-6">
              Users may download pages or other content for their own personal use on a single computer, but no part of such content may be otherwise or subsequently reproduced, downloaded, disseminated, or transferred, in any form or by any means, except with the prior written agreement of, and with express attribution to, FynkTech. You agree that you are only authorized to visit, view, and to retain a copy of pages of the Sites for your own personal use, and that you shall not duplicate, download, publish, modify, or otherwise distribute the material on the Sites for any purpose other than for personal use, unless otherwise specifically authorized by us to do so.
            </p>
            <p className="text-body mb-8">
              You also agree not to deep-link to the site for any purpose, unless specifically authorized by us to do so.
            </p>

            <h2 className="text-2xl font-bold text-heading mb-6">GENERAL LEGAL NOTICE AND LIABILITY DISCLAIMER</h2>
            <p className="text-body mb-6">
              We make available our Sites and the information and services contained herein "as is." While FynkTech makes every effort to present accurate and reliable information on our Sites, FynkTech does not endorse, approve, or certify such information, nor does it guarantee the accuracy, completeness, efficacy, or timeliness of such information. Use of such information is voluntary, and reliance on it should only be undertaken after an independent review by qualified experts.
            </p>
            <p className="text-body mb-6">
              Reference herein to any specific commercial product, process, or service does not constitute or imply endorsement, recommendation, or favoring by FynkTech.
            </p>
            <p className="text-body mb-6">
              At certain places on this site, live "links" to other websites can be accessed. Such external sites contain information created, published, maintained, or otherwise posted by institutions or organizations independent of FynkTech. FynkTech does not endorse, approve, certify, or control these external sites and does not guarantee the accuracy, completeness, efficacy, or timeliness of information located at such sites. Use of any information obtained from such sites is voluntary, and reliance on it should only be undertaken after an independent review by qualified experts.
            </p>
            <p className="text-body mb-8">
              FynkTech assumes no responsibility for consequences resulting from the use of the information contained herein, or from the use of the information obtained at linked sites, or in any respect for the content of such information. FynkTech is not responsible for, and expressly disclaims all liability for, damages of any kind arising out of use, reference to, reliance on, or performance of such information.
            </p>

            <h2 className="text-2xl font-bold text-heading mb-6">SEVERABILITY</h2>
            <p className="text-body mb-8">
              The invalidity or unenforceability of any particular provision of this Policy shall not affect the remaining provisions hereof, and this Policy shall be construed in all respects as if such invalid or unenforceable provision had been omitted.
            </p>

            <h2 className="text-2xl font-bold text-heading mb-6">CONTACT INFORMATION</h2>
            <p className="text-body mb-6">
              If you have any questions about these Terms and Conditions, please contact us at:
            </p>
            <div className="bg-surface-muted p-6 rounded-lg">
              <p className="text-body"><strong>Email:</strong> team@fynktech.com</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
