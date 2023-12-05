import React, {useEffect, useState } from "react"; 
import EntryList from "./entryList";
import EntryForm from "./entryForm";
import { Box, Sheet, Typography, Textarea, Button } from '@mui/joy';
import axios from "axios";
import { BACKEND_URL } from "../constants";
import { Link } from "react-router-dom";

export default function MyPage(){

    ///display the quality and associated diary entry underneath 
    // show how many times it has occured. 
    // situations in which these quality  appear. 
    // solutions that you have thought about them. 
    // avoid conflict 
    // situation                             what to do 
    // dec. 18: when coding                  focus on main thing. 
    // dec.15 : when talking to xyz 
    // dec. 12 : when  

    const [data, setData] = useState([]);

   useEffect(() => {
    axios.get(`${BACKEND_URL}/users/1/entries/tagCount`)
    .then((response) => {
        const received = response.data;
        console.log(received);
        let formatted = {}; 

        received.forEach(item => {
            const note = item.note;
            const entry = item.entries; 

            if(!formatted[note]){
                formatted[note] = {
                    id: item.id,
                    count: 0,
                    entries:[]
                };
            }

            formatted[note].entries.push(entry);
            formatted[note].count += 1; 
        })

        const formattedData = Object.keys(formatted).map(note => {
            return { [note]: formatted[note] }
        })
        
        console.log("formatted", formattedData);
        setData(formattedData);
    })
   }, [])

    return(
        <div>
        <Box sx={{display: "flex", flexDirection: 'row', gap: "50px",alignItems: 'baseline', margin: "100px"}}>        
        <Typography level="h2" color="neutral">Awareness strikes</Typography>

        {data.map((dataObject, index) => {
            const tag = Object.keys(dataObject)[0];
            const entries = dataObject[tag].entries;

            return (
                <EntryList key={index} entries={entries} tag={tag} />
            )
        }
        )}
        </Box>
        </div>
    )
}


// <Typography level="h2">My Page</Typography>