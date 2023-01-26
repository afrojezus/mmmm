import { motion } from 'framer-motion';
import Marquee from 'react-fast-marquee';

const StupidMarquees = ({
    visible,
    alternative,
}: {
    visible?: boolean;
    alternative?: boolean;
}) => {
    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={visible ? { opacity: 1 } : { opacity: 0 }}
            >
                <Marquee
                    gradient={false}
                    style={{
                        position: 'fixed',
                        zIndex: 2,
                        top: 56,
                        left: 0,
                        pointerEvents: 'none',
                        userSelect: 'none',
                    }}
                >
                    mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
                </Marquee>
            </motion.div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={visible ? { opacity: 1 } : { opacity: 0 }}
            >
                <Marquee
                    gradient={false}
                    style={{
                        position: 'absolute',
                        zIndex: 2,
                        bottom: 0,
                        left: 0,
                        pointerEvents: 'none',
                        userSelect: 'none',
                    }}
                >
                    mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
                </Marquee>
            </motion.div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={visible ? { opacity: 1 } : { opacity: 0 }}
            >
                <Marquee
                    gradient={false}
                    style={{
                        position: 'absolute',
                        zIndex: 2,
                        bottom: '2em',
                        left: 0,
                        height: 100,
                        pointerEvents: 'none',
                        userSelect: 'none',
                    }}
                >
                    <h1>
                        mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
                    </h1>
                </Marquee>
            </motion.div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={visible ? { opacity: 1 } : { opacity: 0 }}
            >
                <Marquee
                    gradient={false}
                    style={{
                        position: 'absolute',
                        zIndex: 2,
                        top: 0,
                        left: 0,
                        height: 200,
                        pointerEvents: 'none',
                        userSelect: 'none',
                    }}
                >
                    <h1>
                        mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
                    </h1>
                </Marquee>
            </motion.div>
            {!alternative && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={visible ? { opacity: 1 } : { opacity: 0 }}
                >
                    <Marquee
                        gradient={false}
                        style={{
                            position: 'absolute',
                            zIndex: 2,
                            top: '2em',
                            left: 0,
                            bottom: '2em',
                            pointerEvents: 'none',
                            userSelect: 'none',
                        }}
                    >
                        <h1 style={{ fontSize: '9em' }}>
                            mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmdanger/u/mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
                        </h1>
                    </Marquee>
                </motion.div>
            )}
            {alternative && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={visible ? { opacity: 1 } : { opacity: 0 }}
                >
                    <Marquee
                        gradient={false}
                        style={{
                            position: 'absolute',
                            zIndex: 2,
                            top: 44,
                            left: 0,
                            pointerEvents: 'none',
                            userSelect: 'none',
                            height: 300,
                        }}
                    >
                        <h1 style={{ fontSize: '9em' }}>
                            mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmdanger/u/mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
                        </h1>
                    </Marquee>
                </motion.div>
            )}
            {alternative && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={visible ? { opacity: 1 } : { opacity: 0 }}
                >
                    <Marquee
                        direction="right"
                        gradient={false}
                        style={{
                            position: 'absolute',
                            zIndex: 2,
                            bottom: 44,
                            left: 0,
                            pointerEvents: 'none',
                            userSelect: 'none',
                            height: 300,
                        }}
                    >
                        <h1 style={{ fontSize: '9em' }}>
                            mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmdanger/u/mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
                        </h1>
                    </Marquee>
                </motion.div>
            )}
        </>
    );
};

export default StupidMarquees;
