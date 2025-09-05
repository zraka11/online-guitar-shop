import React from 'react';
import { Brand } from '../types';

interface BrandCardProps {
  brand: Brand;
  onClick: () => void;
  className?: string;
}

// Brand name styling function for consistent text display
function getBrandDisplayName(brandName: string): string {
  return brandName.toUpperCase();
}

export function BrandCard({ brand, onClick, className = '' }: BrandCardProps) {

  return (
    <div
      onClick={onClick}
      className={`flex items-center justify-center p-6 cursor-pointer hover:scale-105 hover:shadow-lg transition-all duration-300 ${className}`}
    >
      <img
        src={brand.image}
        alt={`${brand.name} logo`}
        className="w-24 h-24 object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
      />
    </div>
  );
}