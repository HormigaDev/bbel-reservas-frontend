import makeStyles from '@/utils/MakeStyles';

interface ButtonProps {
    label: string;
    onClick?: () => void;
    disabled?: boolean;
    type?: string;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({
    label,
    onClick,
    disabled = false,
    type = 'primary',
    className = '',
}) => {
    return (
        <button
            className={makeStyles([
                'rounded-md p-2 transition-colors duration-300',
                {
                    condition: disabled,
                    onTrue: 'opacity-40',
                },
                {
                    condition: type === 'primary',
                    onTrue: 'bg-burgundy text-purewhite hover:bg-burgunlight',
                    onFalse: [
                        'bg-gold text-greydark',
                        'hover:bg-burgundy hover:text-purewhite',
                    ],
                },
                className,
            ])}
            onClick={onClick}
        >
            {label}
        </button>
    );
};

export default Button;
