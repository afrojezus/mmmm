import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const a: string[] = [
    '宵口 鯉口 斬口 飛沫 サラサラ',
    '閃き 斬裂 溜息 息吹 カラカラ',
    '無言に 風立ち 逆巻き 独り さよなら',
    '刃に 何を映しているの？ 浮世か、幽世',
    'たちまち 苛立ち 俄かに 別離 バラバラ',
    '無力に 佇み どこかに 独り さよなら',
    'どちらにも動けないこの世界では独りでいつも',
    '中途半端だと笑わないで それでもいつの日か',
    '睨む地獄の果てを',
    '飛び立つ地獄を越えて',
    '見上げる天の彼方を',
    '捉える極楽の日さえも',
    '見つめる地獄の果てを目指して',
];

const MyonLyrics = ({
    visible,
    opacity,
}: {
    visible: boolean;
    opacity: number;
}) => {
    const [lyrics] = useState<string[]>(a);
    const [lyricsIndex, setLyricsIndex] = useState(0);
    const [lyricsInterval, setLyricsInterval] = useState<NodeJS.Timeout>();
    const [lyricsChanged, setLyricsChanged] = useState(false);

    useEffect(() => {
        if (visible) {
            setLyricsInterval(
                setInterval(() => {
                    setLyricsChanged(false);
                    setLyricsIndex((prev) => prev + 1);
                    setLyricsChanged(true);
                }, 4000)
            );
        } else {
            clearInterval(lyricsInterval);
            setLyricsIndex(0);
        }
        return () => {
            setLyricsIndex(0);
            clearInterval(lyricsInterval);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [visible]);
    if (!visible) return null;
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity }}>
            <motion.h1
                style={{
                    position: 'absolute',
                    zIndex: 2,
                    bottom: '9em',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    fontSize: '2em',
                    color: '#ff0',
                }}
                initial={{ opacity: 1 }}
                animate={lyricsChanged ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 3.5 }}
            >
                {lyrics[lyricsIndex]}
            </motion.h1>
        </motion.div>
    );
};

export default MyonLyrics;
