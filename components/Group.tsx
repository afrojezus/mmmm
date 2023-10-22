import styles from '@/styles/group.module.scss';
import clsx from 'clsx';

type GroupProps = {
    position?: 'left' | 'center' | 'right' | 'apart';
    gap?: number;
} & React.HTMLAttributes<HTMLDivElement>;
const Group = ({
    position = 'left',
    gap = 10,
    children,
    ...props
}: GroupProps) => {
    return (
        <div
            className={clsx(styles.group, styles[position])}
            style={{
                gap,
            }}
            {...props}
        >
            {children}
        </div>
    );
};

export default Group;
