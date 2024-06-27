import React, { useEffect, useRef } from "react";
import "./Carousel.css"

function sleep(time) {
  return new Promise((resolve) => {
      setTimeout(resolve, time || 1000);
  });
}

function Carousel({children = [], minGap = 50, carouselItems = [] }) {
  let carouselRef = useRef(null)
  let carouselMainRef = useRef(null)
  let currentIndex = 0
  let translateAmount = 0
  let maxIndex = 0
  console.log(children)

  useEffect(() => {
    const card = carouselRef.current.querySelector('.popular-card')
    const refWidth = carouselMainRef.current.clientWidth
    
    const cardWidth = 330
    
    const cardsInView = Math.floor(refWidth / cardWidth)
    const totalGap = refWidth - (cardsInView * cardWidth)
    const gap = (totalGap / cardsInView)
    translateAmount = gap / 2  + cardWidth
    maxIndex = children.length - cardsInView
    console.log("Card Width: " + cardWidth);
    console.log("Total Gap: " + totalGap);
    console.log("Cards in view: " + cardsInView);

    console.log("Gap: " + gap);

    carouselRef.current.style.gap = gap + "px"
    card.style.marginLeft = gap + "px"
  }, [])

  function moveLeft() {
    currentIndex = Math.max(0, currentIndex - 1)

    carouselRef.current.style.transform = `translateX(-${(currentIndex * translateAmount)}px)`
  }
  function moveRight() {
    currentIndex = Math.min(maxIndex, currentIndex + 1)
    carouselRef.current.style.transform = `translateX(-${currentIndex * translateAmount}px)`
  }

  return (

    <div ref={carouselMainRef} className="carousel-main-div">
      <button onClick={moveLeft} className="button-left"  >
        <img className="button-png" src="/resources/arrow-left.png" />
      </button>
      <button onClick={moveRight} className="button-right"  >
        <img className="button-png" src="/resources/arrow-right.png" />
      </button>
      <div ref={carouselRef} className="carousel-initialized-slides-div">
        {children}
      </div>
    </div>
  );
}

export default Carousel;
