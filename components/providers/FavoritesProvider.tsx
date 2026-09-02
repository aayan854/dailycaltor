"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface FavoritesContextType {
  favorites: string[];
  toggleFavorite: (toolId: string) => void;
  isFavorite: (toolId: string) => boolean;
  recentTools: string[];
  addRecentTool: (toolId: string) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [recentTools, setRecentTools] = useState<string[]>([]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('dailycaltor_favorites');
    const savedRecents = localStorage.getItem('dailycaltor_recents');
    
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (savedRecents) setRecentTools(JSON.parse(savedRecents));
  }, []);

  const toggleFavorite = (toolId: string) => {
    setFavorites(prev => {
      const newFavs = prev.includes(toolId) 
        ? prev.filter(id => id !== toolId)
        : [...prev, toolId];
      
      localStorage.setItem('dailycaltor_favorites', JSON.stringify(newFavs));
      return newFavs;
    });
  };

  const isFavorite = (toolId: string) => favorites.includes(toolId);

  const addRecentTool = (toolId: string) => {
    setRecentTools(prev => {
      // Remove if exists to push it to the top
      const filtered = prev.filter(id => id !== toolId);
      const newRecents = [toolId, ...filtered].slice(0, 5); // Keep last 5
      
      localStorage.setItem('dailycaltor_recents', JSON.stringify(newRecents));
      return newRecents;
    });
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite, recentTools, addRecentTool }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
