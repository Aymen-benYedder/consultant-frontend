import React from 'react';
import logoPath from '../../medi/logo.png';

const LogoBrand = () => {
    return (
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
            <div
                className="w-[60px] h-[60px] bg-cover"
                style={{ backgroundImage: `url(${logoPath})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }}
            ></div>
            <h1 className="text-xl font-bold text-[#d6b884] md:mt-0">Lavocato</h1>
        </div>
    );
};

export default LogoBrand;
