import React, {useEffect, useState} from "react";
import { fetchData } from "../../api/apiService";
import { useAuthToken } from "../../components/useAuthToken";
import TableEntryList from "./entryTable";
import { Button, Sheet, Typography } from "@mui/joy";
import Add from '@mui/icons-material/Add';
import {Link } from "react-router-dom";
import { MoreHoriz } from "@mui/icons-material";

export default function ReflectPage(){
    const [entries, setEntries] = useState([]); // useEntries
    const [dataChanged, setDataChanged] = useState(false);
    const jwtToken = useAuthToken();

    useEffect(() => {
        if(jwtToken){
            fetchData("entries", jwtToken)
            .then(data => {
                setEntries(data)
            });
         }

        if(dataChanged === true){
            setDataChanged(false);
        }
    }, [jwtToken, dataChanged])


    if (!jwtToken) {
        return <div>Loading...</div>;
    }
    
    return(
        <div>
            <h1 className="text-center">Reflect Page</h1>
            <Sheet>
            <Typography sx={{fontWeight: 700}}>How To</Typography>
            <ol>
                <li>Click on <MoreHoriz/> to revisit observation to detect a pattern such as natural tendency, bias, or mental space.</li>
                <li>Think about how you'd approach it differently next time when similar situation arises. </li>
                <li>Come up with a solution in 1 sentence. think clearly</li>
                <li>tag your mental tendency, approach and situation. </li>
            </ol>
            <Button 
            sx={{ float: 'right'}}
            component={Link} to="/create" startDecorator={<Add />}>Write</Button>
            <TableEntryList 
                data={entries} 
                setDataChanged={setDataChanged}
            />
            </Sheet>
        </div>
    )
}
