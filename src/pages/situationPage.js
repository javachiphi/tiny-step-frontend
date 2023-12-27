import React from "react";
import GroupedEntries from "../components/groupedEntries/groupedEntries";
import { Box } from "@mui/joy";

export default function SituationPage() {
    return(
        <div>
            <h1 className="text-center">Situation Checklist</h1>
            <Box sx={{height: "max-content"}}>
                <div className="table-container">
              <GroupedEntries tagType="situation" /> 
                </div>
            </Box>
        </div>
    )
}