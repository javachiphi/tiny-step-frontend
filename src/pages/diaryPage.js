import React from "react";
import {Link } from "react-router-dom";
import AllDiaries from "../components/allDiaries";

export default function DiaryPage(){
    return(
        <div>
            <h1>Diary Page</h1>
            
            <Link to="/create">Create</Link>
            <AllDiaries />

        </div>
    )
}