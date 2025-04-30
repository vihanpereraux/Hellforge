import React, { useEffect, useState } from 'react';
import Player from './Player';
import { ChannelDataProps } from '../interfaces/props';
import './tv-effect.css';

const Screen: React.FC = () => {
    const [data, setData] = useState<ChannelDataProps>();
    const [showEffect, setShowEffect] = useState(true);

    useEffect(() => {
        const fetchChannelDetails = () => {
            const data: ChannelDataProps = JSON.parse(localStorage.getItem('channel') as string);
            setData(data);
            setShowEffect(true);
            setTimeout(() => setShowEffect(false), 2800);
        };

        // Initial TV effect
        setShowEffect(true);
        setTimeout(() => setShowEffect(false), 1000);

        window.addEventListener('customStorage', fetchChannelDetails);
        return (() => {
            window.removeEventListener('customStorage', fetchChannelDetails);
        });
    }, []);

    return (
        <div className="tv-screen">
            {showEffect && <div className="tv-effect" />}

            {/* channel details */}
            <h2 style={{
                color: 'white',
                fontFamily: 'Rubik',
                fontWeight: '400',
                textAlign: 'center',
                fontSize: 20
            }}>
                {(data?.channelName)
                    ? `You're watching - ${data?.channelName}`
                    : 'Welcome to Homeless TV'
                }
            </h2>

            {/* stream / player */}
            <div>
                {data?.streamType === "stream" ? (
                    <Player
                        data={data as ChannelDataProps}
                        streamType="stream"
                    />
                ) : (
                    <Player
                        data={data as ChannelDataProps}
                        streamType="iframe"
                    />
                )}
            </div>

            {/*  */}
            <span style={{
                color: 'white',
                fontSize: '11px',
                opacity: 0.5,
                textAlign: 'center',
                display: 'block',
                paddingTop: '60px',
                paddingBottom: '20px',
                fontFamily: 'Rubik'
            }}>
                All media content available through this application is sourced from publicly available internet streams. We do not own, host, or distribute any of the content. All content remains the property of their respective owners.
            </span>
        </div>
    );
};

export default Screen;
