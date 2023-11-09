import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import "./card.css";
import gsap from "gsap";
import { useEffect } from "react";

export default function CardDonutView({
  donut: { id, name, imgUrl, description },
}) {
  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      ".animate-item",
      {
        opacity: 0,
        y: 100,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      }
    );

    // Cleanup function
    return () => {
      tl.kill(); // Kill the animation when the component unmounts
    };
  }, []);

  return (
    <div className="w-1/4 px-2 animate-item">
      <div className="bg-white p-2">
        <div className="relative">
          <img src={imgUrl} alt="Donut" className="w-auto rounded" />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 opacity-0 transition-opacity duration-300 hover:opacity-100">
            <div className="text-white text-center">
              <p>{description}</p>
            </div>
          </div>
        </div>
        <h3 className="text-2xl font-bold mb-10 text-orange-800 inline-block border-b-2 border-orange-500 px-4 uppercase mt-4 custom-card-text">
          <NavLink to={`/detail/${id}`} className="no-underline text-orange-800">
            {name}
          </NavLink>
        </h3>
      </div>
    </div>
  );
}

CardDonutView.propTypes = {
  donut: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    imgUrl: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};
