import React from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import AspectBasedSummarizer from '../components/AspectSummarizer/AspectSummarizer';
import Navigation from '../components/Navigation/Navigation';

const AspectSummarizerPage = () => {
  return (
    <div>
      <Header />
      <Navigation />
      <AspectBasedSummarizer />
      <Footer />
    </div>
  );
};

export default AspectSummarizerPage;
