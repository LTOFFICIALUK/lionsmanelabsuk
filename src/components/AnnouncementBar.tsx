// src/components/AnnouncementBar.tsx
import React, { useEffect, useState } from 'react';

interface AnnouncementBarProps {
  announcements?: string[]; // Made optional with ?
}

const AnnouncementBar: React.FC<AnnouncementBarProps> = ({ announcements }) => {
  // Early return if no announcements or empty array
  if (!announcements || announcements.length === 0) {
    return null;
  }

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % announcements.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [announcements.length]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % announcements.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + announcements.length) % announcements.length);
  };

  // Only show navigation buttons if there's more than one announcement
  const showNavigation = announcements.length > 1;

  return (
    <div className="bg-white text-black text-center relative mt-2">
      <p className="text-sm text-gray-500 px-12 transition-transform duration-500 transform">
        <span className="font-bold">{announcements[currentIndex]}</span>
      </p>
      <hr className="mt-2 border-t border-gray-300" />
    </div>
  );
};

export default AnnouncementBar;