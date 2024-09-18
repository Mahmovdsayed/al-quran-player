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
        <motion.div className="fixed top-0 left-0 right-0 h-[7px] bg-gradient-to-r from-fuchsia-500 via-red-600 to-orange-400 z-50 origin-left" style={{ scaleX }} />
    </>;
};

export default ScrollBar;
