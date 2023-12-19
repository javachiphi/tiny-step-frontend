import React from "react";
import EntriesByTag from "../components/entriesByTag";
import {Link } from "react-router-dom";
import EntryList from "../components/entryList";

export default function DiaryPage(){
    return(
        <div>
            <h1>Diary Page</h1>
            <Link to="/create">Create</Link>
 

        </div>
    )
}