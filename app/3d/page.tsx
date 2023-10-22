'use client';
/** This is the worst page ever made */
import MmmCube from '@/components/Mmmcube';
import StupidMarquees from '@/components/StupidMarquees';
import classes from '@/styles/3d.module.css';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import useSound from 'use-sound';
const Page = () => {
    const [playbackRate] = useState(1);
    const [isHovered, setIsHovered] = useState(false);
    /** This is probably pretty stupid */
    const [frameOne, setFrameOne] = useState(false);
    const [frameTwo, setFrameTwo] = useState(false);
    const [play, { stop, sound }] = useSound('/mmmm.mp3', {
        volume: 0.25,
        playbackRate,
        interrupt: true,
    });
    const onHoverStart = () => {
        setIsHovered(true);
        play();
    };
    const onHoverEnd = () => {
        setIsHovered(false);
        stop();
    };

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
            });
        } else {
            setFrameOne(false);
            setFrameTwo(false);
        }
        return () => {
            clearTimeout(waitone);
            clearTimeout(waittwo);
        };
    }, [isHovered, sound, play, playbackRate, stop]);

    useEffect(() => {
        return () => {
            stop();
        };
    }, [stop]);

    return (
        <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: Boolean(sound) ? 1 : 0 }}
        >
            <motion.div
                onClick={() =>
                    Boolean(sound)
                        ? isHovered
                            ? onHoverEnd()
                            : onHoverStart()
                        : undefined
                }
                layout
                className={classes.canvas}
            >
                <MmmCube
                    playbackRate={playbackRate}
                    isHovered={isHovered}
                    frameOne={frameOne}
                    frameTwo={frameTwo}
                />
                <StupidMarquees visible={frameTwo} />
            </motion.div>
        </motion.main>
    );
};

export default Page;
