import React, { useState, useEffect } from "react"; 
import { IconButton, Typography, Card, Chip } from '@mui/joy';
import TagForm from "../tagForm";
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteIconButton from "../DeleteIconButton";
import { deleteData } from "../../api/apiService";
import { useAuthToken } from "../useAuthToken";
import { fetchData } from "../../api/apiService";

export default function TagDetails({tag,tagType, setDataChanged}){
    const [editing, setEditing] = useState(false); 
    const [assocEntryTags, setAssocEntryTags] = useState([]); // 
    const jwtToken = useAuthToken();


    //http://localhost:3001/tags/102/assocEntryTagsCount
    useEffect(() => {
        if(!jwtToken) return;

        fetchData(`tags/${tag.id}/assocEntryTagsCount`, jwtToken)
        .then((data) => {
            console.log('response', data)
            // data.shift(); // remove first element (grouping tag) // or filter by id
            const filterMain = data.filter((item) => tag.id !== item.id)
            setAssocEntryTags(filterMain)
        })

    },[tag.id, jwtToken])

    const handleDelete = async () => {
        const idsToDelete = [ tag.id ]

        deleteData(`tags/users/my`, idsToDelete, jwtToken)
        .then((response) => {
            console.log('remove association with user', response)
            deleteData(`tags/${tag.id}`, null, jwtToken)
            .then((response) => {
                setDataChanged(true);
            })
        })

    }

    return(
        <Card color="background">
            {editing ? (
                <TagForm 
                    mode="edit" 
                    selectedTag={tag} 
                    tagType={tagType}
                    onClose={() => setEditing(false)}
                    setDataChanged={setDataChanged}
                    />
                ) : (
                <>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Typography level="h3" fontWeight="lg">
                        {tag.note}
                    </Typography>
                    <div>
                    <IconButton onClick={() => setEditing(true)}>
                        <ModeEditOutlineOutlinedIcon />
                    </IconButton>
                    <DeleteIconButton onClick={handleDelete}/>
                    </div>
                </div>
                <ChipRow data={assocEntryTags}/>
                {tag.description ?  
                    (<Typography level="h5" fontWeight="lg">
                        {tag.description}
                    </Typography>)
                    :(
                        <Typography level="body" color="neutral" fontWeight="lg">
                            write a description...
                        </Typography>
                    )  
                }
                </>
                )

            }
        </Card>
    )
}


// show two rows of chips (one situation, the other mind)
function ChipRow({data}){
    return(
        <div>
            {data.map((tag) => (
                <Chip key={tag.id} fontSize="md" color={tag.type === "situation" ? "primary" : "neutral"}>
                    {tag.note} {tag.tagcount}
                </Chip>
            ))}
        </div>
    )

}
