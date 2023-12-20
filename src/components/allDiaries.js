import React, {useState, useEffect} from "react";
import { fetchData } from "../api/apiService";
import EntryList from "./entryList";
import { useAuthToken } from "./useAuthToken";
import  FormattedDataProvider from "../context/entriesByTagProvider";


export default function AllDiaries() {
    const [entries, setEntries] = useState([]);
    const [dataChanged, setDataChanged] = useState(false);

    const jwtToken = useAuthToken();

    useEffect(() => {
        if(jwtToken){
            fetchData("entries", jwtToken)
            .then(data => {
                console.log(data)
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
            <h1>All Diaries</h1>
            <FormattedDataProvider>
            <EntryList 
                entries={entries} 
                setDataChanged={setDataChanged}
            />
            </FormattedDataProvider>
        </div>
    )
}