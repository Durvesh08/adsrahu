import React from "react";

export function PrivacyPolicy() {
  return (
    <div className="min-h-screen pt-24 pb-24 bg-black text-gray-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">Privacy Policy</h1>
        <div className="prose prose-invert max-w-none">
          <p>Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
          
          <h2>1. Introduction</h2>
          <p>Adsrahu ("we", "our", or "us") respects your privacy and is committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.</p>

          <h2>2. The Data We Collect About You</h2>
          <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:</p>
          <ul>
            <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
            <li><strong>Contact Data:</strong> includes billing address, delivery address, email address and telephone numbers.</li>
            <li><strong>Technical Data:</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location.</li>
            <li><strong>Usage Data:</strong> includes information about how you use our website, products and services.</li>
          </ul>

          <h2>3. How We Use Your Personal Data</h2>
          <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
          <ul>
            <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
            <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
            <li>Where we need to comply with a legal obligation.</li>
          </ul>

          <h2>4. Data Security</h2>
          <p>We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.</p>

          <h2>5. Contact Details</h2>
          <p>If you have any questions about this privacy policy or our privacy practices, please contact us at: contact@adsrahu.com</p>
        </div>
      </div>
    </div>
  );
}

export function Terms() {
  return (
    <div className="min-h-screen pt-24 pb-24 bg-black text-gray-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">Terms & Conditions</h1>
        <div className="prose prose-invert max-w-none">
          <p>Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
          
          <h2>1. Agreement to Terms</h2>
          <p>By accessing our website and using our services, you agree to be bound by these Terms and Conditions and agree that you are responsible for the agreement with any applicable local laws.</p>

          <h2>2. Services</h2>
          <p>Adsrahu provides digital marketing, lead generation, and automation services. The specific deliverables, timelines, and costs will be outlined in separate service agreements or proposals signed with individual clients.</p>

          <h2>3. Client Responsibilities</h2>
          <p>Clients must provide necessary access to ad accounts, CRMs, website platforms, and required assets in a timely manner for Adsrahu to perform its services. Delays in providing access or materials may result in project delays.</p>

          <h2>4. Intellectual Property</h2>
          <p>Unless otherwise stated, Adsrahu and/or its licensors own the intellectual property rights for all material on Adsrahu. All intellectual property rights are reserved. You may access this from Adsrahu for your own personal use subjected to restrictions set in these terms and conditions.</p>

          <h2>5. Limitation of Liability</h2>
          <p>In no event shall Adsrahu, nor any of its officers, directors and employees, be held liable for anything arising out of or in any way connected with your use of this Website or our services. We do not guarantee specific sales or revenue figures as marketing results vary based on numerous market factors.</p>
        </div>
      </div>
    </div>
  );
}

export function RefundPolicy() {
  return (
    <div className="min-h-screen pt-24 pb-24 bg-black text-gray-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">Refund Policy</h1>
        <div className="prose prose-invert max-w-none">
          <p>Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
          
          <h2>1. General Policy</h2>
          <p>Due to the nature of digital marketing and performance agency services, which involve significant setup time, strategic planning, and immediate labor costs, our general policy is that all sales are final.</p>

          <h2>2. Service Retainers</h2>
          <p>Monthly service retainers for ad management, lead generation, or social media management are non-refundable once the billing cycle has commenced. Clients may cancel their retainers according to the notice period specified in their individual service agreements (typically 30 days).</p>

          <h2>3. Setup Fees & One-Time Projects</h2>
          <p>Setup fees for CRM integration, funnel building, landing page creation, and automation setups are non-refundable once work has commenced. If a project is cancelled before any work has begun, a refund may be issued minus processing fees.</p>

          <h2>4. Ad Spend</h2>
          <p>Ad spend paid directly to platforms (Facebook, Google, etc.) is governed by the respective platform's terms of service and is non-refundable by Adsrahu.</p>

          <h2>5. Exceptions</h2>
          <p>Exceptions to this policy may be made on a case-by-case basis at the sole discretion of Adsrahu management, typically only in cases where services were not rendered as outlined in the signed agreement.</p>
        </div>
      </div>
    </div>
  );
}
