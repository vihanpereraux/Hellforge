import React from "react";

// MUI components
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button } from "@mui/material";

// stylesheet 
import Styles from './SideSelection.module.css';

const SideSelection: React.FC = () => {
    const emitStorageEvent = (item: string, value: string) => {
        localStorage.setItem(item, value)
    
        window.dispatchEvent(new Event("customStorage"))
    }
    
    return (
        <>
            <Accordion className={Styles._accordian}>
                <AccordionSummary
                    className={Styles._accordian_heading}
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    <Typography component="span">Channels</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Button onClick={() => {
                        emitStorageEvent('item', "B1clicked");
                    }}>Test Channel 01</Button>

                    <Button onClick={() => {
                        emitStorageEvent('item', "B2clicked");
                    }}>Test Channel 02</Button>
                    
                    <Button>Test Channel 03</Button>
                    <Button>Test Channel 04</Button>
                    <Button>Test Channel 05</Button>
                </AccordionDetails>
            </Accordion>
        </>
    )
}

export default SideSelection;