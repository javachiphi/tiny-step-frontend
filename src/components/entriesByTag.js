import React, {useEffect, useState } from "react"; 
import EntryList from "./entryList";
import { Typography } from '@mui/joy';
import axios from "axios";
import { BACKEND_URL } from "../constants";
import MyTags from './myTags';
import { useAuthToken } from './useAuthToken';
import { useAuth0 } from '@auth0/auth0-react';


export default function EntriesByTag(){
    const jwtToken = useAuthToken();
    const [data, setData] = useState(null);
    const [dataChanged, setDataChanged] = useState(false);

    useEffect(() => {
        if (jwtToken) {
            // Now that the token is available, make the API call
            axios.get(`${BACKEND_URL}/entries/tagCount`, {
                headers: { Authorization: `Bearer ${jwtToken}` }
            })
            .then(response => {
                // setData(response.data);

                const received = response.data;
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
                
                // console.log("formatted", formattedData);
                setData(formattedData);
            })
            .catch(error => {
                console.error('Error fetching data', error);
            });
        }

        if(dataChanged === true){
            setDataChanged(false);
        }
    }, [jwtToken, dataChanged]); // Dependency on jwtToken

    if (!jwtToken) {
        return <div>Loading...</div>;
    }

    return(
        <div>
         {/* <Typography level="h2" color="neutral">My Tags</Typography>
         <MyTags jwtToken={jwtToken}/> */}
    

         <Typography level="h2" color="neutral">My Diary by Tags</Typography>
        {data && data.map((dataObject, index) => {
            const tagName = Object.keys(dataObject)[0];
            const tagId = dataObject[tagName].id; 
            const entries = dataObject[tagName].entries;


            return (
                <EntryList 
                    key={index} 
                    entries={entries} 
                    tagName={tagName} 
                    tagId={tagId}
                    setDataChanged={setDataChanged}
                />
            )
        }
        )}
        {/* </Box> */}
        </div>
    )
}


// <Typography level="h2">My Page</Typography>