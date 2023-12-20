import React, {useEffect, useState } from "react"; 
import EntryList from "./entryList";
import { Typography } from '@mui/joy';
import { useAuthToken } from './useAuthToken';

import { useEntriesByTagData } from '../context/entriesByTagProvider';

export default function EntriesByTag({tagType}){
    const jwtToken = useAuthToken();
    const [data, setData] = useState(null);
    const  contextValue = useEntriesByTagData()
    const { formattedData, dataChanged, setDataChanged } = contextValue; 

    useEffect(() => {
        console.log('formattedData available?', formattedData)
        if(formattedData){
            setData(formattedData)
        }

        if(dataChanged === true){
            setDataChanged(false);
        }
    }, [formattedData, dataChanged]);

    if (!jwtToken) {
        return <div>Loading...</div>;
    }
    return(
        <div>
        {tagType && 
             <Typography level="h2" color="neutral">{tagType}</Typography>
        }
         {data &&
            data.map((dataObject, index) => {
                const tagName = Object.keys(dataObject)[0];
                const tagId = dataObject[tagName].id;
                const tagDataType = dataObject[tagName].type;
                const entries = dataObject[tagName].entries;

                if (tagDataType === tagType) {
                const tagGrouping = {label: tagName, id: tagId}

                return (
                    <div  key={index}>
                        <Typography level="h3" fontWeight="lg">
                            {tagName}
                        </Typography>
                        <EntryList
                            entries={entries}
                            tagValue={tagGrouping} // initial tag dropdown value for entries 
                            setDataChanged={setDataChanged}
                        />
                    </div>
                );
                }
                return null;
            })}
        </div>
    )
}


