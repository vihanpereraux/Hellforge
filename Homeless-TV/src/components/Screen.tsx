import React, { useEffect, useState } from 'react';

// components
import Player from './Player';

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
                fontWeight: '450',
                textAlign: 'center',
                fontSize: 22
            }}>You're watching - {data?.channelName}</h2>

            {/* stream / player */}
            <div>
                {data?.streamType === "stream" ?
                    <Player
                        data={data as ChannelDataProps}
                        streamType="stream" />
                    :
                    <Player
                        data={data as ChannelDataProps}
                        streamType="iframe" />}
            </div>
        </div>
    );
};

export default Screen;
