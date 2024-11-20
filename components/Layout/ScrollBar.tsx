'use client'

import { motion, useScroll, useSpring } from "framer-motion";

const ScrollBar = () => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });
    return <>
        <motion.div className="fixed top-0 left-0 right-0 h-[7px] bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-pink-500 via-purple-500 to-blue-500 z-50 origin-left" style={{ scaleX }} />
    </>;
};

export default ScrollBar;
