import React, { useState, useEffect } from "react"; 
import { IconButton, Typography, Card, Chip } from '@mui/joy';
import TagForm from "../tagForm";
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteIconButton from "../DeleteIconButton";
import { deleteData } from "../../api/apiService";
import { useAuthToken } from "../useAuthToken";
import { fetchData } from "../../api/apiService";
import { getDate } from "../../utils/helpers";
import ChipRow from "./chipRow";

export default function TagDetails({tag,tagType, setDataChanged}){
    const [editing, setEditing] = useState(false); 
    const [assocEntryTags, setAssocEntryTags] = useState([]); // 
    const jwtToken = useAuthToken();

    useEffect(() => {
        if(!jwtToken) return;
        fetchData(`tags/${tag.id}/assocEntryTagsCount`, jwtToken)
        .then((data) => {
            console.log('response', data)
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
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <div>
                        <Typography level="h3" fontWeight="lg">
                            {tag.note}
                        </Typography>
                        <Typography color='neutral' level="body-xs">
                            added on {getDate(tag.created_at)}
                        </Typography>
                    </div>
                    <div>
                    <IconButton onClick={() => setEditing(true)}>
                        <ModeEditOutlineOutlinedIcon />
                    </IconButton>
                    <DeleteIconButton onClick={handleDelete}/>
                    </div>
                </div>
                <ChipRow data={assocEntryTags} tagType={tagType}/>
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


