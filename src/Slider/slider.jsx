
import React, { useEffect, useState } from 'react';
import '../Slider/slider.css';
import eventData from'../event';

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const newIndex = prevIndex +1;
        return newIndex >= eventData.length ? 0 :newIndex;
      });
    }, 5000);

    return () => clearInterval(intervalId);
  }, []); 

  const sortedEvents = [...eventData].sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="slider-container">
      <div className="slider">
        {sortedEvents.map((event, index) => (
          <div
            key={index}
            className={`slide ${index === currentIndex ? 'current' : ''}`}
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            <img src={event.cover} alt={event.title} />
            <div className="content">
              <h2>{event.title}</h2>
              <p>{event.description}</p>
              <p>{new Date(event.date).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>
      <div className='pagination'>
        {sortedEvents.map((_, index) => (
          <div 
          key={index}
          className={`dot ${index === currentIndex ? "active" : ""}`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Slider;