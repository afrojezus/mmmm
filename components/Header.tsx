'use client';
import styles from '@/styles/header.module.scss';
import { usePathname } from 'next/navigation';
import { Suspense } from 'react';
import Marquee from 'react-fast-marquee';
import SimpleMmmCube from './SimpleMmmCube';

const PotentiallyHeavyAndDangerousComponent = () => {
    return (
        <div className={styles.cube}>
            <SimpleMmmCube />
        </div>
    );
};

type HeaderProps = {
    children: (activeRoute: string) => JSX.Element;
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>;
const Header = ({ children, ...props }: HeaderProps) => {
    const pathname = usePathname();
    return (
        <>
            <header className={styles.header} {...props}>
                {children(pathname)}
            </header>
            <Suspense>
                <div className={styles.marqueeContainer}>
                    <div className={styles.scanlinesContainer}>
                        <Marquee
                            gradientWidth={800}
                            speed={99}
                            gradientColor={'#00000000'}
                        >
                            <PotentiallyHeavyAndDangerousComponent />
                        </Marquee>
                        <div className={styles.scanlines} />
                    </div>
                </div>
            </Suspense>
        </>
    );
};

export default Header;
