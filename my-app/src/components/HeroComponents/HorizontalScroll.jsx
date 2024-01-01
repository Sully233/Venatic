import { motion, useTransform, useScroll } from "framer-motion";
import { useRef, useState, useEffect } from "react";

import horizontal1 from "../../images/HorizontalSlider/horizontal1.avif";
import horizontal2 from "../../images/HorizontalSlider/horizontal2.avif";
import horizontal3 from "../../images/HorizontalSlider/horizontal3.avif";
import horizontal4 from "../../images/HorizontalSlider/horizontal4.avif";
import horizontal5 from "../../images/HorizontalSlider/horizontal5.avif";
import horizontal6 from "../../images/HorizontalSlider/horizontal6.avif";
import horizontal7 from "../../images/HorizontalSlider/horizontal7.avif";


const HorizontalScrollCarousel = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-90%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] ">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-4">
          {cards.map((card) => {
            return <Card card={card} key={card.id} />;
          })}
        </motion.div>
      </div>
    </section>
  );
};


const Card = ({ card }) => {
  const [loadImage, setLoadImage] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setLoadImage(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "100px", // Load image 100px before it comes into viewport
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [cardRef]);

  return (
    <div
      ref={cardRef}
      key={card.id}
      className="group relative h-[450px] w-[450px] overflow-hidden bg-neutral-200"
    >
      <div
        style={{
          backgroundImage: loadImage ? `url(${card.url})` : 'none',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-110"
      ></div>
      <div className="absolute inset-0 z-10 grid place-content-center">

      </div>
    </div>
  );
};

export default HorizontalScrollCarousel;

const cards = [
  {
    url: horizontal1,
    title: "Title 1",
    id: 1,
  },
  {
    url: horizontal2,
    title: "Title 2",
    id: 2,
  },
  {
    url: horizontal3,
    title: "Title 3",
    id: 3,
  },
  {
    url: horizontal4,
    title: "Title 4",
    id: 4,
  },
  {
    url: horizontal5,
    title: "Title 5",
    id: 5,
  },
  {
    url: horizontal6,
    title: "Title 6",
    id: 6,
  },
  {
    url: horizontal7,
    title: "Title 7",
    id: 7,
  },
];