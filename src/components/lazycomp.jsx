import React, { useEffect, useState } from 'react';

const LazyLoader = () => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => setVisible(false), 3000); // 3 секунды
        return () => clearTimeout(timeout);
    }, []);

    if (!visible) return null;

    return (
        <div className="w-full h-[50vh] flex justify-center items-center">
            <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></div>
        </div>
    );
};

export default LazyLoader;
