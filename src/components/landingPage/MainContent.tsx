import React from "react";
import Image from "next/image";

const MainContent: React.FC = () => {
    return (
        <div className="relative w-full h-28">
            <Image
                src="/file.svg"
                alt="Restaurant background"
                className="absolute top-0 left-0"
                width={10}
                height={10}
            />
        </div>
    );
};

export default MainContent;
