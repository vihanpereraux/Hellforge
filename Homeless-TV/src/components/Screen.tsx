import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';

const Screen: React.FC = () => {
    const [value, setValue] = useState<string>(localStorage.getItem('item') as string);

    useEffect(() => {
        const handler = () => {
            const newValue = localStorage.getItem('item') as string;
            setValue(newValue);
            console.log(`New value is ${newValue}`)
        };

        window.addEventListener('customStorage', handler)

        return (() => {
            window.removeEventListener('customStorage', handler)
        })
    }, []);

    return (
        <div>
            {/* channel details */}
            {/* add the channel name here */}

            <ReactPlayer
                height={720 / 1.2}
                width={1080 / 1.2}
                // style={{ border: '1px solid red' }}
                url={value}
                playing={true}
                controls
                muted={false}
            />
        </div>
    );
};

export default Screen;
