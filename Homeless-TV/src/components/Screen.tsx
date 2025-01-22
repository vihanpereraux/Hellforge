import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';

const streamUrl: string = "https://linear417-gb-hls1-prd-ak.cdn.skycdp.com/100e/Content/HLS_001_1080_30/Live/channel(skynews)/03_1080-30.m3u8"; // HLS stream URL
const streamUrl2: string = "https://s6.hopslan.com/sat1x1/tracks-v1a1/mono.m3u8?token=c85e23dd534c16f0c3c357e3daf31ec09efe13fe-36f0e77d4c4afa03583fbb097555072a-1737461667-1737450867"

const Screen: React.FC = () => {
    const [value, setValue] =
        useState<string | null>(localStorage.getItem('item'));

    useEffect(() => {
        const handler = () => {
            const newValue = localStorage.getItem('item');
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
            <p>Value from the other components is {value}</p>

            <ReactPlayer
                height={720 / 1.2}
                width={1080 / 1.2}
                style={{
                    border: '1px solid red',
                }}
                url={streamUrl2}
                playing={false}
                controls
                muted={false}
            />
        </div>
    );
};

export default Screen;
