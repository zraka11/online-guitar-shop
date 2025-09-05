export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(price);
};

export const formatSpecifications = (specs: Record<string, string>): Array<{key: string, value: string}> => {
  return Object.entries(specs)
    .filter(([_, value]) => value && value.trim() !== '')
    .map(([key, value]) => ({
      key: key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
      value
    }));
};

export const getGuitarTypes = (): string[] => {
  return ['ELECTRIC', 'ACOUSTIC', 'BASS', 'CLASSICAL'];
};

export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};