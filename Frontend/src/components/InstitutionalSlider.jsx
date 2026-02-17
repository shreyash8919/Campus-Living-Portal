import React, { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import './InstitutionalSlider.css';
import hostel1 from "../assets/hostel1.jpg";
import hostel2 from "../assets/hostel2.jpg";
import hostel3 from "../assets/hostel3.jpg";
import hostel4 from "../assets/hostel4.jpg";
import hostel5 from "../assets/hostel5.jpg";
import hostel6 from "../assets/hostel6.jpg";
import hostel7 from "../assets/hostel7.jpg";
import hostel8 from "../assets/hostel8.jpg";


const images = [
    hostel1,
    hostel2,
    hostel3,
    hostel4,
    hostel5,
    hostel6,
    hostel7,
    hostel8,
];

export default function InstitutionalSlider() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="institutional-slider-container">
            <div
                className="slider-wrapper"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {images.map((img, index) => (
                    <div key={index} className="slide">
                        <img src={img} alt={`Slide ${index + 1}`} />
                    </div>
                ))}
            </div>

            <button className="slider-arrow slider-prev" onClick={prevSlide} aria-label="Previous slide">
                <FiChevronLeft size={20} />
            </button>
            <button className="slider-arrow slider-next" onClick={nextSlide} aria-label="Next slide">
                <FiChevronRight size={20} />
            </button>

            <div className="slider-dots">
                {images.map((_, index) => (
                    <button
                        key={index}
                        className={`slider-dot ${currentIndex === index ? 'active' : ''}`}
                        onClick={() => goToSlide(index)}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
