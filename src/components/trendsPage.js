import React, {useEffect, useState } from "react"; 
import EntryList from "./entryList";
import { Typography } from '@mui/joy';
import axios from "axios";
import { BACKEND_URL } from "../constants";
import MyTags from './myTags';
import { useAuthToken } from './useAuthToken';
import { useAuth0 } from '@auth0/auth0-react';



/// need to send with JWT bearer token!! axios (get all by one users, tag count, create one )




export default function Trends(){
    // const [data, setData] = useState([]);
    // const jwtToken = useAuthToken();
   
    const jwtToken = useAuthToken();
    const [data, setData] = useState(null);

    console.log('jwtToke', jwtToken)

    useEffect(() => {
        if (jwtToken) {
            // Now that the token is available, make the API call
            axios.get(`${BACKEND_URL}/entries/tagCount`, {
                headers: { Authorization: `Bearer ${jwtToken}` }
            })
            .then(response => {
                // setData(response.data);

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
            .catch(error => {
                console.error('Error fetching data', error);
            });
        }
    }, [jwtToken]); // Dependency on jwtToken

    if (!jwtToken) {
        return <div>Loading...</div>;
    }

    return(
        <div>
         <Typography level="h2" color="neutral">Qualities I am working on</Typography>
         <MyTags />
    
        {data && data.map((dataObject, index) => {
            const tag = Object.keys(dataObject)[0];
            const entries = dataObject[tag].entries;

            return (
                <EntryList key={index} entries={entries} tag={tag} />
            )
        }
        )}
        {/* </Box> */}
        </div>
    )
}


// <Typography level="h2">My Page</Typography>