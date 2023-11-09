import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroSlide from "../components/Hero/HeroSlide";
import LoaderView from "../components/Loader/LoaderView";
import { NavLink } from "react-router-dom";

// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const [isLoading, setLoading] = useState(false); // Changed initial state to false

  useEffect(() => {
    // You can use GSAP animations with ScrollTrigger here
    gsap.from(".animate-me", {
      opacity: 0,
      y: 100,
      duration: 1,
      scrollTrigger: {
        trigger: ".animate-me",
        start: "top center", // Adjust this as needed
        end: "bottom center", // Adjust this as needed
        scrub: true, // Makes the animation smooth during scrolling
      },
    });

    // Simulate loading delay (you can remove this if not needed)
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
      <div className='container mx-auto my-16 text-center animate-me'>
        <p className='md:px-72 text-xl tracking-wider lg:text-center'>
          What’s your mood? We’ve got exceptionally handcrafted donuts, premium
          sourced Arabica coffee, and other crave-inducing treats prepared just
          for you.
        </p>
        <button className='btn mt-4 border border-orange-500 text-orange-500 hover:bg-orange-600 hover:text-white p-3'>
          <NavLink to='/menu'>EXPLORE OUR MENU</NavLink>
        </button>
      </div>
      {/* Use ScrollTrigger for animations */}
      <div className='w-full'>
        <img
          className='h-48 w-full object-cover md:h-full animate-me'
          src='https://api.vold.dev.fleava.com/pictures/5b39cd517169294aba251f43/images/thumbnails/large_8d8f458b-1861-4f79-bec0-0d6af53464f5.jpg'
          alt=''
          data-scrolltrigger='{"start": "top center", "end": "bottom center", "scrub": true}'
        />
      </div>
    </>
  );
}
