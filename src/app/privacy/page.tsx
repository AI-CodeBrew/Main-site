import type { Metadata } from "next";
import { PageHero } from "@/components/common/page-hero";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Privacy Policy",
  description:
    "How Fynk Tech collects and uses personal data on fynktech.com. Read our privacy policy, then contact us with questions.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <main className="min-h-screen">
      <PageHero 
        title="Privacy Policy"
        backgroundImage="/privacy-policy.jpg"
        showButtons={false}
      />
      {/* Privacy Policy Content */}
      <section className="py-24 bg-surface">
        <div className="container-page">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <p className="text-body mb-6">
              The website ("Site") for FynkTech LLC ("FynkTech", "We", "Our", "Us" or "Company") was created to provide AI automation and e-commerce development services (the "Services"). The privacy of our Site visitors ("you," "your," or "user") is important to us, and in order to protect your personal information, we have implemented the following Privacy Policy with provisions that apply to the collection of data by FynkTech, its subsidiaries, and its affiliates.
            </p>
            <p className="text-body mb-8">
              Our Privacy Policy discloses the type and nature of information we collect and how we use it, as well as the choices you can make about the way your information is collected and used. We also explain how any requests for personal or personally identifiable information will be used. By exploring and using FynkTech's Site and/or Services, and by submitting information to FynkTech, you signify acceptance to the terms of our Privacy Policy.
            </p>
            <p className="text-body mb-8">
              If you have questions or concerns regarding this statement, you should first contact us at team@fynktech.com.
            </p>

            <h2 className="text-2xl font-bold text-heading mb-6">Updates and Changes to the Privacy Policy</h2>
            <p className="text-body mb-6">
              In the event of a change in this policy, a revised Privacy Policy will be posted to our Website, and the "Updated" date will be changed. If the revised Privacy Policy contains a material change to how we collect or use personal information, notice of the change will be emailed to you or posted on the Website's home page.
            </p>
            <p className="text-body mb-8">
              Please revisit this page to familiarize yourself with changes to the Privacy Policy. You agree to accept posting of a revised Privacy Policy as described herein as actual notice to you of such revised Privacy Policy. Your continued use of the Services after such posting constitutes the collection and use of your information as described in the then-current Privacy Policy.
            </p>

            <h2 className="text-2xl font-bold text-heading mb-6">Information We Collect</h2>
            <p className="text-body mb-6">
              We are required by law, regulation or business reasons to ask for certain personal information in order to provide our Services to you. FynkTech makes commercially reasonable best efforts to maintain the confidentiality, integrity and security of our clients' personal information.
            </p>
            <p className="text-body mb-6">
              You may choose to provide additional information during subsequent visits to the Site, but keep in mind that some of this information will be required if you wish to partake in the Services.
            </p>
            <p className="text-body mb-6">
              When visiting our website, we also store every instance of access in a log file and therefore, the following Data are stored in this process:
            </p>
            <ul className="list-disc pl-6 mb-6 text-body">
              <li>Computer or mobile device information</li>
              <li>Website from which our domain is accessed and website usage information</li>
              <li>Operating system of your computer</li>
              <li>Country from which our website is accessed</li>
              <li>Name of your internet provider</li>
              <li>Name and URL of the Data accessed</li>
              <li>Date and time of access</li>
              <li>IP address of the accessing computer</li>
            </ul>
            <p className="text-body mb-8">
              Keeping client information secure, and using it only as our Users want us to, are matters of principle for all of us at FynkTech. With this in mind, here is our commitment to each and every User:
            </p>
            <ul className="list-disc pl-6 mb-8 text-body">
              <li>Except as you may otherwise expressly approve, we will limit the collection and use of client and user information to what we believe would be useful to service your accounts, administer our business, or to tell you about our Services;</li>
              <li>We will restrict employee access to client and user information to those who need to know in order to provide Services to you;</li>
              <li>We will educate our employees according to our internal policies to reinforce the importance of confidentiality and client and user privacy;</li>
              <li>We will maintain commercially reasonable and customary security standards and procedures to protect information about you; and</li>
              <li>We will respond quickly to your request to correct inaccurate information.</li>
            </ul>

            <h2 className="text-2xl font-bold text-heading mb-6">How and Why We Gather Information</h2>
            <p className="text-body mb-6">
              When you register for an account for the Services or at any later time, we collect certain personal information from you to open an account, transact business, communicate with you, verify your identity and fulfill legal and regulatory requirements. We call this your "Profile." From time to time, we may request additional information (e.g., through surveys) to help us further assess your needs and preferences.
            </p>
            <p className="text-body mb-6">
              If you choose to provide such information, during registration or otherwise, you are giving FynkTech the permission to use and store it consistent with this Privacy Policy. We may also obtain your personal information from your transactions with us or other Users through the Services, or from third parties such as credit reporting agencies. If we combine or associate information from other sources with personal information that you provide directly to us through or in connection with the Services, we will treat the combined information as personal information in accordance with this Privacy Policy.
            </p>

            <h2 className="text-2xl font-bold text-heading mb-6">Cookies</h2>
            <p className="text-body mb-6">
              When you visit the Website, whether or not you register for an account, we may send one or more cookies. "Cookies" are small text files containing a string of alphanumeric characters that may be placed on your web browser. Cookies make it easier for you to navigate our Website by, among other things, "remembering" your identity so that you do not have to input your password multiple times as you navigate between web pages on the Website and/or as you access the Services.
            </p>
            <p className="text-body mb-6">
              This use of cookies for authentication (i.e., verifying that you are who you say you are) is an essential component of site security. You can set your web browser to inform you when cookies are set or to prevent cookies from being set.
            </p>
            <p className="text-body mb-8">
              Please note that if you decline to use cookies, you may experience reduced functionality or slower site response times. Declining to use our authentication-related cookies may prevent you from using the Website altogether.
            </p>

            <h2 className="text-2xl font-bold text-heading mb-6">Social Media Services</h2>
            <p className="text-body mb-6">
              You can log in to the Website using social media services such as Google. These services will authenticate your identity and provide you the option to share certain personal information with us such as your name and email address to pre-populate our sign up form.
            </p>
            <p className="text-body mb-8">
              Our Website may also include social sharing features for common social networks. These features are interactive mini-programs and may collect your IP address and the page you are visiting on our site. They may set a cookie to enable the feature to function properly. Social media features and widgets are either hosted by a third party or hosted directly on our website. Your interactions with these features are governed by the privacy policy of the company providing them.
            </p>

            <h2 className="text-2xl font-bold text-heading mb-6">Notifications and Communications</h2>
            <p className="text-body mb-6">
              FynkTech will send you email notifications from time to time. Some notifications are required elements of your transactions on our platform, such as confirmations of particular actions you have taken. These mandatory notices are sent typically to notify you of a change in status. For example, you will receive a notice when your account is confirmed.
            </p>
            <p className="text-body mb-6">
              We also send out notices that are required for legal or security purposes. For example, certain notifications are sent for your own protection to ensure that another person cannot make a change to your account without your knowledge. In other cases, these notifications involve changes to various legal agreements or Site policies. Generally, you may not opt out of such service-related emails.
            </p>
            <p className="text-body mb-8">
              We may also send you responses to emails you send us, if appropriate. From time to time, we will also send user surveys, requests for user feedback regarding user experience and Site operations, or marketing offers from us or from us on behalf of our marketing partners. Completing these surveys, answering requests for feedback, or accepting any offer is strictly voluntary.
            </p>

            <h2 className="text-2xl font-bold text-heading mb-6">Opt-out Policy</h2>
            <p className="text-body mb-6">
              We may at times send you email communications with marketing or promotional materials. If you prefer not to receive such marketing or promotional emails from us, you may unsubscribe at any time. Please note that opt-out requests may take up to twenty-four (24) hours to process.
            </p>
            <p className="text-body mb-8">
              Please also note that at times we may need to send you email communications that are transactional in nature, such as service or termination announcements or payment confirmations. You will not be able to opt-out of these communications.
            </p>

            <h2 className="text-2xl font-bold text-heading mb-6">Information Security</h2>
            <p className="text-body mb-6">
              We use commercially reasonable security technologies and procedures to help protect your personal information from unauthorized access, use or disclosure. However, we cannot guarantee the complete safety of your information. It is your responsibility to keep your information confidential.
            </p>

            <h2 className="text-2xl font-bold text-heading mb-6">Security Notifications</h2>
            <p className="text-body mb-6">
              If we learn of a security systems breach, then we may attempt to notify you electronically so that you can take appropriate protective steps. We may also post a notice on or through the Site in the event of a security breach. Depending on where you live, you may have a legal right to receive notice of a security breach in writing.
            </p>

            <h2 className="text-2xl font-bold text-heading mb-6">Where You Can View and Correct Your Information</h2>
            <p className="text-body mb-8">
              We urge you to review your information regularly to ensure that it is correct and complete. If you believe that any of your information is incorrect, or if you have any questions regarding this Privacy Policy, please contact us at team@fynktech.com.
            </p>

            <h2 className="text-2xl font-bold text-heading mb-6">Links to Other Sites</h2>
            <p className="text-body mb-8">
              If you follow any links that direct you away from the Site, this privacy policy will not apply to your activity on the other websites you visit. We do not control the privacy policies or the privacy practices of any third parties.
            </p>

            <h2 className="text-2xl font-bold text-heading mb-6">International Visitors</h2>
            <p className="text-body mb-6">
              The Services may be accessed and/or used by Users located outside Saudi Arabia in accordance with our Terms of Use and other policies and procedures posted on the Website. If you choose to use the Services from the European Union (EU), the United States, or other regions of the world with laws governing data collection and use that may differ from Saudi Arabian law, then please note that you are transferring your personal information outside of those regions to Saudi Arabia. By providing your personal information on or through the Services, you consent to that transfer.
            </p>

            <h2 className="text-2xl font-bold text-heading mb-6">Children's Privacy Policy</h2>
            <p className="text-body mb-6">
              The FynkTech website is not intended for use by children, especially those under eighteen (18) years of age. No one under eighteen (18) years of age is allowed to use the website, provide any personal information or receive our email distributions. We do not knowingly solicit or collect Personally Identifiable Information from children under eighteen years of age. If you believe that a minor has disclosed Personally Identifiable Information to FynkTech, please report this to us at: team@fynktech.com.
            </p>

            <h2 className="text-2xl font-bold text-heading mb-6">Contact Information</h2>
            <p className="text-body mb-6">
              Please contact FynkTech with any questions or comments about this Privacy Policy, your personal information, or your choices with regards to our collection and use of your personal information, email at team@fynktech.com.
            </p>
            <p className="text-body mb-6">
              If you believe that we have infringed your rights, we encourage you to contact us first so that we can try to resolve the issue informally.
            </p>
            <p className="text-body mb-8">
              For citizens of the European Union and United States, please contact team@fynktech.com for requests and inquiries regarding the data retained and managed by this portal and your rights to be forgotten related to the General Data Protection Regulation (GDPR).
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
