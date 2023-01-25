import MmmCube from '@/components/Mmmcube';
import classes from "@/styles/3d.module.css";
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Marquee from 'react-fast-marquee';
import useSound from 'use-sound';
const Page = () => {
    const [playbackRate] = useState(1);
    const [isHovered, setIsHovered] = useState(false);
    /** This is probably pretty stupid */
    const [frameOne, setFrameOne] = useState(false);
    const [frameTwo, setFrameTwo] = useState(false);
    const [play, { stop, sound }] = useSound("/mmmm.mp3", { volume: 0.25, playbackRate, interrupt: true })
    const onHoverStart = () => {
        setIsHovered(true);
        play();
    }
    const onHoverEnd = () => {
        setIsHovered(false);
        stop();
    }

    useEffect(() => {
        let waitone: NodeJS.Timeout;
        let waittwo: NodeJS.Timeout;
        if (isHovered && sound) {
            waitone = setTimeout(() => setFrameOne(true), 7500 * playbackRate);
            waittwo = setTimeout(() => setFrameTwo(true), 14500 * playbackRate);
            sound.on('end', () => {
                setFrameOne(false);
                setFrameTwo(false);
                setIsHovered(false);
            })

        } else {
            setFrameOne(false);
            setFrameTwo(false);
        }
            return () => {
                clearTimeout(waitone);
                clearTimeout(waittwo);
            }
    }, [isHovered, sound, play, playbackRate])

    return <motion.main initial={{ opacity: 0 }} animate={{ opacity: Boolean(sound) ? 1 : 0 }}>
        <motion.div
         onClick={() => isHovered ? onHoverEnd() : onHoverStart()} layout className={classes.canvas}>
            <MmmCube
                playbackRate={playbackRate} isHovered={isHovered} frameOne={frameOne} frameTwo={frameTwo} />
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={frameTwo ? { opacity: 1 } : { opacity: 0 }}>
            <Marquee gradient={false} style={{
                position: 'fixed',
                zIndex: 2,
                top: 0,
                left: 0,
                pointerEvents: "none",
                userSelect: "none",
        }}>
            mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
            </Marquee>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={frameTwo ? { opacity: 1 } : { opacity: 0 }}>
            <Marquee gradient={false} style={{
                position: 'fixed',
                zIndex: 2,
                bottom: 0,
                left: 0,
                pointerEvents: "none",
                userSelect: "none",
        }}>
            mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
            </Marquee>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={frameTwo ? { opacity: 1 } : { opacity: 0 }}>
            <Marquee gradient={false} style={{
                position: 'fixed',
                zIndex: 2,
                bottom: "2em",
                left: 0,
                pointerEvents: "none",
                userSelect: "none",
        }}>
            <h1>mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm</h1>
            </Marquee>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={frameTwo ? { opacity: 1 } : { opacity: 0 }}>
            <Marquee gradient={false} style={{
                position: 'fixed',
                zIndex: 2,
                top: "2em",
                left: 0,
                pointerEvents: "none",
                userSelect: "none",
        }}>
            <h1>mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm</h1>
            </Marquee>
        </motion.div>
         <motion.div initial={{ opacity: 0 }} animate={frameTwo ? { opacity: 1 } : { opacity: 0 }}>
            <Marquee gradient={false} style={{
                position: 'fixed',
                zIndex: 2,
                top: "2em",
                left: 0,
                bottom: "2em",
                pointerEvents: "none",
                userSelect: "none",
        }}>
            <h1 style={{ fontSize: '9em'}}>mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmdanger/u/mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm</h1>
            </Marquee>
        </motion.div>
        <motion.div style={{
            position: 'fixed',
            width: "100vw",
            height: "100vh",
            pointerEvents: 'none',
            userSelect: 'none',
            backgroundSize: "2px 3px",
                            backgroundImage: `radial-gradient(transparent 50%, black 50%)`,
                            zIndex: 5,
        }} initial={{ opacity: 0 }} animate={frameTwo ? {
            opacity: 1
            } : { opacity: 0 }} />
    </motion.main>;
}

export default Page;
