import React, { useRef, useState } from "react";

// MUI
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Typography } from "@mui/material";

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
    const [addRemovalNote, setAddRemovalNote] = useState<boolean>(
        JSON.parse(localStorage.getItem('addRemovalNote') as string)
    );

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
        console.log(event);
    };

    const ref = useRef<HTMLSpanElement>(null);

    const handleAddRemovalNote = () => {
        localStorage.setItem('addRemovalNote', "false");
        setAddRemovalNote(false);
        if (ref) {
            if (ref.current) {
                ref.current.style.display = 'none';
            }
        }
    }

    return (
        <>
            <Box sx={{ width: '100%' }}>
                <Box sx={{
                    mt: 5,
                    display: 'flex',
                    justifyContent: 'center',
                }}>
                    <Tabs value={value}
                        onChange={handleChange}
                        aria-label="basic tabs example">
                        {data && data.channelURL.map((link, index) => (
                            <Tab key={index}
                                sx={{
                                    color: 'white',
                                    textTransform: 'capitalize',
                                    textDecoration: 'none',
                                    fontFamily: 'Rubik',
                                    fontWeight: '400',
                                    fontSize: 13,
                                    ml: .5,
                                    mr: .5
                                }}
                                label={link.slice(-3) == 'php' ?
                                    `IPTV Provider ${index < 10 && `0`}${index + 1} (Ad)` :
                                    (`IPTV Provider ${index < 10 && `0`}${index + 1} (Ad Free)` + ' ᯤ')}
                                {...a11yProps(index)} />
                        ))}
                    </Tabs>
                </Box>
                {data && data.channelURL.map((link, index) => (
                    <CustomTabPanel value={value} index={index} key={index}>
                        {link.slice(-3) == 'php' ? (
                            <>
                                {/* add removal notice */}
                                {addRemovalNote && (
                                    <Typography sx={{
                                        color: 'white',
                                        fontSize: 12,
                                        textAlign: 'center',
                                        mt: 1.5,
                                        mb: 2
                                    }}>This stream may have ads, to remove all ads use this &nbsp;
                                        <a style={{
                                            textDecoration: 'underline',
                                            color: 'rgb(143, 120, 255)',
                                            marginRight: 12,
                                        }} href="https://ublockorigin.com/" target="_blank">browser extension</a>

                                        {/* hide icon */}
                                        [ <span ref={ref}
                                            style={{
                                                textDecoration: 'underline',
                                                cursor: 'pointer'
                                            }} onClick={() => { handleAddRemovalNote() }}>Hide</span> ]
                                    </Typography>
                                )}

                                {/* player */}
                                <Box sx={{
                                    width: '99%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    mt: 1
                                }}>
                                    <iframe
                                        allowFullScreen={true}
                                        style={{
                                            width: 'calc(1080px / .8)',
                                            aspectRatio: 16 / 9,
                                            border: '1px solid rgba(139, 102, 250, 0.15)',
                                            borderRadius: 6
                                        }} src={link}></iframe>
                                </Box>
                            </>
                        ) : (
                            <Box sx={{
                                width: '98.25%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mt: 1
                            }}>
                                <ReactPlayer
                                    style={{
                                        aspectRatio: 16 / 9,
                                        border: '1px solid rgba(139, 102, 250, 0.15)',
                                        borderRadius: 6,
                                    }}
                                    height={'40vw'}
                                    width={'70vw'}
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