import React from 'react'
import MaterialTable from 'material-table'

function HistoryTable() {
  const { useState } = React;
  const [selectedRow, setSelectedRow] = useState(null);

  const data=[
    {name: 'Randy', age:20},
    {name: 'Alvin', age:21},
    {name: 'Juan', age:22},
    {name: 'Sion', age:19},
    {name: 'Rara', age:18},
  ]

  const columns=[
    {title:'Name',field:'name'},
    {title:'Age', field:'age'}
  ]

  return (
    <div>
      <MaterialTable title="Usage History"
        data = {data}
        columns = {columns}
        onRowClick={((evt, selectedRow) => setSelectedRow(selectedRow.tableData.id))}
        options={{
          headerStyle: {
            backgroundColor: '#077be0',
            color: '#FFF'
          },
          exportButton: true,
          filtering: true,
          rowStyle: rowData => ({
            backgroundColor: (selectedRow === rowData.tableData.id) ? '#EEE' : '#FFF'
          })
        }}
      />
    </div>
  )
}

export default HistoryTable
