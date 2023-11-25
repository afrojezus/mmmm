'use client';

import styles from '@/styles/index.module.scss';
import { motion } from 'framer-motion';
import StupidMarquees from '@/components/StupidMarquees';
import dynamic from 'next/dynamic';
import Image from 'next/image';

const StarWarp = dynamic(() => import('@/components/StarWarp'), {
    ssr: false,
});

const FestiveScene = dynamic(() => import('@/components/FestiveScene'), {
    ssr: false,
});

type IndexPageProps = {};

const winterTimes = [10, 11, 0, 1];

const IndexPage = (props: IndexPageProps) => {
    const {} = props;
    const isWinterTime = winterTimes.includes(new Date().getMonth());

    return (
        <motion.main
            style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%',
            }}
        >
            {!isWinterTime && (
                <>
                    <motion.div
                        layout
                        initial={{ opacity: 0, scale: 0.1 }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                        }}
                        transition={{
                            duration: 2,
                        }}
                        className={styles.mmmm}
                    >
                        <Image
                            className="mmmmm"
                            src="/mmmmHD.png"
                            alt="mmmmm"
                            fill
                            style={{
                                objectFit: 'contain',
                            }}
                        />
                    </motion.div>
                    <StarWarp />
                    <StupidMarquees alternative visible />
                </>
            )}
            {isWinterTime && <FestiveScene />}
        </motion.main>
    );
};

export default IndexPage;
