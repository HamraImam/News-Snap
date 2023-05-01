import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/About.css';
import aboutImage from '../../assets/about_1.png';
import Footer from '../Footer/Footer';

const About = () => {
  return (
    <>
      <div className="about-container">
        <div className="about-text">
          <h1>Stay Informed with the Latest News</h1>
          <p>
            News Snap is a news summarizer app that keeps you informed with the latest news stories quickly and easily. Follow these simple steps:
          </p>
          <div className="about-steps">
            <div className="step-card">
              <li>Copy and paste any news article into our summarizer tool.</li>
            </div>
            <div className="step-card">
              <li>Get a summarized version of the article, saving you time and effort in keeping up with current events.</li>
            </div>
            <div className="step-card">
              <li>Choose between generic summaries for overall article highlights or aspect-based summaries for specific aspects.</li>
            </div>
          </div>
          <Link to="/generic-summarizer">
            <button className="get-started-btn">Get Started</button>
          </Link>
        </div>
        <div className="about-image">
          <img src={aboutImage} alt="about" />
        </div>
      </div>
    </>
  );
};

export default About;
