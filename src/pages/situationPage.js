import React from "react";
import EntriesByTag from "../components/entriesByTag";



export default function SituationPage() {
    return(
        <div>
            <h1>Situation Checklist</h1>
            <EntriesByTag tagType="situation" />  
        </div>
    )
}