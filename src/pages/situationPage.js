import React from "react";
import EntriesByTag from "../components/entriesByTag";
import  FormattedDataProvider from "../context/entriesByTagProvider";


export default function SituationPage() {
    return(
        <div>
            <h1>Situation Checklist</h1>
            <FormattedDataProvider>
              <EntriesByTag tagType="situation" /> 
            </FormattedDataProvider> 
        </div>
    )
}