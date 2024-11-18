import Markdown from '@/components/ui/Markdown';
import makeStyles from '@/utils/MakeStyles';
import Image from 'next/image';

interface GridProps {
    data: { id: string; title: string }[];
}

const Grid: React.FC<GridProps> = ({ data = [] }) => {
    return (
        <div
            className={makeStyles([
                'w-full h-full grid grid-cols-3',
                'gap-4 gap-y-12 px-8',
                'overflow-auto',
                'max-h-screen',
                'pt-24 pb-4',
            ])}
        >
            {data.map((element, key) => (
                <div
                    key={key}
                    className={makeStyles([
                        'bg-marfil',
                        'hover:bg-purewhite',
                        'text-copper',
                        'transition-colors',
                        'duration-200',
                        'ease-in-out',
                        'w-full',
                        'h-full',
                        'rounded',
                        'p-4',
                        'relative',
                        'transition-transform',
                        'hover:translate-y-[-5%]',
                        'hover:z-[1]',
                    ])}
                >
                    <div className="relative w-full h-48">
                        <Image
                            src={`/images/${element.id}.jpg`}
                            alt={element.title}
                            fill
                            className="rounded"
                        />
                    </div>
                    <h3 className="text-center mt-4 text-lg font-bold mb-2">
                        {element.title}
                    </h3>
                    <Markdown
                        filepath={`menu/${element.id}`}
                        className="pb-2"
                    />
                </div>
            ))}
        </div>
    );
};

export default Grid;
