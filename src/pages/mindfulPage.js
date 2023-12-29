import React from "react";
import GroupedEntries from "../components/groupedEntries/groupedEntries";
import PageTitle from "../components/pageTitle";

export default function MindFulnessPage() {
    return(
        <div>
            <PageTitle tagType="mind" title="Checklist" />
            <GroupedEntries tagType="mind" /> 
        </div>
    )
}