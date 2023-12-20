import React, {useEffect, useState } from "react"; 
import EntryList from "./entryList";
import { Typography } from '@mui/joy';
import { useAuthToken } from './useAuthToken';
import {TabTitle} from './verticalTabs';
import { Tabs, TabPanel } from '@mui/joy';


import { useEntriesByTagData } from '../context/entriesByTagProvider';

export default function EntriesByTag({tagType}){
    const jwtToken = useAuthToken();
    const [data, setData] = useState(null);
    const  contextValue = useEntriesByTagData()
    const { formattedData, dataChanged, setDataChanged } = contextValue; 

    useEffect(() => {
        if(formattedData){
            const filteredData = formattedData.filter((item) => item.type === tagType)
            console.log('filteredData', filteredData)
            setData(filteredData)
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
            <Tabs 
                aria-label="Vertical tabs"
                orientation="vertical"
                sx={{ minWidth: 300, height: 160 }}
            >
                {data && 
                    <TabTitle data={data}/>
                }
                {data &&
                    data.map((tag, index) => {
                        const tagDataType = tag.type;
                        if (tagDataType === tagType) {
                        const tagGrouping = {label: tag.label, id: tag.id}

                        return (
                            <TabPanel key={index} value={index}>
                                <Typography level="h3" fontWeight="lg">
                                    {tag.label}
                                </Typography>
                                <EntryList
                                    entries={tag.entries}
                                    tagValue={tagGrouping} // initial tag dropdown value for entries 
                                    setDataChanged={setDataChanged}
                                />
                            </TabPanel>
                        );
                        }
                        return null;
                    })}
            </Tabs>
        </div>
    )
}




