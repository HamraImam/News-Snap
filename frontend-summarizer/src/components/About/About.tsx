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
          News Snap is a news summarizer app that allows you to stay informed with the latest news stories quickly and easily. With just a few clicks, you can get a summarized version of news articles from various sources, saving you time and effort in keeping up with current events.
          </p>
          <p>
          Once you've selected your preferred news source, you'll see a list of the latest news articles from that source.
Click on any article you wish to read and summarize.
          </p>
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
