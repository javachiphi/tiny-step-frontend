import React, {useEffect, useState } from "react"; 
import EntryList from "./entryList";
import { Tabs, TabPanel, TabList, Tab } from '@mui/joy';
import useGroupTags from "../../api/useGroupTags";
import TagDetails from "./tagDetails";

const styledTab = {
    '&.Mui-selected, &&:hover': {
      backgroundColor: "#F4E6D4", 
    }
  };


export default function GroupedEntries({tagType}){
    const [data, setData] = useState(null);
    const { groupTags, refreshGroupTags, loading: groupTagsloading } = useGroupTags();
    const [dataChanged, setDataChanged] = useState(false);
    const [selectedTabIndex, setSelectedTabIndex] = useState(0);
    

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

    const handleTabChange = (event, newValue) => {
        setSelectedTabIndex(newValue);
    };

    if (groupTagsloading) {
        return <div>Loading...</div>;
    }
    return(
        <div>
            <Tabs 
                color="primary"
                value={selectedTabIndex}
                onChange={handleTabChange}
                aria-label="Vertical tabs"
                orientation="vertical"
            >
                <TabList>
                    {data && data.map((item, index) => {
                        return (<Tab sx={styledTab} key={index}>{item.note} {item.count}</Tab>)
                    })}
                </TabList>
                {data &&
                    data.map((tag, index) => {
                        const tagDataType = tag.type;
                        if (tagDataType === tagType) {
                        return (
                            <TabPanel key={index} value={index}>
                                <TagDetails 
                                    tag={tag} 
                                    tagType={tagType}
                                    setDataChanged={setDataChanged}
                                />
                                <EntryList
                                    entries={tag.entries}
                                    tagType={tagType}
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



