import React, { useState } from 'react';
import { MapPin, Phone, Mail, Navigation } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 4000);
  };

  const openGoogleMaps = () => {
    window.open("https://maps.app.goo.gl/B9U1yK8UtytC2BvJ9", "_blank"); // Redirect from shortlink https://share.google/4muD5gZOOQH0E7WUG
  };

  return (
    <div className="pt-8 pb-20 bg-gray-50 flex-grow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">
            Contact Us
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
          <p className="mt-4 text-lg text-gray-500">We'd love to hear from you. Stop by our store or drop us a message!</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded-3xl shadow-xl overflow-hidden p-8 md:p-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Get In Touch</h2>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-blue-100 p-3 rounded-full">
                <MapPin className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Visit Us</h3>
                <p className="mt-1 text-gray-600">Mahara, Kadawatha<br />Sri Lanka</p>
                <button 
                  onClick={openGoogleMaps}
                  className="mt-3 inline-flex items-center text-sm font-semibold text-white bg-gray-900 hover:bg-gray-800 px-4 py-2 rounded-lg transition-colors"
                >
                  <Navigation className="h-4 w-4 mr-2" />
                  Get Directions
                </button>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 bg-purple-100 p-3 rounded-full">
                <Phone className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Call Us</h3>
                <p className="mt-1 text-gray-600">0112 924 548</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 bg-pink-100 p-3 rounded-full">
                <Mail className="h-6 w-6 text-pink-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Email Us</h3>
                <p className="mt-1 text-gray-600">winwinfashion1234@gmail.com</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6 bg-gray-50 p-8 rounded-2xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send a Message</h2>
              
              {submitted && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded text-sm mb-4">
                  Thank you! Your message has been sent successfully.
                </div>
              )}

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea 
                  id="message" 
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white resize-none"
                  placeholder="How can we help you?"
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors shadow-md"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
