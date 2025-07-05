"use client";
import Header from "@/components/LandingPage/Header";
import Hero from "@/components/LandingPage/Hero";
import Features from "@/components/LandingPage/Features";
import CTA from "@/components/LandingPage/CTA";
import Footer from "@/components/LandingPage/Footer";
import PricingSection from "@/components/LandingPage/Pricing";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Features />
      <CTA />
      <PricingSection />
      <Footer />
    </div>
  );
};

export default Index;
