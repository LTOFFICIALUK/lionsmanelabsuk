import React from 'react';
import { Link } from 'react-router-dom';
import { 
  HiHeart, 
  HiShieldCheck, 
  HiStar, 
  HiGlobe, 
  HiSparkles, 
  HiChatAlt, 
  HiTruck, 
  HiAcademicCap, 
  HiLightBulb,
  HiCheckCircle,
  HiClock,
  HiCollection
} from 'react-icons/hi';

const About = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-12 lg:py-12 md:py-8 sm:py-6 mb:py-4">
      {/* Mission Section */}
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-6">About Blue Dream Tea UK</h1>
        <p className="text-xl text-gray-600">
          Your trusted source for premium blue lotus flower products, bringing the ancient wisdom 
          of this sacred flower to modern wellness enthusiasts across the UK.
        </p>
      </section>

      {/* Our Mission */}
      <section className="bg-white rounded-xl p-8 shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
        <p className="text-gray-600 mb-4">
          At Blue Dream Tea UK, we're passionate about sharing the natural benefits of blue lotus flower 
          with our community. We believe in the power of traditional botanicals to enhance modern life, 
          providing moments of tranquility, relaxation, and mindful connection in our busy world.
        </p>
        <p className="text-gray-600">
          We source only the finest blue lotus flowers and create products that honor both the ancient 
          traditions surrounding this sacred plant and the modern standards of quality and purity that 
          our customers deserve.
        </p>
      </section>

      {/* Our Approach */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Our Approach</h2>
          <ul className="space-y-4 text-gray-600">
            <li className="flex items-start">
              <HiCollection className="text-blue-500 mr-3 mt-1 flex-shrink-0" size={20} />
              Premium sourcing from trusted growers
            </li>
            <li className="flex items-start">
              <HiShieldCheck className="text-blue-500 mr-3 mt-1 flex-shrink-0" size={20} />
              Rigorous quality testing and standards
            </li>
            <li className="flex items-start">
              <HiSparkles className="text-blue-500 mr-3 mt-1 flex-shrink-0" size={20} />
              Artisanal preparation methods
            </li>
            <li className="flex items-start">
              <HiAcademicCap className="text-blue-500 mr-3 mt-1 flex-shrink-0" size={20} />
              Educational approach to botanical wellness
            </li>
            <li className="flex items-start">
              <HiHeart className="text-blue-500 mr-3 mt-1 flex-shrink-0" size={20} />
              Customer-focused service and support
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-4">What We Offer</h2>
          <ul className="space-y-4 text-gray-600">
            <li className="flex items-start">
              <HiChatAlt className="text-blue-500 mr-3 mt-1 flex-shrink-0" size={20} />
              Premium blue lotus flower tea cuts
            </li>
            <li className="flex items-start">
              <HiSparkles className="text-blue-500 mr-3 mt-1 flex-shrink-0" size={20} />
              Convenient ready-to-brew tea bags
            </li>
            <li className="flex items-start">
              <HiCollection className="text-blue-500 mr-3 mt-1 flex-shrink-0" size={20} />
              Artisanal smoking blends and pre-rolls
            </li>
            <li className="flex items-start">
              <HiGlobe className="text-blue-500 mr-3 mt-1 flex-shrink-0" size={20} />
              Whole flower packs for versatile use
            </li>
            <li className="flex items-start">
              <HiLightBulb className="text-blue-500 mr-3 mt-1 flex-shrink-0" size={20} />
              Expert guidance and brewing tips
            </li>
          </ul>
        </div>
      </section>

      {/* Quality Commitment */}
      <section className="bg-blue-50 rounded-xl p-8 border border-blue-200">
        <h2 className="text-2xl font-bold mb-4 text-blue-900">Our Quality Commitment</h2>
        <div className="space-y-4 text-blue-800">
          <p>
            <strong>Sourcing Excellence:</strong> We partner directly with trusted growers who share 
            our commitment to sustainable and ethical harvesting practices. Every batch of blue lotus 
            flowers is carefully selected for potency, purity, and exceptional quality.
          </p>
          <p>
            <strong>Testing & Verification:</strong> All our products undergo thorough quality testing 
            to ensure they meet our strict standards for purity, potency, and safety. We believe 
            transparency is essential, and we're always happy to discuss our quality processes.
          </p>
          <p>
            <strong>Freshness Guarantee:</strong> We process and package our products in small batches 
            to ensure maximum freshness and potency. Your blue lotus experience should be nothing 
            short of exceptional, every time.
          </p>
        </div>
      </section>

      {/* Why Blue Lotus */}
      <section className="bg-white rounded-xl p-8 shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Why Blue Lotus?</h2>
        <p className="text-gray-600 mb-4">
          Blue lotus (Nymphaea caerulea) has been revered for thousands of years, particularly in 
          ancient Egyptian culture where it was considered sacred and used in spiritual and 
          ceremonial practices. This beautiful aquatic flower is known for its gentle, relaxing 
          properties and its ability to promote a sense of calm and well-being.
        </p>
        <p className="text-gray-600 mb-4">
          Unlike many modern wellness products, blue lotus offers a natural, gentle experience 
          that complements rather than overwhelms. Whether enjoyed as a soothing evening tea or 
          as part of a mindful smoking blend, blue lotus provides a moment of tranquility in 
          our hectic modern world.
        </p>
        <p className="text-gray-600">
          We're passionate about bringing this ancient botanical wisdom to modern wellness 
          enthusiasts, helping people discover the gentle benefits of blue lotus in their 
          daily routines.
        </p>
      </section>

      {/* Our Promise */}
      <section className="bg-white rounded-xl p-8 shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Our Promise to You</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="flex justify-center mb-3">
              <HiShieldCheck className="text-blue-500" size={32} />
            </div>
            <h3 className="text-lg font-semibold mb-2">Premium Quality</h3>
            <p className="text-gray-600 text-sm">
              Only the finest blue lotus flowers make it into our products, ensuring consistent quality and potency.
            </p>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-3">
              <HiTruck className="text-blue-500" size={32} />
            </div>
            <h3 className="text-lg font-semibold mb-2">Fast, Discreet Delivery</h3>
            <p className="text-gray-600 text-sm">
              Quick, secure shipping across the UK with discreet packaging to protect your privacy.
            </p>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-3">
              <HiChatAlt className="text-blue-500" size={32} />
            </div>
            <h3 className="text-lg font-semibold mb-2">Expert Support</h3>
            <p className="text-gray-600 text-sm">
              Our knowledgeable team is here to help with product selection, brewing tips, and any questions.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center bg-gradient-to-r from-blue-500 to-blue-600 
        text-white rounded-xl p-8">
        <h2 className="text-2xl font-bold mb-4">Ready to Experience Blue Lotus?</h2>
        <p className="text-lg mb-6">
          Discover our premium collection of blue lotus products and bring ancient wisdom 
          into your modern wellness routine.
        </p>
        <Link
          to="/products"
          className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg
            hover:bg-gray-100 transition-colors font-semibold"
          aria-label="Browse our premium blue lotus products"
        >
          Shop Our Products
        </Link>
      </section>
    </div>
  );
};

export default About; 