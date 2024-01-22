import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import shuffle1 from "../images/Shuffle/shuffle1.avif";
import shuffle2 from "../images/Shuffle/shuffle2.avif";
import shuffle3 from "../images/Shuffle/shuffle3.avif";
import shuffle4 from "../images/Shuffle/shuffle4.avif";
import shuffle5 from "../images/Shuffle/shuffle5.avif";
import shuffle6 from "../images/Shuffle/shuffle6.avif";
import shuffle7 from "../images/Shuffle/shuffle7.avif";
import shuffle8 from "../images/Shuffle/shuffle8.avif";
import shuffle9 from "../images/Shuffle/shuffle9.avif";
import shuffle10 from "../images/Shuffle/shuffle10.avif";
import shuffle11 from "../images/Shuffle/shuffle11.avif";
import shuffle12 from "../images/Shuffle/shuffle12.avif";
import shuffle13 from "../images/Shuffle/shuffle13.avif";
import shuffle14 from "../images/Shuffle/shuffle14.avif";
import shuffle15 from "../images/Shuffle/shuffle15.avif";
import shuffle16 from "../images/Shuffle/shuffle16.avif";
import { Typewriter } from 'react-simple-typewriter'




const ShuffleHero = () => {


  return (
    <section className="w-full px-8 py-12 grid grid-cols-1 md:grid-cols-2 items-center gap-8 max-w-6xl mx-auto">
      <div>
        
      <h3 className="text-4xl md:text-6xl font-semibold">
      <Typewriter
            words={['Let\'s create an experience worth remembering.']}
            loop={1}
            cursor
            cursorStyle='|'
            typeSpeed={75}

            />
        </h3>
        <p className="text-base md:text-lg text-slate-700 my-4 md:my-6">
          Capture the Moments That Matter. Whether it’s for a special occasion
          or a casual shoot, hire a professional photographer
          easily and efficiently.
        </p>
      </div>
      <ShuffleGrid />
    </section>
  );
};

const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const squareData = [
  {
    id: 1,
    src: shuffle1,  
  },
  {
    id: 2,
    src: shuffle2,
  },
  {
    id: 3,
    src: shuffle3,
  },
  {
    id: 4,
    src: shuffle4,
  },
  {
    id: 5,
    src: shuffle5,
  },
  {
    id: 6,
    src: shuffle6,
  },
  {
    id: 7,
    src: shuffle7,
  },
  {
    id: 8,
    src: shuffle8,
  },
  {
    id: 9,
    src: shuffle9,
  },
  {
    id: 10,
    src: shuffle10,
  },
  {
    id: 11,
    src: shuffle11,
  },
  {
    id: 12,
    src: shuffle12,
  },
  {
    id: 13,
    src: shuffle13,
  },
  {
    id: 14,
    src: shuffle14,
  },
  {
    id: 15,
    src: shuffle15,
  },
  {
    id: 16,
    src: shuffle16,
  },
];
const generateSquares = () => {
  return shuffle(squareData).map((sq) => (
    <motion.div
      key={sq.id}
      layout
      transition={{ duration: 1.5, type: "spring" }}
      className="w-full h-full"
      style={{
        backgroundImage: `url(${sq.src})`,
        backgroundSize: "cover",
      }}
    ></motion.div>
  ));
};


const ShuffleGrid = () => {
  const gridRef = useRef(null);
  const timeoutRef = useRef(null);
  const [squares, setSquares] = useState(generateSquares());
  const [isInView, setIsInView] = useState(false);

  const shuffleSquares = () => {
    if (isInView) {
      setSquares(generateSquares());
      timeoutRef.current = setTimeout(shuffleSquares, 3000);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 } // Trigger when at least 10% of the grid is visible
    );

    if (gridRef.current) {
      observer.observe(gridRef.current);
    }

    return () => {
      if (gridRef.current) {
        observer.unobserve(gridRef.current);
      }
      clearTimeout(timeoutRef.current);
    };
  }, [gridRef]);

  useEffect(() => {
    shuffleSquares();

    return () => clearTimeout(timeoutRef.current);
  }, [isInView]);

  return (
    <div
      ref={gridRef}
      className="grid grid-cols-4 grid-rows-4 h-[450px] gap-1"
    >
      {squares.map((sq) => sq)}
    </div>
  );
};


export default ShuffleHero;
