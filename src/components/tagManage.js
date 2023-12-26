import React, {useState } from "react"; 
import { IconButton, Typography, Card } from '@mui/joy';
import TagForm from "./tagForm";
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';

export default function TagDetails({tag,tagType}){
    const [editing, setEditing] = useState(false); 
    return(
        <Card variant="plain">
            {editing ? (
                <TagForm 
                    mode="Edit" 
                    selectedTag={tag} 
                    tagType={tagType}
                    onClose={() => setEditing(false)}
                    />
                ) : (
                <>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Typography level="h3" fontWeight="lg">
                        {tag.note}
                    </Typography>
                    <IconButton onClick={() => setEditing(true)}>
                        <ModeEditOutlineOutlinedIcon />
                    </IconButton>
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




