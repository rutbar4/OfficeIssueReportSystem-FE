import * as React from 'react';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import {fetchPaginationCount} from 'src/api/PaginationCount';

export default function PaginationControlled() {
  const [page, setPage] = React.useState(1);
  const [pageCount, setPageCount] = React.useState(1);

  React.useEffect(() => {
    fetchPaginationCount().then((count) => {
      setPageCount(count);
    });
  }, []);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Stack spacing={2}>
      <Typography>Page: {page}</Typography>
      <Pagination sx={{'& .MuiPaginationItem-root': {fontSize: '14px'}}} count={pageCount} page={page} onChange={handleChange} color={'primary'}/>
    </Stack>
  );
}