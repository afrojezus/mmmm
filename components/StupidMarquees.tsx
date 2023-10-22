'use client';
import { motion } from 'framer-motion';
import Marquee from 'react-fast-marquee';
import TripleText from './TripleText';

type StupidMarqueesProps = {
    visible?: boolean;
    alternative?: boolean;
    speed?: number;
    myon?: boolean;
    uuuu?: boolean;
    direction?: 'left' | 'right';
    opacity?: number;
};

const StupidMarquees = (props: StupidMarqueesProps) => {
    const {
        visible,
        alternative,
        myon,
        uuuu,
        direction = 'left',
        opacity = 1,
    } = props;
    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={visible ? { opacity } : { opacity: 0 }}
            >
                <Marquee
                    speed={myon || uuuu ? 900 : 50}
                    gradient={false}
                    direction={direction}
                    style={{
                        position: 'fixed',
                        zIndex: 2,
                        top: 56,
                        left: 0,
                        pointerEvents: 'none',
                        userSelect: 'none',
                        height: 40,
                    }}
                >
                    {myon ? (
                        <h1>
                            myon myon myon myon myon myon myon myon myon myon
                        </h1>
                    ) : uuuu ? (
                        <h1>
                            uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu
                        </h1>
                    ) : (
                        <h1>
                            mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
                        </h1>
                    )}
                </Marquee>
            </motion.div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={visible ? { opacity } : { opacity: 0 }}
            >
                <Marquee
                    speed={myon || uuuu ? 300 : 50}
                    gradient={false}
                    direction={direction}
                    style={{
                        position: 'absolute',
                        zIndex: 2,
                        bottom: 0,
                        left: 0,
                        pointerEvents: 'none',
                        userSelect: 'none',
                        height: 20,
                    }}
                >
                    {myon ? (
                        <h3>
                            myon myon myon myon myon myon myon myon myon myon
                            myon myon myon myon myon myon myon myon myon myon
                        </h3>
                    ) : uuuu ? (
                        <h3>
                            uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu
                        </h3>
                    ) : (
                        <h3>
                            mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
                        </h3>
                    )}
                </Marquee>
            </motion.div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={visible ? { opacity } : { opacity: 0 }}
            >
                <Marquee
                    speed={myon || uuuu ? 100 : 50}
                    gradient={false}
                    direction={direction}
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
                    {myon ? (
                        <h1>
                            myon myon myon myon myon myon myon myon myon myon
                        </h1>
                    ) : uuuu ? (
                        <h1>
                            uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu
                        </h1>
                    ) : (
                        <h1>
                            mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
                        </h1>
                    )}
                </Marquee>
            </motion.div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={visible ? { opacity } : { opacity: 0 }}
            >
                <Marquee
                    speed={myon || uuuu ? 600 : 50}
                    gradient={false}
                    direction={direction}
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
                    {myon ? (
                        <h1>
                            myon myon myon myon myon myon myon myon myon myon
                        </h1>
                    ) : uuuu ? (
                        <h1>
                            uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu
                        </h1>
                    ) : (
                        <h1>
                            mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
                        </h1>
                    )}
                </Marquee>
            </motion.div>
            {!alternative && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={visible ? { opacity } : { opacity: 0 }}
                >
                    <Marquee
                        direction={direction}
                        speed={myon || uuuu ? 800 : 50}
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
                        {myon ? (
                            <div>
                                <TripleText
                                    textProps={{ style: { fontSize: '9em' } }}
                                    string="myon"
                                />
                                <TripleText
                                    style={{
                                        margin: '9em',
                                    }}
                                    textProps={{
                                        style: {
                                            fontSize: '9em',
                                        },
                                    }}
                                    string="myon"
                                />
                                <TripleText
                                    string="myon"
                                    style={{
                                        marginLeft: '2em',
                                    }}
                                    textProps={{
                                        style: {
                                            fontSize: '9em',
                                        },
                                    }}
                                />
                            </div>
                        ) : uuuu ? (
                            <h1 style={{ fontSize: '9em' }}>
                                uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu
                            </h1>
                        ) : (
                            <h1 style={{ fontSize: '9em' }}>
                                mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
                            </h1>
                        )}
                    </Marquee>
                </motion.div>
            )}
            {alternative && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={visible ? { opacity: 1 } : { opacity: 0 }}
                >
                    <Marquee
                        speed={myon ? 100 : 50}
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
                        {uuuu ? (
                            <h1 style={{ fontSize: '9em' }}>
                                uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu
                            </h1>
                        ) : (
                            <h1 style={{ fontSize: '9em' }}>
                                mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
                            </h1>
                        )}
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
                        {uuuu ? (
                            <h1 style={{ fontSize: '9em' }}>
                                uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu
                            </h1>
                        ) : (
                            <h1 style={{ fontSize: '9em' }}>
                                mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
                            </h1>
                        )}
                    </Marquee>
                </motion.div>
            )}
        </>
    );
};

export default StupidMarquees;
