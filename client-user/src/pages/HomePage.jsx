import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroSlide from "../components/Hero/HeroSlide";
import LoaderView from "../components/Loader/LoaderView";
import { NavLink } from "react-router-dom";

// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const [isLoading, setLoading] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: "top center",
        toggleActions: "play none none none", // Play animation when it reaches the center of the viewport
      },
    });

    // Define the animations
    tl.to(element, {
      opacity: 0.5,
      transform: "matrix(1.3, 0, 0, 1.3, 0, 0)",
      duration: 1,
    });

    tl.to(element, {
      opacity: 1,
      transform: "matrix(1, 0, 0, 1, 0, 0)",
      duration: 1,
    });

    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  if (isLoading) {
    return <LoaderView />;
  }

  return (
    <>
      <HeroSlide />
      {/* go to all product */}
      <div className='container mx-auto my-16 text-center'>
        <p className='md:px-72 text-xl tracking-wider lg:text-center'>
          What’s your mood? We’ve got exceptionally handcrafted donuts, premium
          sourced Arabica coffee, and other crave-inducing treats prepared just
          for you.
        </p>
        <button className='btn mt-4 border border-orange-500 text-orange-500 hover:bg-orange-600 hover:text-white p-3'>
          <NavLink to='/menu'>EXPLORE OUR MENU</NavLink>
        </button>
      </div>
      <div
        className='w-full'
        style={{ position: "relative", overflow: "hidden", height:"80vh"}}>
        <img
          ref={elementRef}
          style={{ minWidth: "100%", height: "auto", objectFit: "fill" }}
          src='https://api.vold.dev.fleava.com/pictures/5b39cd517169294aba251f43/images/thumbnails/large_8d8f458b-1861-4f79-bec0-0d6af53464f5.jpg'
          alt=''
        />
      </div>
    </>
  );
}
