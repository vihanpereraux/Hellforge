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
import { TextField } from "@mui/material";

// props
import { ChannelDetailsProps } from "../interfaces/props";

// stylesheet 
import Styles from './side-selection.module.css';


const SideSelection: React.FC = () => {
    const [data, setData] = useState<ChannelDetailsProps[]>([]);
    const [originalData, setOriginalData] = useState<ChannelDetailsProps[]>([])

    const fetchChannelDetails = async () => {
        const querySnapshot = await getDocs(collection(db, "channels"));
        const items = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setData([...items as ChannelDetailsProps[]]);
        setOriginalData([...items as ChannelDetailsProps[]]);
    }

    const handleQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
        const keyWord = e.target.value.toLowerCase();
        const filteredContent = originalData.filter((item) => item.channelName.toLowerCase().includes(keyWord))
        setData([...filteredContent] as ChannelDetailsProps[]);
    }

    useEffect(() => { fetchChannelDetails(); }, [])

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
                    <img style={{
                        width: '22px',
                        height: '22px',
                        borderRadius: 5
                    }} src="/icon.png" alt="" />
                    <Typography
                        sx={{
                            color: 'white',
                            pl: '12px',
                            fontSize: 16,
                            fontWeight: 500,
                            fontFamily: 'Rubik'
                        }}
                        component="span">Homeless TV</Typography>
                </AccordionSummary>

                <AccordionDetails className={Styles._accordion_details}>
                    {/* fzf */}
                    <TextField
                        className={Styles.search}
                        sx={{
                            width: '105%',
                            mb: 3.5,
                            mt: .5,
                            border: 'none',
                            backgroundColor: 'rgb(15, 15, 15)',
                            fontFamily: 'Rubik'
                        }}
                        id="outlined-basic"
                        label="Search channels"
                        variant="outlined"
                        InputProps={{
                            style: { color: 'white', fontFamily: 'Rubik' }
                        }}
                        InputLabelProps={{
                            style: { color: 'white', fontSize: 14.5, fontFamily: 'Rubik' }
                        }}
                        onChange={handleQuery}
                    />

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
                                    background: 'rgb(8, 8, 8)',
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