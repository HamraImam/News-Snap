import React from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import GenericSummarizer from '../components/GenericSummarize/GenericSummarizer';
import Navigation from '../components/Navigation/Navigation';

const GenericSummarizerPage = () => {
  return (
    <div>
      
      <Header />
      <Navigation />
      <GenericSummarizer />
      <Footer />
          
    </div>
  );
};

export default GenericSummarizerPage;
