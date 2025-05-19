import React from "react";

// MUI
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

// components
import ReactPlayer from 'react-player';

// props
import { PlayerProps } from "../interfaces/props";
interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

// tab function
function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}
// tab function
function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const Player: React.FC<PlayerProps> = ({ data }) => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
        console.log(event);
    };

    return (
        <>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        {data && data.channelURL.map((link, index) => (
                            <Tab key={index}
                                sx={{
                                    color: 'white',
                                    textTransform: 'capitalize'
                                }}
                                label={link.slice(-3) == 'php' ?
                                    `IPTV Provider ${index < 10 && `0`}${index + 1} (Ads)` :
                                    `IPTV Provider ${index < 10 && `0`}${index + 1} (Ads Free) ᯤ`}
                                {...a11yProps(index)} />
                        ))}
                    </Tabs>
                </Box>
                {data && data.channelURL.map((link, index) => (
                    <CustomTabPanel value={value} index={index} key={index}>
                        {link.slice(-3) == 'php' ? (
                            <Box sx={{
                                width: '99%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <iframe
                                    allowFullScreen={true}
                                    style={{
                                        height: 'calc(720px / .8)',
                                        width: 'calc(1080px / .8)',
                                        border: 'none',
                                        borderRadius: '12px'
                                    }} src={link}></iframe>
                            </Box>
                        ) : (
                            <Box sx={{
                                width: '98.25%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <ReactPlayer
                                    height={720 / .8}
                                    width={1080 / .8}
                                    url={link}
                                    playing={true}
                                    controls
                                    muted={true}
                                />
                            </Box>
                        )}
                    </CustomTabPanel>
                ))}
            </Box>
        </>
    )
}

export default Player;