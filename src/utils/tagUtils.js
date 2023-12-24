

export const getTagIdsByType = (entryTags, tagType) => {
    return entryTags
        .filter(tag => tag.type === tagType)
        .map(tag => tag.id);
};