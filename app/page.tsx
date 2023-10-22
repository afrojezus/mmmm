'use client';

import styles from '@/styles/index.module.scss';
import { motion } from 'framer-motion';
import StupidMarquees from '@/components/StupidMarquees';
import dynamic from 'next/dynamic';
import Image from 'next/image';

const StarWarp = dynamic(() => import('@/components/StarWarp'), {
    ssr: false,
});

type IndexPageProps = {};

const IndexPage = (props: IndexPageProps) => {
    const {} = props;

    return (
        <motion.main>
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
        </motion.main>
    );
};

export default IndexPage;
