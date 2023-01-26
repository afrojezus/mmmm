import styles from '@/styles/header.module.scss';
import { useRouter } from 'next/router';
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
    const router = useRouter();
    return (
        <>
            <header className={styles.header} {...props}>
                {children(router.pathname)}
            </header>
            <Suspense>
                <div className={styles.marqueeContainer}>
                    <div className={styles.scanlinesContainer}>
                        <Marquee
                            gradientWidth={800}
                            speed={99}
                            gradientColor={[0, 0, 0]}
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
