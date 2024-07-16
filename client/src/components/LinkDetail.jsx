import React from 'react';
import ArrowIcon from '../svg/ArrowIcon';

const LinkDetail = ({ className, image, name, enlace }) => {
    // Asegurarse de que el enlace sea absoluto
    const absoluteEnlace = enlace.startsWith('http://') || enlace.startsWith('https://') 
        ? enlace 
        : `https://${enlace}`;

    return (
        <div className={className}>
            <div className='flex items-center gap-4'>
                <figure>{image}</figure>
                <p>{name}</p>
            </div>
            <a href={absoluteEnlace} target='_blank' rel='noopener noreferrer'><ArrowIcon /></a>
        </div>
    );
};

export default LinkDetail;
