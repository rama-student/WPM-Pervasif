import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@mui/styles';
import { createTheme } from '@mui/material/styles';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import { AutoSizer, Column, Table } from 'react-virtualized';
import axios from 'axios';

const styles = (theme) => ({
  flexContainer: {
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
  },
  table: {
    // temporary right-to-left patch, waiting for
    // https://github.com/bvaughn/react-virtualized/issues/454
    '& .ReactVirtualized__Table__headerRow': {
      ...(theme.direction === 'rtl' && {
        paddingLeft: '0 !important',
      }),
      ...(theme.direction !== 'rtl' && {
        paddingRight: undefined,
      }),
    },
  },
  tableRow: {
    cursor: 'pointer',
  },
  tableRowHover: {
    '&:hover': {
      backgroundColor: theme.palette.grey[200],
    },
  },
  tableCell: {
    flex: 1,
  },
  noClick: {
    cursor: 'initial',
  },
});

class MuiVirtualizedTable extends React.PureComponent {
  static defaultProps = {
    headerHeight: 48,
    rowHeight: 48,
  };

  getRowClassName = ({ index }) => {
    const { classes, onRowClick } = this.props;

    return clsx(classes.tableRow, classes.flexContainer, {
      [classes.tableRowHover]: index !== -1 && onRowClick != null,
    });
  };

  cellRenderer = ({ cellData, columnIndex }) => {
    const { columns, classes, rowHeight, onRowClick } = this.props;
    return (
      <TableCell
        component="div"
        className={clsx(classes.tableCell, classes.flexContainer, {
          [classes.noClick]: onRowClick == null,
        })}
        variant="body"
        style={{ height: rowHeight }}
        align={
          (columnIndex != null && columns[columnIndex].numeric) || false
            ? 'right'
            : 'left'
        }
      >
        {cellData}
      </TableCell>
    );
  };

  headerRenderer = ({ label, columnIndex }) => {
    const { headerHeight, columns, classes } = this.props;

    return (
      <TableCell
        component="div"
        className={clsx(classes.tableCell, classes.flexContainer, classes.noClick)}
        variant="head"
        style={{ height: headerHeight }}
        align={columns[columnIndex].numeric || false ? 'right' : 'left'}
      >
        <span>{label}</span>
      </TableCell>
    );
  };

  render() {
    const { classes, columns, rowHeight, headerHeight, ...tableProps } = this.props;
    return (
      <AutoSizer>
        {({ height, width }) => (
          <Table
            height={height}
            width={width}
            rowHeight={rowHeight}
            gridStyle={{
              direction: 'inherit',
            }}
            headerHeight={headerHeight}
            className={classes.table}
            {...tableProps}
            rowClassName={this.getRowClassName}
          >
            {columns.map(({ dataKey, ...other }, index) => {
              return (
                <Column
                  key={dataKey}
                  headerRenderer={(headerProps) =>
                    this.headerRenderer({
                      ...headerProps,
                      columnIndex: index,
                    })
                  }
                  className={classes.flexContainer}
                  cellRenderer={this.cellRenderer}
                  dataKey={dataKey}
                  {...other}
                />
              );
            })}
          </Table>
        )}
      </AutoSizer>
    );
  }
}

MuiVirtualizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      dataKey: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      numeric: PropTypes.bool,
      width: PropTypes.number.isRequired,
    }),
  ).isRequired,
  headerHeight: PropTypes.number,
  onRowClick: PropTypes.func,
  rowHeight: PropTypes.number,
};

const defaultTheme = createTheme();
const VirtualizedTable = withStyles(styles, { defaultTheme })(MuiVirtualizedTable);

let id_device;
let sensor;
let voltage;
let current;
let power;
let date;

function createData2(number,id_device, sensor, voltage, current,power,date){
  return {number,id_device,sensor, voltage, current,power,date};
}

const rows2 = [];
  axios.get(process.env.REACT_APP_baseURL + "/dataTable", {
    headers:{
      "authtoken":localStorage.getItem("Token"),
    }
  })
  .then((response) => {
    for (let number = 0; number < response.data.length && number < 50400; number += 1) {
      id_device = response.data[number].deviceID;
      sensor = response.data[number].sensor;
      voltage = response.data[number].voltage;
      current = response.data[number].current;
      power = response.data[number].power;
      date = response.data[number].timestamp;
      rows2.push(createData2(number+1,id_device,sensor, voltage, current,power,date));
    } 
  })

//  clearInterval(interval); //seperti endsession untuk menghindari memory leak



export default function ReactVirtualizedTable() {
  return (
    <Paper style={{ height: 400, width: '95%' }}>
      <VirtualizedTable
        rowCount={rows2.length}
        rowGetter={({ index }) => rows2[index]}
        columns={[
          {
            width: 80,
            label: 'No.',
            dataKey: 'number',
            numeric: true,
          },
          {
            width: 200,
            label: 'ID_Device',
            dataKey: 'id_device',
          },
          {
            width: 80,
            label: 'Sensor',
            dataKey: 'sensor',
          },
          {
            width: 120,
            label: 'Voltage (Volt)',
            dataKey: 'voltage',
            numeric: true,
          },
          {
            width: 120,
            label: 'Current (mA)',
            dataKey: 'current',
            numeric: true,
          },
          {
            width: 120,
            label: 'Power (Watt)',
            dataKey: 'power',
            numeric: true,
          },
          {
            width: 300,
            label: 'Time Stamp',
            dataKey: 'date',
            numeric: true,
          },
        ]}
      />
    </Paper>
  );
}
