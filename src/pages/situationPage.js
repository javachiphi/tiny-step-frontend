import React from "react";
import GroupedEntries from "../components/groupedEntries/groupedEntries";
import { Sheet } from "@mui/joy";

export default function SituationPage() {
    return(
        <div>
            <h1 className="text-center">Situation Checklist</h1>
            <Sheet color='primary'>
                <div className="table-container">
              <GroupedEntries tagType="situation" /> 
                </div>
            </Sheet>
        </div>
    )
}