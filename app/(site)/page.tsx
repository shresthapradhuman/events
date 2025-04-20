import React from "react";
import HeroSection from "./_components/HeroSection";
import CategorySection from "./_components/CategorySection";
import TrendingEventSection from "./_components/TrendingEventsSection";
import NewsLetterSection from "./_components/NewsLetterSection";
import BannerSection from "./_components/BannerSection";

const Homepage = () => {
  return (
    <>
      <HeroSection />
      <CategorySection />
      <TrendingEventSection />
      <BannerSection />
      <NewsLetterSection />
    </>
  );
};

export default Homepage;
