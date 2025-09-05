import React, { useState } from 'react';
import { useQuery } from '@apollo/client/react';
import { useParams, useNavigate } from 'react-router-dom';
import { GET_UNIQUE_MODEL } from '../graphql/queries';
import { Model, Musician } from '../types';
import { useLanguage } from '../lib/language';
import { LoadingState, ErrorState } from '../components/LoadingStates';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { formatPrice, formatSpecifications } from '../lib/utils';

export function ModelDetailsPage() {
  const { brandId, modelId } = useParams<{ brandId: string; modelId: string }>();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'specs' | 'musicians'>('specs');
  const [musicianIndex, setMusicianIndex] = useState(0);

  const { data, loading, error } = useQuery<{ findUniqueModel: Model }>(
    GET_UNIQUE_MODEL,
    {
      variables: { brandId: brandId!, modelId: modelId! },
      skip: !brandId || !modelId
    }
  );

  // Store brandId for navigation context
  React.useEffect(() => {
    if (brandId) {
      localStorage.setItem('lastViewedBrandId', brandId);
    }
  }, [brandId]);

  const model = data?.findUniqueModel;
  const musicians = model?.musicians || [];
  const specs = model?.specs ?
    formatSpecifications(
      Object.fromEntries(
        Object.entries(model.specs as Record<string, string>).filter(([key]) => key !== '__typename')
      )
    ) : [];

  // Fallback musicians for demo purposes if API doesn't return any
  const fallbackMusicians = [
    { name: 'Jimi Hendrix', musicianImage: '', bands: ['The Jimi Hendrix Experience'] },
    { name: 'Eric Clapton', musicianImage: '', bands: ['Cream', 'Derek and the Dominos'] },
    { name: 'Jimmy Page', musicianImage: '', bands: ['Led Zeppelin'] },
    { name: 'Carlos Santana', musicianImage: '', bands: ['Santana'] }
  ];

  const displayMusicians = musicians.length > 0 ? musicians : fallbackMusicians;

  const handleShowMoreMusicians = () => {
    setMusicianIndex(prev => (prev + 2) % displayMusicians.length);
  };

  const visibleMusicians = displayMusicians.slice(musicianIndex, musicianIndex + 2);
  const totalDots = Math.ceil(displayMusicians.length / 2);

  if (!modelId) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <ErrorState message="Model not found" className="flex-1" />
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

  if (!model) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <ErrorState message="Model not found" className="flex-1" />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Custom Header */}
      <header className="relative bg-white py-8 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 z-10 relative">
              <a
                href={`/brands/${brandId}`}
                className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
              >
                Back To List
              </a>
              <span className="text-xl font-bold text-black">VibeStrings</span>
            </div>
            <div className="relative z-10">
              <img
                src={model.image}
                alt={model.name}
                className="w-32 h-32 object-contain transform rotate-12"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/images/placeholder-electric.svg';
                }}
              />
            </div>
          </div>
        </div>
        {/* Orange gradient arc background */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-orange-400/20 to-transparent rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
      </header>

      {/* Main Title */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            {model.name.split('®')[0]}
            {model.name.includes('®') && (
              <span className="block text-4xl lg:text-5xl mt-2">® {model.name.split('®')[1]}</span>
            )}
          </h1>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="py-16 bg-gray-50 flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tab Navigation */}
          <div className="flex justify-center mb-12">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab('specs')}
                className={`pb-2 text-lg font-semibold transition-all duration-300 ${
                  activeTab === 'specs'
                    ? 'text-orange-500 border-b-2 border-orange-500'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Specification
              </button>
              <button
                onClick={() => setActiveTab('musicians')}
                className={`pb-2 text-lg font-semibold transition-all duration-300 ${
                  activeTab === 'musicians'
                    ? 'text-orange-500 border-b-2 border-orange-500'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Who plays it?
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-lg p-8">
            {activeTab === 'specs' && (
              <div>
                <div className="mb-8">
                  <p className="text-gray-700 text-lg leading-relaxed mb-6">
                    {model.description || 'This exceptional guitar combines premium craftsmanship with modern playability, delivering the tone and feel that professional musicians demand.'}
                  </p>
                  <ul className="space-y-3">
                    {specs.map(({ key, value }) => (
                      <li key={key} className="flex items-center text-gray-700">
                        <span className="font-semibold w-32">{key}:</span>
                        <span>{value}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'musicians' && (
              <div>
                {displayMusicians.length === 0 ? (
                  <p className="text-gray-600 text-center py-12 text-lg">
                    No musician information available for this model.
                  </p>
                ) : (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                      {visibleMusicians.map((musician, index) => (
                        <div key={`${musician.name}-${musicianIndex + index}`} className="text-center">
                          <div className="w-48 h-48 mx-auto mb-4 rounded-lg overflow-hidden bg-gray-200 flex items-center justify-center">
                            <img
                              src={musician.musicianImage || '/images/placeholder-electric.svg'}
                              alt={musician.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                const parent = target.parentElement;
                                if (parent) {
                                  const fallback = document.createElement('div');
                                  fallback.className = 'w-full h-full flex items-center justify-center bg-gray-300 text-gray-600 text-sm';
                                  fallback.textContent = musician.name.charAt(0).toUpperCase();
                                  parent.appendChild(fallback);
                                }
                              }}
                            />
                          </div>
                          <h4 className="text-xl font-bold text-gray-900 mb-2">
                            {musician.name}
                          </h4>
                          {musician.bands && musician.bands.length > 0 && (
                            <p className="text-gray-600 text-sm">
                              {musician.bands.join(', ')}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>

                    {displayMusicians.length > 2 && (
                      <div className="flex justify-center space-x-3 mt-8">
                        {Array.from({ length: totalDots }).map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setMusicianIndex(index * 2)}
                            className={`w-4 h-4 rounded-full transition-all duration-300 hover:scale-110 ${
                              Math.floor(musicianIndex / 2) === index
                                ? 'bg-orange-500 scale-110'
                                : 'bg-gray-300 hover:bg-gray-400'
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}