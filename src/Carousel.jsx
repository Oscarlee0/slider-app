import React, { useEffect, useState } from "react";
import { shortList, list, longList } from "./data";
import { FaQuoteRight } from "react-icons/fa";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";

const Carousel = () => {
  const [people, setPeople] = useState(list);
  const [currentPerson, setCurrentPerson] = useState(0);

  const nextSlide = () => {
    setCurrentPerson((oldPerson) => {
      const result = (oldPerson + 1) % people.length;
      return result;
    });
  };
  const prevSlide = () => {
    setCurrentPerson((oldPerson) => {
      const result = (oldPerson - 1 + people.length) % people.length;
      return result;
    });
  };

  useEffect(() => {
    let autoSlide = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => {
      clearInterval(autoSlide);
    };
  }, [currentPerson]);

  return (
    <section className='slider-container'>
      {people.map((person, personIndex) => {
        const { id, name, title, quote, image } = person;
        return (
          <article
            className='slide'
            key={id}
            style={{
              transform: `translateX(${100 * (personIndex - currentPerson)}%)`,
              opacity: personIndex === currentPerson ? 1 : 0,
              visibility: personIndex === currentPerson ? "visible" : "hidden",
            }}
          >
            <img src={image} alt={name} className='person-img' />
            <h5 className='name'>{name}</h5>
            <p className='title'>{title}</p>
            <p className='text'>{quote}</p>
            <FaQuoteRight className='icon' />
          </article>
        );
      })}
      <button className='next' type='button' onClick={nextSlide}>
        <FiChevronRight />
      </button>
      <button className='prev' type='button' onClick={prevSlide}>
        <FiChevronLeft />
      </button>
    </section>
  );
};

export default Carousel;
