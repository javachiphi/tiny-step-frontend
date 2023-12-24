import React, {useEffect, useState } from "react"; 
import EntryList from "./entryList";
import { Typography } from '@mui/joy';
import { Tabs, TabPanel, TabList, Tab } from '@mui/joy';
import useGroupTags from "../api/useGroupTags";


export default function GroupedEntries({tagType}){
    const [data, setData] = useState(null);
    const { groupTags, refreshGroupTags, loading: groupTagsloading } = useGroupTags();
    const [dataChanged, setDataChanged] = useState(false);
    

    useEffect(() => {
        if(groupTagsloading === false && groupTags.length > 0){
            const filtered = groupTags.filter((item) => item.type === tagType)
            setData(filtered)
        }

        if(dataChanged === true){
            refreshGroupTags();
            setDataChanged(false);
        }
    }, [groupTags, dataChanged]);

    if (groupTagsloading) {
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
                <TabList>
                    {data && data.map((item, index) => {
                        return (<Tab key={index}>{item.note} {item.count}</Tab>)
                    })}
                </TabList>
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




