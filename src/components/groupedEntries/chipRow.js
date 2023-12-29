import React from "react"; 
import { Chip } from '@mui/joy';

export default function ChipRow({data, tagType}){
    const mindTags = data.filter((tag) => tag.type === "mind")
    const situTags = data.filter((tag) => tag.type === "situation")
    const order = tagType === "situation"? [mindTags, situTags] : [situTags, mindTags] 

    return(
        <>
        <div>
            {order[0].map((tag) => (
                <Chip key={tag.id} fontSize="md" color={tag.type === "situation" ? "primary" : "neutral"}>
                    {tag.note} {tag.tagcount}
                </Chip>
            ))}
            {order[1].map((tag) => (
                <Chip key={tag.id} fontSize="md" color={tag.type === "situation" ? "primary" : "neutral"}>
                    {tag.note} {tag.tagcount}
                </Chip>
            ))}
        </div>
        </>
    )
}
