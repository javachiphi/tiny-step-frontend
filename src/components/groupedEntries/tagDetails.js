import React, { useState } from "react"; 
import { IconButton, Typography, Card } from '@mui/joy';
import TagForm from "../tagForm";
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteIconButton from "../DeleteIconButton";
import { deleteData } from "../../api/apiService";
import { useAuthToken } from "../useAuthToken";

export default function TagDetails({tag,tagType, setDataChanged}){
    const [editing, setEditing] = useState(false); 
    const jwtToken = useAuthToken();

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




