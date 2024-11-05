import makeStyles from '@/utils/MakeStyles';

const AboutUs: React.FC = () => {
    return (
        <section className={makeStyles(['w-full', 'bg-greydark', 'pt-16'])}>
            <h2 className="text-3xl text-center">Sobre nosostros</h2>
            <p>
                <pre>{aboutText}</pre>
            </p>
        </section>
    );
};

export default AboutUs;
