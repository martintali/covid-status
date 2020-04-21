import React from 'react';
import { connect } from 'react-redux';
import shortid from 'shortid';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { countryToFlag } from 'helpers/countryFlags';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 740,
  },
  warning: {
    backgroundColor: '#ff9800',
    color: '#FFF',
  },
  danger: {
    backgroundColor: '#f44336',
    color: '#FFF',
  },
});

const MyTable = ({ world, countries, orderCountries }) => {
  const classes = useStyles();
  const formatNumber = (value) => {
    if (value) {
      return value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }
    return '—';
  };

  const formatWithPlus = (v) =>
    v > 0 ? `+${formatNumber(String(v))}` : formatNumber(String(v));

  const columns = [
    {
      id: 'id',
      label: '#',
      minWidth: 40,
    },
    {
      id: 'country',
      label: 'Country',
      minWidth: 100,
    },
    {
      id: 'cases',
      label: 'Cases',
      minWidth: 80,
    },
    {
      id: 'todayCases',
      label: 'New cases',
      minWidth: 80,
    },
    {
      id: 'deaths',
      label: 'Deaths',
      minWidth: 80,
    },
    {
      id: 'todayDeaths',
      label: 'New deaths',
      minWidth: 80,
    },
    {
      id: 'recovered',
      label: 'Recovered',
      minWidth: 80,
    },
    {
      id: 'active',
      label: 'Active',
      minWidth: 80,
    },
    {
      id: 'critical',
      label: 'Critical',
      minWidth: 80,
    },
    {
      id: 'tests',
      label: 'Test',
      minWidth: 80,
    },
  ];

  const tableHead = (
    <TableHead>
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={column.id}
            align={column.align}
            style={{ minWidth: column.minWidth }}
          >
            {column.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );

  const tableBody = (
    <TableBody>
      <TableRow
        hover
        role='checkbox'
        tabIndex={-1}
        key='world'
        style={{ backgroundColor: '#eceff1' }}
      >
        <TableCell key='id'>#</TableCell>
        <TableCell scope='row'>World</TableCell>
        <TableCell>{formatNumber(world.cases)}</TableCell>
        <TableCell className={`${world.todayCases ? classes.warning : ''}`}>
          {formatWithPlus(world.todayCases)}
        </TableCell>
        <TableCell>{formatNumber(world.deaths)}</TableCell>
        <TableCell className={`${world.todayDeaths ? classes.danger : ''}`}>
          {formatWithPlus(world.todayDeaths)}
        </TableCell>
        <TableCell>{formatNumber(world.recovered)}</TableCell>
        <TableCell>{formatNumber(world.active)}</TableCell>
        <TableCell>{formatNumber(world.critical)}</TableCell>
        <TableCell>{formatNumber(world.tests)}</TableCell>
      </TableRow>

      {countries.map(
        (
          {
            country,
            cases,
            todayCases,
            deaths,
            todayDeaths,
            recovered,
            active,
            critical,
            countryInfo,
            tests,
          },
          idx
        ) => (
          <TableRow
            key={shortid.generate()}
            className={`font-weight-bold ${
              cases === recovered ? 'table-success text-dark' : ''
            }`}
          >
            <TableCell scope='row'>{idx + 1}</TableCell>
            <TableCell className='align-middle'>
              {countryToFlag(countryInfo.iso2)} {country}
            </TableCell>
            <TableCell>{formatNumber(cases)}</TableCell>
            <TableCell className={`${todayCases ? classes.warning : ''}`}>
              {formatWithPlus(todayCases)}
            </TableCell>
            <TableCell>{formatNumber(deaths)}</TableCell>
            <TableCell className={`${todayDeaths ? classes.danger : ''}`}>
              {formatWithPlus(todayDeaths)}
            </TableCell>
            <TableCell>{formatNumber(recovered)}</TableCell>
            <TableCell>{formatNumber(active)}</TableCell>
            <TableCell>{formatNumber(critical)}</TableCell>
            <TableCell>{formatNumber(tests)}</TableCell>
          </TableRow>
        )
      )}
    </TableBody>
  );

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label='sticky table'>
          {tableHead}
          {tableBody}
        </Table>
      </TableContainer>
    </Paper>
  );
};

const mapStateToProps = (state) => {
  return {
    world: state.cases.global,
    countries: [...state.cases.filteredCountries],
  };
};

export default connect(mapStateToProps)(MyTable);
