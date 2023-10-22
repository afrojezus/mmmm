'use client';

import Image from 'next/image';
import Group from './Group';
import Header from './Header';
import Link from 'next/link';

type RootHeaderProps = {};

const RootHeader = (props: RootHeaderProps) => {
    return (
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
                                activeRoute === '/uuuu' ? 'active' : undefined
                            }
                            href="/uuuu"
                        >
                            uuuu (new!)
                        </Link>
                        <Link
                            className={
                                activeRoute === '/myon' ? 'active' : undefined
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
                    </Group>
                </>
            )}
        </Header>
    );
};

export default RootHeader;
