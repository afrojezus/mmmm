import Head from 'next/head';
import Image from 'next/image';
import styles from '@/styles/index.module.scss';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import StupidMarquees from '@/components/StupidMarquees';
import { useEffect, useState } from 'react';

const StarWarp = dynamic(() => import('@/components/StarWarp'), {
    ssr: false,
});

export default function Home() {
    return (
        <>
            <Head>
                <title>mmmmmmmmmmmmmm</title>
                <meta name="description" content="mmmmmmmmmm" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
                <meta property="og:title" content="mmmmmmmmmmmmmm" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="mmmm.moe" />
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="og:description" content="mmmmmmmmmmm" />
                <meta property="og:image" content="/mmmmHD.png" />
                <meta property="og:image:type" content="image/png" />
                <meta property="og:image:width" content="250" />
                <meta property="og:image:height" content="250" />
                <meta name="theme-color" content="#ff7be9" />
            </Head>
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
        </>
    );
}
