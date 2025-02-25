import React, { useEffect, useState } from "react";

// MUI components
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button } from "@mui/material";

// props
import { ChannelDataProps } from "../interfaces/props";

// stylesheet 
import Styles from './SideSelection.module.css';

const SideSelection: React.FC = () => {
    const [channelData, setChannelData] = useState<ChannelDataProps[]>([]);

    // fetching data from local json
    useEffect(() => {

        const fetchChannelDetails = async () => {
            const response = await fetch('/data/channels.json');
            const data: ChannelDataProps[] = await response.json();
            console.log(data);

            setChannelData(data)
        }

        fetchChannelDetails();

    }, [])

    const emitStorageEvent = (channelName: string, channelURL: string, streamType: string) => {
        const channelDetails = {
            channelName: channelName,
            channelURL: channelURL,
            streamType: streamType,
        }
        localStorage.setItem('channel', JSON.stringify(channelDetails));
        window.dispatchEvent(new Event("customStorage"))
    }

    return (
        <>
            <Accordion defaultExpanded className={Styles._accordian}>
                <AccordionSummary
                    className={Styles._accordian_heading}
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    <Typography
                        sx={{ color: 'white', pl: '12px' }}
                        component="span">Homeless TV</Typography>
                </AccordionSummary>

                <AccordionDetails>
                    {channelData.map((data, index) => (
                        <div key={index}>
                            <div
                                style={{
                                    textDecoration: 'none',
                                    color: 'white',
                                    fontFamily: 'Rubik',
                                    fontWeight: '400',
                                    // border: '1px solid red',
                                    width: '100%',
                                    height: 55,
                                    display: 'flex',
                                    alignItems: 'center',
                                    marginBottom: 10,
                                    paddingLeft: 12,
                                    background: 'rgb(25, 25, 25)',
                                    fontSize: 16,
                                    borderRadius: 8,
                                    cursor: 'pointer'
                                }}
                                onClick={() => {
                                    emitStorageEvent(`${data.channelName}`, `${data.channelURL}`, `${data.streamType}`)
                                }}>
                                {data.channelName}</div>
                        </div>
                    ))}
                </AccordionDetails>
            </Accordion>
        </>
    )
}

export default SideSelection;