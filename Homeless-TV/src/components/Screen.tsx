import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';

// interfaces
import { ChannelDataProps } from '../interfaces/props';

const Screen: React.FC = () => {
    const [data, setData] = useState<ChannelDataProps>();

    useEffect(() => {
        const fetchChannelDetails = () => {
            const data: ChannelDataProps = JSON.parse(localStorage.getItem('channel') as string);
            setData(data);
            console.log(data.channelURL)
        };
        window.addEventListener('customStorage', fetchChannelDetails)
        return (() => {
            window.removeEventListener('customStorage', fetchChannelDetails)
        })
    }, []);

    return (
        <div>
            {/* channel details */}
            <h2 style={{
                color: 'white',
                fontFamily: 'Rubik',
                fontWeight: '450'
            }}>{data?.channelName}</h2>

            {/* stream / player */}
            <div>
                {data?.streamType === "stream" ? (
                    <ReactPlayer
                        style={{
                            borderRadius: '12px',
                        }}
                        height={720 / 1.2}
                        width={1080 / 1.2}
                        url={data?.channelURL}
                        playing={true}
                        controls
                        muted={false}
                    />
                ) : (
                    <div>
                        <iframe
                            allowFullScreen={true}
                            style={{
                                height: 'calc(720px / 1.2)',
                                width: 'calc(1080px / 1.2)',
                                border: 'none',
                                borderRadius: '12px'
                            }} src={data?.channelURL}></iframe>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Screen;
