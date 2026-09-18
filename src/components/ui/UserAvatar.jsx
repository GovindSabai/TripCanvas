import React, { useState } from 'react';
import { User } from 'lucide-react';

export function UserAvatar({ user, className = "", iconSize = 16 }) {
  const [imageError, setImageError] = useState(false);

  if (!user) {
    return (
      <div className={`bg-stone/20 rounded-full flex items-center justify-center overflow-hidden ${className}`}>
        <User size={iconSize} className="text-stone/70 fill-stone/70" />
      </div>
    );
  }

  const initial = (user.displayName || user.email || user.uid || 'U').charAt(0).toUpperCase();

  if (user.photoURL && !imageError) {
    return (
      <div className={`bg-stone/20 rounded-full flex items-center justify-center overflow-hidden ${className}`}>
        <img 
          src={user.photoURL} 
          alt="Avatar" 
          className="w-full h-full object-cover" 
          onError={() => setImageError(true)} 
        />
      </div>
    );
  }

  return (
    <div className={`bg-stone/20 rounded-full flex items-center justify-center overflow-hidden text-charcoal font-bold ${className}`}>
      <span>{initial}</span>
    </div>
  );
}
