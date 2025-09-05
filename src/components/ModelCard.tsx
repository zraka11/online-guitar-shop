import React, { useState, useEffect } from 'react';
import { Model } from '../types';
import { formatPrice } from '../lib/utils';

interface ModelCardProps {
  model: Model;
  onClick: () => void;
  className?: string;
}

function getPlaceholderImage(type: string): string {
  switch (type.toUpperCase()) {
    case 'ELECTRIC':
      return '/images/placeholder-electric.svg';
    case 'ACOUSTIC':
    case 'CLASSICAL':
      return '/images/placeholder-acoustic.svg';
    case 'BASS':
      return '/images/placeholder-bass.svg';
    default:
      return '/images/placeholder-electric.svg';
  }
}

export function ModelCard({ model, onClick, className = '' }: ModelCardProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [imageSrc, setImageSrc] = useState<string>('');

  // Enhanced image loading with multiple fallback attempts
  useEffect(() => {
    if (!model.image) {
      setImageError(true);
      setImageLoading(false);
      return;
    }

    setImageLoading(true);
    setImageError(false);
    
    // Try loading the image
    const img = new Image();
    img.onload = () => {
      setImageSrc(model.image);
      setImageLoading(false);
    };
    img.onerror = () => {
      setImageError(true);
      setImageLoading(false);
      setImageSrc(getPlaceholderImage(model.type));
    };
    img.src = model.image;
  }, [model.image, model.type]);

  const handleImageError = () => {
    if (!imageError) {
      setImageError(true);
      setImageSrc(getPlaceholderImage(model.type));
    }
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  return (
    <div
      onClick={onClick}
      className={`cursor-pointer group ${className}`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      aria-label={`View ${model.name} guitar details`}
    >
      <div className="text-center">
        <div className="mb-4 flex justify-center">
          <img
            src={imageSrc || getPlaceholderImage(model.type)}
            alt={model.name}
            className="w-full max-w-xs h-48 object-contain group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            onError={handleImageError}
            onLoad={handleImageLoad}
          />
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">
          {model.name}
        </h3>
        <p className="text-gray-600">
          {formatPrice(model.price)}
        </p>
      </div>
    </div>
  );
}