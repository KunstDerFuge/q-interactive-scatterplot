import * as React from 'react'
import {DataGrid} from '@material-ui/data-grid'
import clsx from 'clsx'
import './InteractiveTable.css'

const columns = [
  {field: 'drop_number', headerName: 'Drop #', width: 95},
  {field: 'DateCreated', headerName: 'Image Timestamp', width: 170},
  {field: 'timestamp_drop_UTC', headerName: 'Drop Timestamp', width: 210},
  {
    field: 'timediff',
    headerName: 'Time Diff',
    width: 100,
    cellClassName: (params) =>
      clsx({
        utcplus8: (params.value) > 0,
        utcminus7: (params.value) < -7 && (params.value) > -8,
        utcminus8: (params.value) < -8
      })
  },
]

export default function InteractiveTable(props) {
  return (
    <div style={{width: 600, height: props.isMobile ? 500 : 'calc(100% - 60px)'}}>
      <DataGrid rows={props.data} columns={columns} disableSelectionOnClick disableColumnMenu
                disableColumnReorder disableColumnSelector
                onRowOver={(param, event) => {
                  console.log(param)
                  props.setHoveredDatum(param.id)
                }}
                onRowLeave={() => {
                  props.setHoveredDatum(null)
                }}
                onRowClick={(param) => {
                  props.selectedDatum === param.rowIndex ? props.setSelectedDatum(null) : props.setSelectedDatum(param.id)
                }}
                sortingMode='client' hideFooter rowHeight={45} />
    </div>
  )
}