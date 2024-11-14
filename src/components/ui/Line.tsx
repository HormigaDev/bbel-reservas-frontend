import makeStyles from '@/utils/MakeStyles';

const Line: React.FC<{ className?: string }> = ({ className = '' }) => {
    return (
        <div
            style={{ height: '1px' }}
            className={makeStyles([className, 'mt-12 mb-8'])}
        ></div>
    );
};

export default Line;
