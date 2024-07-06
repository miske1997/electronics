import React, { useEffect, useRef } from "react";
import "./ScrollingImage.css"

function ScrollingImage({ picPositionPixels = 0, backgroundImageSource = "", firstParagraphFirstRow = "", firstParagraphSecondRow = "", secondParagraph = "" }) {

  const bgImgRef = useRef()
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      bgImgRef.current.style.backgroundPositionY = `${picPositionPixels + scrolled * -0.3}px`;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  return (
    <div ref={bgImgRef} className="parallax-main-div" style={{ backgroundImage: `url(${backgroundImageSource})`, backgroundPositionY: `${{ picPositionPixels }}px` }}>

      <div className="textContent" >
        <p className="first-paragraph" >
          <span className="first-paragraph-first-row">{firstParagraphFirstRow}</span>
          <br />
          <span className="first-paragraph-first-row">{firstParagraphSecondRow}</span>
        </p>

        <p className="second-paragraph" >{secondParagraph}</p>
      </div>
    </div>
  );
}

export default ScrollingImage;