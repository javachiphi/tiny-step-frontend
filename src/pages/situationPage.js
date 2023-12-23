import React from "react";
import GroupedEntries from "../components/groupedEntries";


export default function SituationPage() {
    return(
        <div>
            <h1>Situation Checklist</h1>
              <GroupedEntries tagType="situation" /> 
        </div>
    )
}