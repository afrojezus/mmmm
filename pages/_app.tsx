import Group from '@/components/Group';
import Header from '@/components/Header';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Link from 'next/link';
import Image from 'next/image';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Header>
                {(activeRoute) => (
                    <>
                        <Group gap={activeRoute === '/' ? 0 : 10}>
                            <Image
                                src="/mmmm.webp"
                                alt="mmmm"
                                width={28}
                                height={28}
                            />
                            <Link
                                className={
                                    activeRoute === '/' ? 'active' : undefined
                                }
                                href="/"
                            >
                                mmmm.moe
                            </Link>
                        </Group>
                        <Group>
                            <Link
                                className={
                                    activeRoute === '/myon'
                                        ? 'active'
                                        : undefined
                                }
                                href="/myon"
                            >
                                myon
                            </Link>
                            <Link
                                className={
                                    activeRoute === '/3d' ? 'active' : undefined
                                }
                                href="/3d"
                            >
                                3D
                            </Link>
                            <Link target="_blank" href="https://mmmmmm.moe/">
                                mmmmmm.moe
                            </Link>
                        </Group>
                    </>
                )}
            </Header>
            <Component {...pageProps} />
            <div className="scanlines" />
        </>
    );
}
