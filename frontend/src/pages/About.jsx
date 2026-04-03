import React from 'react';

const About = () => {
  return (
    <div className="pt-8 pb-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">
            Our Story
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1574634534894-89d7576c8259?auto=format&fit=crop&q=80&w=1000" 
              alt="Textile Craftsmanship" 
              className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
          </div>
          
          <div className="space-y-6 text-lg text-gray-600">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Quality Textiles, Elegant Designs
            </h2>
            <p>
              Located in the heart of Mahara, Kadawatha, <strong>Win Win Fashion</strong> is more than just a clothing store. We are a destination for those who appreciate the fine art of textiles and modern fashion aesthetics.
            </p>
            <p>
              Founded with the vision to bring premium, comfortable, and trendy clothing to our community, we pride ourselves on sourcing only the highest quality materials. From breathable cottons to elegant silks and durable denims, every piece in our collection is carefully selected to ensure you not only look good but feel exceptional.
            </p>
            <p>
              Our commitment goes beyond selling clothes. We strive to provide a personalized shopping experience, ensuring every customer finds their perfect fit and true style. Thank you for choosing Win Win Fashion – where quality meets elegance.
            </p>
            
            <div className="pt-6 grid grid-cols-2 gap-6 border-t border-gray-100">
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-1">Premium</div>
                <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">Materials</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600 mb-1">100%</div>
                <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">Customer Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
