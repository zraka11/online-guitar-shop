import React from 'react';
import { useLanguage } from '../lib/language';
import { Language } from '../types';

interface FooterProps {
  className?: string;
}

export function Footer({ className = '' }: FooterProps) {
  return (
    <footer className={`bg-gray-100 py-12 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div>
            <h3 className="text-2xl font-bold text-black mb-4">
              VibeStrings
            </h3>
            <p className="text-gray-600 mb-2">
              VibeStrings brings the best guitars online.
            </p>
            <p className="text-gray-600">
              San Francisco
            </p>
          </div>

          {/* Pages */}
          <div>
            <h4 className="font-bold text-black mb-4">Pages</h4>
            <ul className="space-y-2 text-gray-600">
              <li><a href="#" className="hover:text-orange-500 transition-colors">Store</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Collections</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Support</a></li>
            </ul>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-bold text-black mb-4">Product</h4>
            <ul className="space-y-2 text-gray-600">
              <li><a href="#" className="hover:text-orange-500 transition-colors">Terms</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Copyright</a></li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h4 className="font-bold text-black mb-4">Follow us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-orange-500 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-600 hover:text-orange-500 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-600 hover:text-orange-500 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.119.112.22.085.342-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.747 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.624 0 11.99-5.367 11.99-11.99C24.007 5.367 18.641.001 12.017.001z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-300 mt-8 pt-8 text-center text-gray-500">
          <p>© 2022 Copyright VibeStrings</p>
        </div>
      </div>
    </footer>
  );
}