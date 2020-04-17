import React from 'react';
import { connect } from 'react-redux';
import shortid from 'shortid';

const Table = ({ world, countries }) => {
  const formatNumber = (value) => {
    if (value) {
      return value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }
    return '—';
  };

  const formatWithPlus = (v) =>
    v > 0 ? `+${formatNumber(String(v))}` : formatNumber(String(v));

  const tableHead = (
    <thead className='thead-dark'>
      <tr>
        <th scope='col' title='Position'>
          #
        </th>
        <th scope='col' title='Other, Country'>
          Other, Country
        </th>
        <th scope='col' title='Cases'>
          Cases
        </th>
        <th scope='col' title='New Cases'>
          New Cases
        </th>
        <th scope='col' title='Deaths'>
          Deaths
        </th>
        <th scope='col' title='New Deaths'>
          New Deaths
        </th>
        <th scope='col' title='Recovered'>
          Recovered
        </th>
        <th scope='col' title='Active'>
          Active
        </th>
        <th scope='col' title='Critical'>
          Critical
        </th>
        <th scope='col' title='Cases Per One Million'>
          Cases /1M pop
        </th>
        <th scope='col' title='Deaths Per One Million'>
          Deaths /1M pop
        </th>
        <th scope='col' title='Tests'>
          Tests
        </th>
        <th scope='col' title='Tests Per One Million'>
          Tests /1M pop
        </th>
      </tr>
    </thead>
  );

  const tableBody = (
    <tbody>
      <tr className='table-dark font-weight-bold'>
        <td />
        <th scope='row'>World</th>
        <td>{formatNumber(world.cases)}</td>
        <td>{formatWithPlus(world.todayCases)}</td>
        <td>{formatNumber(world.deaths)}</td>
        <td>{formatWithPlus(world.todayDeaths)}</td>
        <td>{formatNumber(world.recovered)}</td>
        <td>{formatNumber(world.active)}</td>
        <td>{formatNumber(world.critical)}</td>
        <td>{formatNumber(world.casesPerOneMillion)}</td>
        <td>{formatNumber(world.deathsPerOneMillion)}</td>
        <td>{formatNumber(world.tests)}</td>
        <td>{formatNumber(world.testsPerOneMillion)}</td>
      </tr>

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
            casesPerOneMillion,
            deathsPerOneMillion,
            countryInfo,
            tests,
            testsPerOneMillion,
          },
          idx
        ) => (
          <tr
            key={shortid.generate()}
            className={`font-weight-bold ${
              cases === recovered ? 'table-success text-dark' : ''
            }`}
          >
            <th scope='row'>{idx + 1}</th>
            <td className='align-middle'>
              <img src={countryInfo.flag} alt='' width={18} /> {country}
            </td>
            <td>{formatNumber(cases)}</td>
            <td className={`${todayCases ? 'bg-warning' : ''}`}>
              {formatWithPlus(todayCases)}
            </td>
            <td>{formatNumber(deaths)}</td>
            <td className={`${todayDeaths ? 'bg-danger' : ''}`}>
              {formatWithPlus(todayDeaths)}
            </td>
            <td>{formatNumber(recovered)}</td>
            <td>{formatNumber(active)}</td>
            <td>{formatNumber(critical)}</td>
            <td>{formatNumber(casesPerOneMillion)}</td>
            <td>{formatNumber(deathsPerOneMillion)}</td>
            <td>{formatNumber(tests)}</td>
            <td>{formatNumber(testsPerOneMillion)}</td>
          </tr>
        )
      )}
    </tbody>
  );

  return (
    <div className='table-responsive'>
      <table className='table table-dark table-hover'>
        {tableHead}
        {tableBody}
      </table>

      <p className='text-left text-light'>
        <mark className='table-success'>Highlighted in green</mark> = all cases
        have recovered from the infection
      </p>

      <p className='text-left text-light'>
        <mark className='table-secondary'>Highlighted in grey</mark> = all cases
        have had an outcome (there are no active cases)
      </p>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    world: state.cases.global,
    countries: state.cases.filteredCountries,
  };
};

export default connect(mapStateToProps)(Table);
