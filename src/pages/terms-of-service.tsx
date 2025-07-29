import React from 'react';

const Terms = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
        <p className="text-lg text-gray-600">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </section>

      {/* Introduction */}
      <section className="bg-white rounded-xl p-8 shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Agreement to Terms</h2>
        <p className="text-gray-600 mb-4">
          These Terms of Service ("Terms") govern your use of the SuccessfulStreamer website located at 
          successfulstreamer.com (the "Service") operated by SuccessfulStreamer ("us", "we", or "our").
        </p>
        <p className="text-gray-600">
          By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any 
          part of these terms, then you may not access the Service.
        </p>
      </section>

      {/* Use of Service */}
      <section className="bg-white rounded-xl p-8 shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Use of Service</h2>
        
        <h3 className="text-xl font-semibold mb-3">Permitted Use</h3>
        <p className="text-gray-600 mb-4">
          You may use our Service for lawful purposes only. You agree to use the Service in accordance with:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-6">
          <li>All applicable laws and regulations</li>
          <li>These Terms of Service</li>
          <li>Our Privacy Policy</li>
          <li>Any additional guidelines or rules we may provide</li>
        </ul>

        <h3 className="text-xl font-semibold mb-3">Prohibited Uses</h3>
        <p className="text-gray-600 mb-4">
          You may not use our Service:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-600">
          <li>For any unlawful purpose or to solicit unlawful acts</li>
          <li>To violate any international, federal, provincial, or state laws</li>
          <li>To infringe upon intellectual property rights</li>
          <li>To harass, abuse, or harm another person</li>
          <li>To transmit spam, viruses, or malicious code</li>
          <li>To collect or track personal information of others</li>
        </ul>
      </section>

      {/* Content and Intellectual Property */}
      <section className="bg-white rounded-xl p-8 shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Content and Intellectual Property</h2>
        
        <h3 className="text-xl font-semibold mb-3">Our Content</h3>
        <p className="text-gray-600 mb-4">
          The Service and its original content, features, and functionality are and will remain the exclusive 
          property of SuccessfulStreamer and its licensors. The Service is protected by copyright, trademark, 
          and other laws.
        </p>

        <h3 className="text-xl font-semibold mb-3">User Content</h3>
        <p className="text-gray-600 mb-4">
          Our Service may allow you to post, link, store, share and otherwise make available certain information, 
          text, graphics, or other material ("Content"). You are responsible for the Content you post to the Service.
        </p>
        <p className="text-gray-600">
          By posting Content to our Service, you grant us the right to use, modify, publicly perform, publicly display, 
          reproduce, and distribute such Content on and through the Service.
        </p>
      </section>

      {/* Disclaimers */}
      <section className="bg-white rounded-xl p-8 shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Disclaimers</h2>
        
        <h3 className="text-xl font-semibold mb-3">No Warranty</h3>
        <p className="text-gray-600 mb-4">
          The information on this website is provided on an "as is" basis. We make no representations or warranties 
          of any kind, express or implied, about the completeness, accuracy, reliability, or suitability of the information.
        </p>

        <h3 className="text-xl font-semibold mb-3">Educational Content</h3>
        <p className="text-gray-600 mb-4">
          The content on our website is for educational and informational purposes only. It should not be considered 
          as professional advice for your specific situation.
        </p>

        <h3 className="text-xl font-semibold mb-3">External Links</h3>
        <p className="text-gray-600">
          Our Service may contain links to third-party websites or services. We have no control over and assume no 
          responsibility for the content, privacy policies, or practices of any third-party sites or services.
        </p>
      </section>

      {/* Limitation of Liability */}
      <section className="bg-white rounded-xl p-8 shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Limitation of Liability</h2>
        <p className="text-gray-600 mb-4">
          In no event shall SuccessfulStreamer, nor its directors, employees, partners, agents, suppliers, or affiliates, 
          be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, 
          loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the Service.
        </p>
        <p className="text-gray-600">
          Some jurisdictions do not allow the exclusion of certain warranties or the limitation of liability for 
          consequential or incidental damages, so the above limitations may not apply to you.
        </p>
      </section>

      {/* Indemnification */}
      <section className="bg-white rounded-xl p-8 shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Indemnification</h2>
        <p className="text-gray-600">
          You agree to defend, indemnify, and hold harmless SuccessfulStreamer and its licensee and licensors, and their 
          employees, contractors, agents, officers and directors, from and against any and all claims, damages, obligations, 
          losses, liabilities, costs or debt, and expenses (including but not limited to attorney's fees).
        </p>
      </section>

      {/* Termination */}
      <section className="bg-white rounded-xl p-8 shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Termination</h2>
        <p className="text-gray-600 mb-4">
          We may terminate or suspend access to our Service immediately, without prior notice or liability, 
          for any reason whatsoever, including without limitation if you breach the Terms.
        </p>
        <p className="text-gray-600">
          Upon termination, your right to use the Service will cease immediately.
        </p>
      </section>

      {/* Governing Law */}
      <section className="bg-white rounded-xl p-8 shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Governing Law</h2>
        <p className="text-gray-600">
          These Terms shall be interpreted and governed by the laws of the jurisdiction in which SuccessfulStreamer 
          operates, without regard to its conflict of law provisions.
        </p>
      </section>

      {/* Changes to Terms */}
      <section className="bg-white rounded-xl p-8 shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Changes to Terms</h2>
        <p className="text-gray-600 mb-4">
          We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision 
          is material, we will try to provide at least 30 days notice prior to any new terms taking effect.
        </p>
        <p className="text-gray-600">
          By continuing to access or use our Service after those revisions become effective, you agree to be bound 
          by the revised terms.
        </p>
      </section>

      {/* Acknowledgment */}
      <section className="bg-blue-50 rounded-xl p-8 border border-blue-200">
        <h2 className="text-2xl font-bold mb-4 text-blue-900">Acknowledgment</h2>
        <p className="text-blue-800">
          By using our Service, you acknowledge that you have read these Terms of Service and agree to be bound by them.
        </p>
      </section>
    </div>
  );
};

export default Terms; 