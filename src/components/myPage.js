import React from "react"; 
import EntryList from "./entryList";
import EntryForm from "./entryForm";
import { Box, Sheet, Typography, Textarea, Button } from '@mui/joy';

export default function MyPage(){
    return(
        <Sheet sx={{display: "flex", flexDirection: 'row', gap: "50px",alignItems: 'baseline', margin: "100px"}}>
        <EntryList />
        <EntryForm />
        </Sheet>
    )
}


// <Typography level="h2">My Page</Typography>