import React, {useEffect, useState} from "react";
import { fetchData } from "../../api/apiService";
import { useAuthToken } from "../../components/useAuthToken";
import TableEntryList from "./entryTable";
import { Button, Sheet, Typography, Box, Chip } from "@mui/joy";
import Add from '@mui/icons-material/Add';
import {Link } from "react-router-dom";
import { MoreHoriz } from "@mui/icons-material";
import ToggleButton from "../../components/toggleButton";

export default function ReflectPage(){
    const [entries, setEntries] = useState([]); // useEntries
    const [ original, setOriginal ] = useState([]); // useAll entries
    const [dataChanged, setDataChanged] = useState(false);
    const jwtToken = useAuthToken();
    const [checked, setChecked] = useState(true);

    const unfinished = (entries) => {
        return entries.filter((entry) => 
        (entry.tags.length === 0) || (entry.solution === (null || '' || undefined))        
        )
    }

    useEffect(() => {
        if(jwtToken){
            fetchData("entries", jwtToken)
            .then(data => {
                setOriginal(data);
                const incomplete = unfinished(data);
                setEntries(incomplete)
            });
         }

        if(dataChanged === true){
            setDataChanged(false);
        }
    }, [jwtToken, dataChanged])

    const handleChecked = (event) => {
        console.log('event checked!', event.target.checked)
        setChecked(event.target.checked);
        if (event.target.checked === true) {
            setEntries(unfinished(original))
           
        } else {
            setEntries(original)
        }
      
    }


    if (!jwtToken) {
        return <div>Loading...</div>;
    }


    const label = checked === true ? 'Reflect to Complete' : 'View All';
    return(
        <Sheet color='primary' sx={{mt: "20px"}}>
            <Typography level="h1" sx={{color: "#4b5161", textAlign: "center" , fontWeight: 700}}>Reflect</Typography>
            {/* <h1 className="text-center">Reflect Page</h1> */}
                <HowToDescription />
                <div style={{display: "flex", flexDirection: "column", gap: "20px"}}>
                <div  style={{display: "flex", justifyContent: "flex-end", gap: "20px"}}>
                    <div style={{display: "flex", alignSelf: "flex-end", gap: "10px"}}>
                    <Typography sx={{ alignSelf: "center"}}> {label}</Typography>
                    <ToggleButton
                        checked={checked}
                        handleChecked={handleChecked}
                    />
                    </div>
                    <Button 
                        color='primary'
                        sx={{alignSelf: "flex-end"}}
                        component={Link} 
                        to="/create" 
                        startDecorator={<Add />}
                    >
                        Add
                    </Button>
                </div>
                <Box variant="outlined">
                    <div className="table-container">
                    <TableEntryList 
                        data={entries} 
                        setDataChanged={setDataChanged}
                    />
                    </div>
                </Box>
                </div>

            </Sheet>
    )
}


function HowToDescription(){
    return(
        <>
            <Typography sx={{fontWeight: 700}}>How To</Typography>
            <ol>
                <li>Add Solution and Awareness tags <Chip>Situation</Chip> <Chip>Mind</Chip></li>
                <li>View results in checklist page.</li>
            </ol>
        </>
    )
}


// step 1. Add Solution and Awareness tags (situation, mind). 