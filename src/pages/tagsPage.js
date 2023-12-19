import React from "react";
import TagsAccorGroup from "../components/tagsAccorGroup";
import SystemTags from "../components/systemTagsList";
import TagVault from "../components/tagVault";


export default function TagsPage() {
  return (
    <div>
      <h1>TagsPage</h1>
      <TagsAccorGroup />
        <TagVault />
    </div>
  );
}