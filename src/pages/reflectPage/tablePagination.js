import React from 'react';
import { Option, Box, FormControl, FormLabel, IconButton, Select, Typography } from '@mui/joy';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

function labelDisplayedRows({ from, to, count }) {
    console.log(`${from}–${to} of ${count !== -1 ? count : `more than ${to}`}`)
    return `${to} of ${count !== -1 ? count : `more than ${to}`}`;
  }
  
const rowsPerPage = 10;

export default function TablePagination({
    rows,
    page, 
    totalPages,
    onChangePage,
}){
    return(
      <tfoot>
      <tr>
        <td colSpan={5}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              justifyContent: 'flex-end',
            }}
          >
            <Typography textAlign="center" sx={{ minWidth: 80 }}>
                {`${page} of ${totalPages}`}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton
                size="sm"
                color="neutral"
                variant="outlined"
                disabled={page === 1}
                onClick={() => onChangePage(page - 1)}
                sx={{ bgcolor: 'background.surface' }}
              >
                <KeyboardArrowLeftIcon />
              </IconButton>
              <IconButton
                size="sm"
                color="neutral"
                variant="outlined"
                disabled={page === totalPages}
                onClick={() => onChangePage(page + 1)}
                sx={{ bgcolor: 'background.surface' }}
              >
                <KeyboardArrowRightIcon />
              </IconButton>
            </Box>
          </Box>
        </td>
      </tr>
    </tfoot>
    )
  }