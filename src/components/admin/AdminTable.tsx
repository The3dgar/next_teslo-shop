import React from 'react';
import { Grid } from '../ui';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';

interface Props {
  rows: any[];
  columns: GridColDef[];
}
export const AdminTable = ({ rows, columns }: Props) => {
  return (
    <Grid container className='fadeIn'>
      <Grid item xs={12} sx={{ height: '650px', width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSizeOptions={[10]}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
                page: 0,
              },
            },
          }}
        />
      </Grid>
    </Grid>
  );
};
