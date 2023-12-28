import React from "react";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { IconButton } from '@mui/joy';

export default function DeleteIconButton({onClick}){
    return(
        <IconButton onClick={onClick}>
            <DeleteOutlineOutlinedIcon />
        </IconButton>
    )
}


