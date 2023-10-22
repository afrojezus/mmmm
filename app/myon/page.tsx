'use client';
import MyonCube from '@/components/Myoncube';
import classes from '@/styles/3d.module.css';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import useSound from 'use-sound';

const Page = () => {
    const [playbackRate] = useState(1);
    const [isHovered, setIsHovered] = useState(false);
    const [play, { stop, sound }] = useSound('/myon2.mp3', {
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
        if (isHovered && sound) {
            sound.on('end', () => {
                setIsHovered(false);
            });
        }
    }, [isHovered, sound]);

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
                <MyonCube playbackRate={playbackRate} isHovered={isHovered} />
            </motion.div>
        </motion.main>
    );
};
export default Page;
