import makeStyles from '@/utils/MakeStyles';
import React from 'react';
import Button from '../global/Button';

const MainContent: React.FC = () => {
    return (
        <section className="relative pl-48 pr-48 pt-12 pb-12 h-screen">
            <div
                className={makeStyles([
                    'bg-greydark',
                    'opacity-80',
                    'absolute top-0 left-0 z-[-1]',
                    'w-full h-full rounded',
                ])}
            ></div>
            <h1 className="text-4xl text-center mt-48">
                Bienvenido a BBEL Reserved
            </h1>
            <h3 className="text-center mt-8">Reserva una experiencia única</h3>
            <div className="w-full mt-4 flex justify-center items-center">
                <Button label="Reservar ahora" />
            </div>
        </section>
    );
};

export default MainContent;
