import React from "react";
import EntriesByTag from "../components/entriesByTag";


export default function MindFulnessPage() {
    return(
        <div>
            <h1>Mindfulness Checklist</h1>
            <EntriesByTag tagType="mind" />  
        </div>
    )
}