import makeStyles from '@/utils/MakeStyles';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Button from './Button';

const Carousel: React.FC<{ children: React.ReactNode; className?: string }> = ({
    children,
    className = '',
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [prevAnimate, setPrevAnimate] = useState({
        index: 0,
        animating: false,
    });
    const [nextAnimate, setNextAnimate] = useState({
        index: 0,
        animating: false,
    });
    const slides = React.Children.toArray(children);

    const nexSlide = () => {
        setCurrentIndex((prevIndex) => {
            setPrevAnimate({ index: prevIndex, animating: true });
            return (prevIndex + 1) % slides.length;
        });
        setNextAnimate({
            index: currentIndex,
            animating: nextAnimate.animating,
        });
    };

    const handlePrevAnimation = () => {
        setPrevAnimate({ index: prevAnimate.index, animating: false });
        setNextAnimate((nAnimate) => {
            nAnimate.animating = true;
            return nAnimate;
        });
    };
    const handleNextAnimation = () => {
        setNextAnimate({ index: nextAnimate.index, animating: false });
    };

    useEffect(() => {
        const intervalId = setInterval(nexSlide, 5000);
        return () => clearInterval(intervalId);
    });

    return (
        <div
            className={makeStyles([
                'relative',
                'overflow-hidden',
                'pl-32 pr-32',
                className,
            ])}
        >
            <div className="flex justify-center items-center">
                <Button label="<" className="" />
                <Button label=">" />
                {slides.map((slide, key) => {
                    const isNext = nextAnimate.index === key;
                    const isPrev = prevAnimate.index === key;
                    const opacity = isNext ? 0 : 1;
                    const opacityTo = isNext ? 1 : 0;
                    const position = isNext ? '100%' : '0%';
                    const positionTo = isNext ? '0%' : '-100%';

                    console.log(isNext);

                    return (
                        <>
                            {((isNext && nextAnimate.animating) ||
                                (isPrev && prevAnimate.animating)) && (
                                <motion.div
                                    key={key}
                                    initial={{
                                        opacity,
                                        transform: `translateX(${position})`,
                                    }}
                                    animate={{
                                        opacity: opacityTo,
                                        transform: `translateX(${positionTo})`,
                                    }}
                                    transition={{ duration: 0.5 }}
                                    className={makeStyles([
                                        'h-64 max-w-xl',
                                        'relative',
                                    ])}
                                    onAnimationComplete={
                                        isNext
                                            ? handleNextAnimation
                                            : handlePrevAnimation
                                    }
                                >
                                    {slide}
                                </motion.div>
                            )}
                        </>
                    );
                })}
            </div>
        </div>
    );
};

export default Carousel;
