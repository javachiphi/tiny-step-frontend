import React, {useEffect, useState} from "react";
import { fetchData } from "../../api/apiService";
import { useAuthToken } from "../../components/useAuthToken";
import TableEntryList from "./entryTable";
import { Button, Sheet } from "@mui/joy";
import Add from '@mui/icons-material/Add';
import {Link } from "react-router-dom";

// onboarding page -> if user choose systemTags, then create the copy on userTags with tagType = 'mind'
// replace entryProvider with useGroupTags();
// create custom hooks for states s
    // const { entries, loading: entriesLoading } = useEntries(); 
    // add pagination ; remove diary page. use this as a default. 


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
            <Button 
            sx={{ float: 'right', margin: '10px', padding: '10px' }}
            component={Link} to="/create" startDecorator={<Add />}>Write</Button>
            <TableEntryList 
                data={entries} 
                setDataChanged={setDataChanged}
            />
            </Sheet>
        </div>
    )
}
