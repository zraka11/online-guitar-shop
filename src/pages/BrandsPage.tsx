import React, { useState, useEffect, useRef } from 'react';
import { useQuery } from '@apollo/client/react';
import { useNavigate } from 'react-router-dom';
import { GET_ALL_BRANDS } from '../graphql/queries';
import { Brand } from '../types';
import { useLanguage } from '../lib/language';
import { BrandCard } from '../components/BrandCard';
import { LoadingState, ErrorState } from '../components/LoadingStates';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';

export function BrandsPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { data, loading, error } = useQuery<{ findAllBrands: Brand[] }>(GET_ALL_BRANDS);

  const [displayedBrands, setDisplayedBrands] = useState<Brand[]>([]);
  const [itemsToShow, setItemsToShow] = useState(8);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Ref for infinite scroll
  const loadingTriggerRef = useRef<HTMLDivElement>(null);

  const handleBrandClick = (brandId: string) => {
    navigate(`/brands/${brandId}`);
  };

  // Update displayed brands when data changes
  useEffect(() => {
    if (data?.findAllBrands) {
      setDisplayedBrands(data.findAllBrands.slice(0, itemsToShow));
    }
  }, [data, itemsToShow]);

  // Infinite scroll implementation
  useEffect(() => {
    const currentTrigger = loadingTriggerRef.current;
    if (!currentTrigger || !data?.findAllBrands) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !isLoadingMore && displayedBrands.length < data.findAllBrands.length) {
          setIsLoadingMore(true);

          // Simulate loading delay for better UX
          setTimeout(() => {
            setItemsToShow(prev => prev + 8);
            setIsLoadingMore(false);
          }, 500);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '100px',
      }
    );

    observer.observe(currentTrigger);

    return () => {
      if (currentTrigger) {
        observer.unobserve(currentTrigger);
      }
    };
  }, [displayedBrands.length, data?.findAllBrands?.length, isLoadingMore]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <LoadingState message={t('common.loading')} className="flex-1" />
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <ErrorState 
          message={t('common.error')} 
          className="flex-1"
        />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section - Browse top quality Guitars online */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                Browse top quality <span className="text-orange-500">Guitars</span> online
              </h1>
              <p className="text-xl text-gray-600">
                {t('mid.subtitle')}
              </p>
            </div>
            <div className="flex justify-center lg:justify-end">
              <img
                src="/imgs/professional_fender_guitar_amplifier_hero_shot.jpg"
                alt="Professional Guitar and Amplifier"
                className="w-full max-w-lg h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-16 flex-1 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Featuring the <span className="text-orange-500">Best Brands</span>
            </h2>
            <p className="text-gray-600">
              {t('brands.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
            {displayedBrands.map((brand) => (
              <BrandCard
                key={brand.id}
                brand={brand}
                onClick={() => handleBrandClick(brand.id)}
              />
            ))}
          </div>

          {/* Infinite Scroll Trigger */}
          {data?.findAllBrands && displayedBrands.length < data.findAllBrands.length && (
            <div
              ref={loadingTriggerRef}
              className="flex justify-center items-center py-8"
            >
              {isLoadingMore ? (
                <div className="flex items-center space-x-2 text-orange-500">
                  <div className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-lg font-medium">Loading more brands...</span>
                </div>
              ) : (
                <div className="text-gray-400 text-sm">
                  Scroll down for more brands
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Hero Section */}
      <section className="bg-black py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-12">
            Why try <span className="text-orange-500">VibeStrings</span>?
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {t('features.browsing.title')}
              </h3>
              <p className="text-gray-300">
                {t('features.browsing.description')}
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {t('features.delivery.title')}
              </h3>
              <p className="text-gray-300">
                {t('features.delivery.description')}
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {t('features.payments.title')}
              </h3>
              <p className="text-gray-300">
                {t('features.payments.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* App Promotion Section */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text and Buttons */}
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Browse and buy your <span className="text-orange-500">favorite guitars</span> with VibeStrings
              </h2>

              {/* Download Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <a href="#" className="inline-block">
                  <img
                    src="https://developer.apple.com/app-store/marketing/guidelines/images/badge-download-on-the-app-store.svg"
                    alt="Download on the App Store"
                    className="h-12 w-auto"
                  />
                </a>
                <a href="#" className="inline-block">
                  <img
                    src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                    alt="Get it on Google Play"
                    className="h-12 w-auto"
                  />
                </a>
              </div>
            </div>

            {/* Right Column - Phone Mockups */}
            <div className="relative flex justify-center lg:justify-end">
              {/* Orange circular background */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-80 h-80 bg-orange-500/10 rounded-full"></div>
              </div>

              {/* Phone Mockups */}
              <div className="relative flex items-center space-x-4">
                <div className="transform hover:scale-105 transition-transform duration-300 z-10">
                  <img
                    src="/images/mobile-mockup-guitars.svg"
                    alt="VibeStrings Mobile App - Guitar Collection"
                    className="w-40 lg:w-48 h-auto drop-shadow-2xl"
                  />
                </div>

                <div className="transform hover:scale-105 transition-transform duration-300 z-20 -ml-8">
                  <img
                    src="/images/mobile-mockup-details.svg"
                    alt="VibeStrings Mobile App - Guitar Details"
                    className="w-40 lg:w-48 h-auto drop-shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
