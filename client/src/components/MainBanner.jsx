import { motion } from "framer-motion";
import { useRef } from "react";
import "./Hero.css"; // Create this CSS file

const MainBanner = () => {
  const constraintsRef = useRef(null);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const textVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 120 },
    },
  };

  const imageVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", damping: 15, stiffness: 100 },
    },
  };

  return (
    <motion.section
      className="hero"
      initial="hidden"
      animate="visible"
      ref={constraintsRef}
    >
      {/* Animated gradient background */}
      <motion.div
        className="hero__gradient"
        animate={{
          background: [
            `linear-gradient(45deg, var(--color-primary) 0%, var(--color-primary-dull) 50%, var(--color-primary) 100%)`,
            `linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dull) 50%, var(--color-primary) 100%)`,
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
      />

      <div className="hero__content">
        {/* Text group */}
        <motion.div className="hero__text-group" variants={containerVariants}>
          <motion.h1 className="hero__title" variants={textVariants}>
            <motion.span
              animate={{
                background: [
                  `linear-gradient(to right, var(--color-primary) 0%, var(--color-primary-dull) 100%)`,
                  `linear-gradient(to right, var(--color-primary-dull) 0%, var(--color-primary) 100%)`,
                ],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              Next-Gen Tech
            </motion.span>
            <motion.span className="hero__highlight" variants={textVariants}>
              Reimagined
            </motion.span>
          </motion.h1>

          <motion.p className="hero__subtitle" variants={textVariants}>
            Experience Tomorrow's Technology Today
          </motion.p>

          <motion.div className="hero__cta" variants={textVariants}>
            <motion.button
              className="hero__btn hero__btn--primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Shop Now
            </motion.button>
            <motion.button
              className="hero__btn hero__btn--secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Product image */}
        <motion.div className="hero__image-container" variants={imageVariants}>
          <motion.img
            src="/tech-product.png"
            alt="Tech Product"
            className="hero__image"
            animate={{
              y: [-10, 10, -10],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="hero__image-glow"
            animate={{
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          />
        </motion.div>
      </div>

      {/* Decorative elements */}
      <motion.div
        className="hero__deco-circle"
        animate={{
          rotate: 360,
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <motion.div
        className="hero__deco-blob"
        animate={{
          borderRadius: ["40% 60% 60% 40%", "50% 50% 60% 40%"],
          rotate: [0, 180],
          scale: [1, 1.2],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
    </motion.section>
  );
};

export default MainBanner;
