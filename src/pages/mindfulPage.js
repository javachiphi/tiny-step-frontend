import React from "react";
import GroupedEntries from "../components/groupedEntries";

export default function MindFulnessPage() {
    return(
        <div>
            <h1>Mindfulness Checklist</h1>
            <GroupedEntries tagType="mind" /> 
        </div>
    )
}