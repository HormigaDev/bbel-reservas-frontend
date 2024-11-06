import makeStyles from '@/utils/MakeStyles';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from './Button';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';

const Carousel: React.FC<{ children: React.ReactNode; className?: string }> = ({
    children,
    className = '',
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [prevAnimate, setPrevAnimate] = useState(0);
    const [nextAnimate, setNextAnimate] = useState(0);
    const [direction, setDirection] = useState('left');
    const slides = React.Children.toArray(children);

    const nexSlide = (direction: string) => {
        setPrevAnimate(currentIndex);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
        setNextAnimate((currentIndex + 1) % slides.length);
        setDirection(direction);
    };

    return (
        <div
            className={makeStyles([
                'relative',
                'overflow-hidden',
                'pl-32 pr-32',
                className,
            ])}
        >
            <Button
                className="float-left mt-16 z-[100]"
                onClick={() => nexSlide('right')}
            >
                <FaAngleLeft />
            </Button>
            <Button
                className="float-right mt-16 z-[100]"
                onClick={() => nexSlide('left')}
            >
                <FaAngleRight />
            </Button>
            <div className="flex justify-center items-center">
                {slides.map((slide, key) => {
                    const isNext = nextAnimate === key;
                    const isPrev = prevAnimate === key;
                    const transformTo = direction === 'right' ? '50%' : '-100%';
                    const transformFrom =
                        direction === 'right' ? '-100%' : '50%';

                    return (
                        <React.Fragment key={key}>
                            {isPrev && (
                                <motion.div
                                    initial={{
                                        opacity: 1,
                                        transform: 'translateX(-50%)',
                                    }}
                                    animate={{
                                        opacity: 0,
                                        transform: `translateX(${transformTo})`,
                                        zIndex: -1,
                                    }}
                                    className="absolute h-64 max-w-xl left-[50%] top-0"
                                >
                                    {slide}
                                </motion.div>
                            )}
                            {isNext && (
                                <motion.div
                                    initial={{
                                        opacity: 0,
                                        transform: `translateX(${transformFrom})`,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        transform: 'translateX(-50%)',
                                    }}
                                    className="absolute h-64 max-w-xl left-[50%] top-0"
                                >
                                    {slide}
                                </motion.div>
                            )}
                        </React.Fragment>
                    );
                })}
            </div>
        </div>
    );
};

export default Carousel;
