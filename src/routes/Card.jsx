import React from "react";
import { motion } from "framer-motion";

function Card({ text, index, visual }) {
  return (
    <motion.div
      className="card"
      initial={{
        opacity: 0,
        // if odd index card,slide from right instead of left
        x: index % 2 === 0 ? 50 : -50
      }}
      whileInView={{
        opacity: 1,
        x: 0, // Slide in to its original position
        transition: {
          duration: 1 // Animation duration
        }
      }}
      viewport={{ once: true }}
    >
      <p className="card-text">{text}</p>
      <img src={visual}/>
    </motion.div>
  );
}

export default Card;
