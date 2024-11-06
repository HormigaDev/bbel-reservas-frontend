const Line: React.FC<{ className?: string }> = ({ className = '' }) => {
    return <div style={{ height: '1px' }} className={className}></div>;
};

export default Line;
