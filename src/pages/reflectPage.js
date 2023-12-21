import React, {useEffect, useState} from "react";
import { fetchData } from "../api/apiService";
import { useAuthToken } from "../components/useAuthToken";
import TableEntryList from "../components/entryTable";

export default function ReflectPage(){
    const [entries, setEntries] = useState([]);
    const [dataChanged, setDataChanged] = useState(false);

    const jwtToken = useAuthToken();

    useEffect(() => {
        console.log('use effect triggered after data changed?')
        if(jwtToken){
            fetchData("entries", jwtToken)
            .then(data => {
                
                const unfinished = data.filter(
                    (entry) => (
                        (entry.obeservation === (null || '')) 
                        || (entry.solution === (null|| ''))
                        // || (entry.tags.length === 0)
                        ))
                 
                setEntries(unfinished)
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

            <h1>Reflect Page</h1>
            <TableEntryList data={entries} setDataChanged={setDataChanged}/>
        </div>
    )
}


