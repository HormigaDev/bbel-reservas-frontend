import React from 'react';
import ColorInterface from '@/interfaces/ColorInterface';
import makeStyles from '@/utils/MakeStyles';

interface MessageProps extends ColorInterface {
    message?: string;
    className?: string;
}

const Message: React.FC<MessageProps> = ({
    color = 'burgundy',
    message = '',
    className = '',
}) => {
    const styles = makeStyles([
        'border',
        'rounded',
        `border-${color}light`,
        'text-center',
        'w-[80%]',
        'm-auto',
        'py-4',
        'px-6',
        `text-${color}`,
        'break-words',
        className,
    ]);

    return (
        <React.Fragment>
            {message.length > 0 && (
                <div className={styles}>
                    <p className="font-bold">{message}</p>
                </div>
            )}
        </React.Fragment>
    );
};

export default Message;
