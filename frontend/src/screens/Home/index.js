import React, { useEffect } from 'react';

const Home = () => {
    useEffect(() => {
        document.title = 'Home | Foody';
    }, []);

    return (
        <div>
            <h1 className='text-center'><span className="text-primary">Foody</span> Welcomes You... 🙏</h1>
        </div>
    );
};

export default Home;