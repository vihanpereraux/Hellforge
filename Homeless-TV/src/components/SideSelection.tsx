import React, { useEffect, useState } from "react";

// firebase
import { collection, getDocs } from 'firebase/firestore';
import { getFirebaseConnection } from '../services/Firebase';
const db = getFirebaseConnection();

// MUI components
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// props
import { ChannelDataProps } from "../interfaces/props";
import { ChannelDetailsProps } from "../interfaces/props";

// stylesheet 
import Styles from './SideSelection.module.css';


const SideSelection: React.FC = () => {
    const [channelData, setChannelData] = useState<ChannelDataProps[]>([]);
    const [data, setData] = useState<ChannelDetailsProps[]>([]);

    const fetchChannelDetails = async () => {
        const querySnapshot = await getDocs(collection(db, "channels"));
        const items = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setData([...items as ChannelDetailsProps[]]);
        console.log(items);
    }

    // fetching data from local json
    const fetchLocalChannelDetails = async () => {
        const response = await fetch('/data/channels.json');
        const data: ChannelDataProps[] = await response.json();
        setChannelData(data)
    }

    useEffect(() => {
        fetchChannelDetails();
        fetchLocalChannelDetails();
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
                        sx={{
                            color: 'white',
                            pl: '12px',
                            fontSize: 18,
                            fontWeight: 450,
                            fontFamily: 'Rubik'
                        }}
                        component="span">Homeless TV</Typography>
                </AccordionSummary>

                <AccordionDetails className={Styles._accordion_details}>
                    {data.map((data, index) => (
                        <div key={index}>
                            <div
                                style={{
                                    textDecoration: 'none',
                                    color: 'white',
                                    fontFamily: 'Rubik',
                                    fontWeight: '400',
                                    width: '100%',
                                    height: 55,
                                    display: 'flex',
                                    alignItems: 'center',
                                    marginBottom: 10,
                                    paddingLeft: 12,
                                    background: 'rgb(25, 25, 25)',
                                    fontSize: 15,
                                    borderRadius: 8,
                                    cursor: 'pointer'
                                }}
                                onClick={() => {
                                    emitStorageEvent(`${data.channelName}`, `${data.channelURL}`, `${data.streamType}`)
                                }}>
                                <img style={{
                                    width: '26px',
                                    aspectRatio: '16/9',
                                    objectFit: 'cover',
                                    borderRadius: 4,
                                    marginRight: 13
                                }} src={data.channelLogo} alt="" />
                                {data.channelName}</div>
                        </div>
                    ))}
                </AccordionDetails>
            </Accordion>
        </>
    )
}

export default SideSelection;