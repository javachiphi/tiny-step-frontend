import React from "react";
import EntriesByTag from "../components/entriesByTag";
import  FormattedDataProvider from "../context/entriesByTagProvider";


export default function MindFulnessPage() {
    return(
        <div>
            <h1>Mindfulness Checklist</h1>
            <FormattedDataProvider>
             <EntriesByTag tagType="mind" />  
             </FormattedDataProvider>
        </div>
    )
}