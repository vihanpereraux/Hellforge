import React, { useEffect, useState } from 'react';

// MUI
import { Box, Typography } from '@mui/material';

// components
import Player from './Player';

// props
import { ChannelDataProps } from '../interfaces/props';

// stylesheet
import './tv-effect.css';

const Screen: React.FC = () => {
    const [data, setData] = useState<ChannelDataProps>();
    const [showEffect, setShowEffect] = useState(true);

    useEffect(() => {
        const fetchChannelDetails = () => {
            const data: ChannelDataProps = JSON.parse(localStorage.getItem('channel') as string);
            setData(data);
            setShowEffect(true);
            setTimeout(() => setShowEffect(false), 3000);
        };

        // channel transition effect
        setShowEffect(true);
        setTimeout(() => setShowEffect(false), 1500);

        window.addEventListener('customStorage', fetchChannelDetails);
        return (() => {
            window.removeEventListener('customStorage', fetchChannelDetails);
        });
    }, []);

    return (
        <Box className="tv-screen">
            {showEffect && <div className="tv-effect" />}

            {/* channel details */}
            <Typography sx={{
                color: 'white',
                fontFamily: 'Rubik',
                fontWeight: '400',
                textAlign: 'center',
                fontSize: 17,
                marginTop: 3
            }}>
                {(data?.channelName)
                    ? `You are watching - ${data?.channelName}`
                    : 'Welcome to Homeless TV'
                }
            </Typography>

            {/* stream / player */}
            <Player data={data as ChannelDataProps} />

            {/* footer disclaimer */}
            <Box>
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
                    All media content available through this application is sourced from
                    publicly available internet streams. We do not own, host, or distribute
                    any of the content. All content remains the property of their respective owners.
                </span>
            </Box>
        </Box>
    );
};

export default Screen;
