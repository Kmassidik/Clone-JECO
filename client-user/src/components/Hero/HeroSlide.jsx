import { useState, useEffect } from "react";
import hero1 from "../../assets/hero1.jpg";
import hero2 from "../../assets/hero2.jpg";
import hero3 from "../../assets/hero3.jpg";
import "./heroslide.css";

export default function HeroSlide() {
  const images = [hero1, hero2, hero3];
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      nextImage();
    }, 2000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className='container mx-auto mt-5 relative heroslider'>
      <div className='relative'>
        {images.map((image, index) => (
          <img
            key={index}
            className={`w-full mx-auto object-cover ${
              index === currentIndex ? "relative" : "hidden"
            }`}
            src={image}
            alt='heroes'
          />
        ))}
      </div>
    </div>
  );
}
