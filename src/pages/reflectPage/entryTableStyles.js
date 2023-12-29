
export const styledTable = {
    maxWidth: '1200px', 
    thead: {
        '--TableCell-headBackground':"#F4E6D4",
        color: 'red',
    },
    'tbody tr': {
        backgroundColor: "#F4E6D4",
        color: "#4b5161", 
    },
    'tbody tr:nth-of-type(odd)': {
        backgroundColor: "#fdf5eb", 
        color: "#4b5161", 
    },
    '& tfoot tr td': {
        backgroundColor: "#fdf5eb",
        color: "#4b5161",
    }
}
