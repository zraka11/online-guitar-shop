import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface HeaderProps {
  className?: string;
}

export function Header({ className = '' }: HeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogoClick = () => {
    navigate('/brands');
  };

  // Check if we're on homepage - should be ultra-minimal like Screenshot 1
  const isHomepage = location.pathname === '/brands';
  const showBackButton = !isHomepage;
  const isModelDetails = location.pathname.includes('/models/');
  
  const handleBack = () => {
    if (isModelDetails) {
      // For model details, try to go back to brand models
      const brandId = localStorage.getItem('lastViewedBrandId');
      if (brandId) {
        navigate(`/brands/${brandId}`);
      } else {
        navigate('/brands');
      }
    } else {
      // For brand models page, go back to brands
      navigate('/brands');
    }
  };

  if (isHomepage) {
    // Ultra-minimal header for homepage - exactly like Screenshot 1
    return (
      <header className={`bg-white ${className}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <div 
              onClick={handleLogoClick}
              className="cursor-pointer"
            >
              <span className="text-2xl font-bold text-orange-500 hover:text-orange-600 transition-colors" style={{color: '#f97316'}}>
                VibeStrings
              </span>
            </div>
          </div>
        </div>
      </header>
    );
  }

  // Header with back button for other pages
  return (
    <header className={`bg-white shadow-sm border-b border-gray-100 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            onClick={handleLogoClick}
            className="cursor-pointer"
          >
            <span className="text-2xl font-bold text-orange-500 hover:text-orange-600 transition-colors">
              VibeStrings
            </span>
          </div>

          {/* Back Button */}
          <button
            onClick={handleBack}
            className="flex items-center px-4 py-2 text-gray-600 hover:text-orange-500 transition-colors font-medium"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {isModelDetails ? 'Back to List' : 'Back to Home'}
          </button>
        </div>
      </div>
    </header>
  );
}