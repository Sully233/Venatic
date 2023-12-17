import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";

import horizontal1 from "../../images/HorizontalSlider/horizontal1.jpeg";
import horizontal2 from "../../images/HorizontalSlider/horizontal2.jpeg";
import horizontal3 from "../../images/HorizontalSlider/horizontal3.jpeg";
import horizontal4 from "../../images/HorizontalSlider/horizontal4.jpeg";
import horizontal5 from "../../images/HorizontalSlider/horizontal5.jpeg";
import horizontal6 from "../../images/HorizontalSlider/horizontal6.jpeg";
import horizontal7 from "../../images/HorizontalSlider/horizontal7.jpeg";


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
  return (
    <div
      key={card.id}
      className="group relative h-[450px] w-[450px] overflow-hidden bg-neutral-200"
    >
      <div
        style={{
          backgroundImage: `url(${card.url})`,
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