import React, { useState } from 'react';
import { cn } from './Button';

export function LazyImage({ src, alt, width, height, className, eager = false, ...props }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div 
      className={cn("relative overflow-hidden bg-stone/20", className)}
      style={{ aspectRatio: width && height ? `${width}/${height}` : undefined }}
    >
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={eager ? "eager" : "lazy"}
        onLoad={() => setIsLoaded(true)}
        className={cn(
          "w-full h-full object-cover transition-opacity duration-700 ease-out",
          isLoaded ? "opacity-100" : "opacity-0"
        )}
        {...props}
      />
    </div>
  );
}
