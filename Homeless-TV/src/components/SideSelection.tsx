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

    const emitStorageEvent = (item: string, value: string) => {
        localStorage.setItem(item, value)

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
                        sx={{ color: 'white' }}
                        component="span">Channels</Typography>
                </AccordionSummary>

                <AccordionDetails>
                    {channelData.map((data, index) => (
                        <div key={index}>
                            <Button
                                onClick={() => {
                                    emitStorageEvent('item', `${data._channel_url}`);
                                }}>
                                {data._channel_name}</Button>
                        </div>
                    ))}
                </AccordionDetails>
            </Accordion>
        </>
    )
}

export default SideSelection;