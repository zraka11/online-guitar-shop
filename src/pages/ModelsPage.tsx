import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { useQuery } from '@apollo/client/react';
import { useNavigate, useParams } from 'react-router-dom';
import { GET_BRAND_MODELS, GET_UNIQUE_BRAND } from '../graphql/queries';
import { Brand, Model, SortBy } from '../types';
import { useLanguage } from '../lib/language';
import { ModelCard } from '../components/ModelCard';
import { LoadingState, ErrorState } from '../components/LoadingStates';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { debounce, getGuitarTypes } from '../lib/utils';

export function ModelsPage() {
  const navigate = useNavigate();
  const { brandId } = useParams<{ brandId: string }>();
  const { t } = useLanguage();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('');
  const [sortBy, setSortBy] = useState<SortBy>({ field: 'name', order: 'ASC' });
  const [displayedModels, setDisplayedModels] = useState<Model[]>([]);
  const [itemsToShow, setItemsToShow] = useState(6);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  
  // Ref for infinite scroll
  const loadingTriggerRef = useRef<HTMLDivElement>(null);

  // Get brand info
  const { data: brandData } = useQuery<{ findUniqueBrand: Brand }>(
    GET_UNIQUE_BRAND,
    { variables: { id: brandId! } }
  );

  // Get models
  const { data: modelsData, loading, error } = useQuery<{ findBrandModels: Model[] }>(
    GET_BRAND_MODELS,
    { 
      variables: { id: brandId!, sortBy },
      skip: !brandId
    }
  );

  // Filter and search logic
  const filteredModels = useMemo(() => {
    if (!modelsData?.findBrandModels) return [];
    
    let filtered = modelsData.findBrandModels;
    
    // Apply type filter
    if (filterType && filterType !== 'ALL') {
      filtered = filtered.filter(model => model.type === filterType);
    }
    
    // Apply search filter
    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(model => 
        model.name.toLowerCase().includes(search) ||
        model.type.toLowerCase().includes(search)
      );
    }
    
    return filtered;
  }, [modelsData, filterType, searchTerm]);

  // Update displayed models when filters change
  useEffect(() => {
    setDisplayedModels(filteredModels.slice(0, itemsToShow));
  }, [filteredModels, itemsToShow]);

  // Infinite scroll implementation
  useEffect(() => {
    const currentTrigger = loadingTriggerRef.current;
    if (!currentTrigger || displayedModels.length >= filteredModels.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !isLoadingMore && displayedModels.length < filteredModels.length) {
          setIsLoadingMore(true);

          // Load more items immediately for better UX
          setTimeout(() => {
            setItemsToShow(prev => Math.min(prev + 6, filteredModels.length));
            setIsLoadingMore(false);
          }, 300);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    );

    observer.observe(currentTrigger);

    return () => {
      if (currentTrigger) {
        observer.unobserve(currentTrigger);
      }
    };
  }, [displayedModels.length, filteredModels.length, isLoadingMore]);

  // Store brandId in localStorage for navigation context
  useEffect(() => {
    if (brandId) {
      localStorage.setItem('lastViewedBrandId', brandId);
    }
  }, [brandId]);

  // Reset items to show when filters change
  useEffect(() => {
    setItemsToShow(6);
  }, [searchTerm, filterType, sortBy]);

  const debouncedSetSearchTerm = useCallback(
    debounce((term: string) => setSearchTerm(term), 300),
    []
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSetSearchTerm(e.target.value);
  };

  const handleLoadMore = () => {
    setItemsToShow(prev => prev + 6);
  };

  const handleModelClick = (modelId: string) => {
    navigate(`/brands/${brandId}/models/${modelId}`);
  };

  const guitarTypes = getGuitarTypes();

  if (!brandId) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <ErrorState message="Brand not found" className="flex-1" />
        <Footer />
      </div>
    );
  }

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
        <ErrorState message={t('common.error')} className="flex-1" />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Custom Header */}
      <header className="bg-white border-b border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <a
                href="/"
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Home
              </a>
              <span className="text-xl font-bold text-black">VibeStrings</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Play like a <span className="text-orange-500">Rock star</span>
              </h1>
              <p className="text-xl text-gray-600">
                Discover exceptional {brandData?.findUniqueBrand.name} guitars crafted for musicians who demand the best.
              </p>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="w-80 h-80 bg-orange-500/10 rounded-full flex items-center justify-center">
                  <img
                    src={brandData?.findUniqueBrand.image}
                    alt={`${brandData?.findUniqueBrand.name} logo`}
                    className="w-32 h-32 object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Models Section */}
      <section className="py-16 flex-1 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Check out the <span className="text-orange-500">Selection</span>
          </h2>

          {/* Filters Row */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12 max-w-2xl mx-auto">
            <div className="flex-1">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="">Filter by type</option>
                {guitarTypes.map(type => (
                  <option key={type} value={type}>
                    {type.charAt(0) + type.slice(1).toLowerCase()}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search by name"
                onChange={handleSearchChange}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Guitar Grid */}
          {filteredModels.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-600 text-lg">No models found matching your criteria.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {displayedModels.map((model) => (
                  <ModelCard
                    key={model.id}
                    model={model}
                    onClick={() => handleModelClick(model.id)}
                  />
                ))}
              </div>

              {/* Pagination */}
              <div className="flex flex-col items-center space-y-4">
                <div className="text-gray-600 text-sm">
                  Showing {displayedModels.length} results from {filteredModels.length}
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setItemsToShow(prev => Math.max(prev - 6, 6))}
                    disabled={itemsToShow <= 6}
                    className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  <span className="px-4 py-2 bg-orange-500 text-white rounded-lg font-medium">
                    {Math.ceil(displayedModels.length / 6)}
                  </span>

                  <button
                    onClick={() => setItemsToShow(prev => Math.min(prev + 6, filteredModels.length))}
                    disabled={displayedModels.length >= filteredModels.length}
                    className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}