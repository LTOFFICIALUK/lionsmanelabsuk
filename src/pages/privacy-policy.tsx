import React from 'react';

const Privacy = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-lg text-gray-600">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </section>

      {/* Introduction */}
      <section className="bg-white rounded-xl p-8 shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Introduction</h2>
        <p className="text-gray-600 mb-4">
          At SuccessfulStreamer ("we", "our", or "us"), we are committed to protecting your privacy and personal information. 
          This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website 
          successfulstreamer.com.
        </p>
        <p className="text-gray-600">
          Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy, 
          please do not access the site.
        </p>
      </section>

      {/* Information We Collect */}
      <section className="bg-white rounded-xl p-8 shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
        
        <h3 className="text-xl font-semibold mb-3">Personal Information</h3>
        <p className="text-gray-600 mb-4">
          We may collect personal information that you voluntarily provide to us when you:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-6">
          <li>Subscribe to our newsletter</li>
          <li>Contact us through our contact forms</li>
          <li>Participate in surveys or feedback</li>
          <li>Interact with our social media accounts</li>
        </ul>

        <h3 className="text-xl font-semibold mb-3">Automatic Information</h3>
        <p className="text-gray-600 mb-4">
          We may automatically collect certain information when you visit our website, including:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-600">
          <li>IP address and browser type</li>
          <li>Pages visited and time spent on our site</li>
          <li>Referring website addresses</li>
          <li>Device information and operating system</li>
        </ul>
      </section>

      {/* How We Use Information */}
      <section className="bg-white rounded-xl p-8 shadow-lg">
        <h2 className="text-2xl font-bold mb-4">How We Use Your Information</h2>
        <p className="text-gray-600 mb-4">
          We use the information we collect to:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-600">
          <li>Provide, operate, and maintain our website</li>
          <li>Improve, personalize, and expand our website</li>
          <li>Understand and analyze how you use our website</li>
          <li>Develop new products, services, features, and functionality</li>
          <li>Communicate with you for customer service and support</li>
          <li>Send you newsletters and marketing communications (with your consent)</li>
          <li>Detect and prevent fraud and abuse</li>
        </ul>
      </section>

      {/* Cookies and Tracking */}
      <section className="bg-white rounded-xl p-8 shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Cookies and Tracking Technologies</h2>
        <p className="text-gray-600 mb-4">
          We use cookies and similar tracking technologies to track activity on our website and hold certain information. 
          You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
        </p>
        <p className="text-gray-600">
          We use Google Analytics to analyze website traffic and user behavior. This service may use cookies 
          to collect information about your use of our website.
        </p>
      </section>

      {/* Information Sharing */}
      <section className="bg-white rounded-xl p-8 shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Information Sharing and Disclosure</h2>
        <p className="text-gray-600 mb-4">
          We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, 
          except in the following circumstances:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-600">
          <li>To comply with legal obligations</li>
          <li>To protect and defend our rights or property</li>
          <li>To prevent or investigate possible wrongdoing</li>
          <li>To protect the personal safety of users or the public</li>
          <li>With trusted service providers who assist us in operating our website</li>
        </ul>
      </section>

      {/* Data Security */}
      <section className="bg-white rounded-xl p-8 shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Data Security</h2>
        <p className="text-gray-600">
          We implement appropriate technical and organizational security measures to protect your personal information 
          against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over 
          the internet or electronic storage is 100% secure.
        </p>
      </section>

      {/* Your Rights */}
      <section className="bg-white rounded-xl p-8 shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Your Rights</h2>
        <p className="text-gray-600 mb-4">
          Depending on your location, you may have certain rights regarding your personal information:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-600">
          <li>The right to access your personal information</li>
          <li>The right to correct inaccurate information</li>
          <li>The right to delete your personal information</li>
          <li>The right to object to processing</li>
          <li>The right to data portability</li>
        </ul>
      </section>

      {/* Updates */}
      <section className="bg-blue-50 rounded-xl p-8 border border-blue-200">
        <h2 className="text-2xl font-bold mb-4 text-blue-900">Policy Updates</h2>
        <p className="text-blue-800">
          We may update this Privacy Policy from time to time. We will notify you of any changes by posting 
          the new Privacy Policy on this page and updating the "Last updated" date at the top of this policy.
        </p>
      </section>
    </div>
  );
};

export default Privacy; 