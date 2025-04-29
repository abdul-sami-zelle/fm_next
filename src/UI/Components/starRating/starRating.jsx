import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

function RatingReview({ rating, setRating, disabled,size,bgColor,bgColor2 }) {
  const [hoverRating, setHoverRating] = useState(null);

  const handleMouseEnter = (event, star) => {
    if (disabled) return; 

    const rect = event.target.getBoundingClientRect();
    const hoverPosition = event.clientX - rect.left; 
    const starWidth = rect.width;
    const fraction = hoverPosition / starWidth; 
    const roundedFraction = Math.round(fraction * 2) / 2; 
    setHoverRating(star - 1 + roundedFraction);
  };

  const handleMouseLeave = () => {
    if (disabled) return; 
    setHoverRating(null);
  };

  const handleClick = (event, star) => {
    if (disabled) return; 

    const rect = event.target.getBoundingClientRect();
    const clickPosition = event.clientX - rect.left; 
    const starWidth = rect.width;
    const fraction = clickPosition / starWidth; 
    const preciseRating = star - 1 + fraction;
    const roundedRating = Math.round(preciseRating * 2) / 2; 
    setRating(roundedRating);
  };

  return (
    <div style={{ display: "flex" }}>
      {[1, 2, 3, 4, 5].map((star) => {
        const fillLevel = hoverRating
          ? Math.min(1, Math.max(0, hoverRating - (star - 1)))
          : Math.min(1, Math.max(0, rating - (star - 1)));

        return (
          <span
            key={star}
            className="star"
            style={{
              position: "relative",
              cursor: disabled ? "not-allowed" : "pointer",
              fontSize: size? size : `25px`,
              lineHeight:size? size : `25px`,
              zIndex: 0

            }}
            onClick={(e) => handleClick(e, star)}
            onMouseEnter={(e) => handleMouseEnter(e, star)}
            onMouseLeave={handleMouseLeave}
          >
            <FaStar
              style={{
                color: bgColor2? bgColor2 : "#d4d4d4",
                
              }}
            />
            <FaStar
              style={{
                color: bgColor ? bgColor : "var(--tertiary-color)",
                position: "absolute",
                top: "0px",
                left: 0,
                clipPath: `inset(0 ${100 - fillLevel * 100}% 0 0)`,
                
              }}
            />
          </span>
        );
      })}
    </div>
  );
}

export default RatingReview;
