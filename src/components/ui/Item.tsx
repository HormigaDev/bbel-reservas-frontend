'use client';

import ColorInterface from '@/interfaces/ColorInterface';
import makeStyles from '@/utils/MakeStyles';

interface ItemProps extends ColorInterface {
    className?: string;
    children?: React.ReactNode;
    onClick?: () => void;
}

const Item: React.FC<ItemProps> = ({
    className = '',
    children,
    color = 'greygrey',
    onClick = () => {},
}) => {
    return (
        <div
            className={makeStyles([
                className,
                'text-center p-4',
                `hover:bg-${color}light`,
                `hover:text-purewhite`,
                'transition-colors',
                'duration-300',
                'ease',
                'bg-transparent',
                'cursor-pointer',
                'select-none',
            ])}
            draggable={false}
            onClick={onClick}
        >
            {children}
        </div>
    );
};

export default Item;
