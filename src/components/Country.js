import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { ResponsiveLine } from '@nivo/line';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import * as actions from 'actions';
import useStyles from 'assets/styles';
import { countryToFlag } from 'helpers/countryFlags';

const useStylesInternal = makeStyles({
  option: {
    fontSize: 15,
    '& > span': {
      marginRight: 10,
      fontSize: 18,
    },
  },
});

const Country = (props) => {
  const classes = useStyles();
  const autoCompleteClasses = useStylesInternal();
  const [country, setCountry] = useState(null);

  useEffect(() => {
    props.fetchCountries(true);
    props.fetchLocation();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onSelect = (target, value) => target.country === value.country;

  const onAutocompleteSelect = ({ target }) => {
    if (Object.keys(target.dataset).length) {
      setCountry(props.countries[target.dataset.optionIndex]);
    } else {
      setCountry(null);
    }
  };

  useEffect(() => {
    if (country) {
      props.refreshPage();
      props.fetchCountry(country.country);
    }
  }, [country]); // eslint-disable-line react-hooks/exhaustive-deps

  let data = [
    {
      id: 'deaths',
      color: 'red',
      data: [],
    },
    {
      id: 'cases',
      color: 'teal',
      data: [],
    },
    {
      id: 'recovered',
      color: 'blue',
      data: [],
    },
  ];
  if (props.selectedCountry && country) {
    Object.keys(props.selectedCountry.timeline.deaths).forEach((key) => {
      data[0].data.push({
        x: key.toString(),
        y: props.selectedCountry.timeline.deaths[key].toString(),
      });
    });
    Object.keys(props.selectedCountry.timeline.cases).forEach((key) => {
      data[1].data.push({
        x: key.toString(),
        y: props.selectedCountry.timeline.cases[key].toString(),
      });
    });
    Object.keys(props.selectedCountry.timeline.recovered).forEach((key) => {
      data[2].data.push({
        x: key.toString(),
        y: props.selectedCountry.timeline.recovered[key].toString(),
      });
    });
  } else {
    data = [];
  }

  const Chart = () => {
    return (
      <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{
          type: 'linear',
          min: 'auto',
          max: 'auto',
          stacked: true,
          reverse: false,
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: 'bottom',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'number',
          legendOffset: 36,
          legendPosition: 'middle',
        }}
        axisLeft={{
          orient: 'left',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'count',
          legendOffset: -55,
          legendPosition: 'middle',
        }}
        colors={{ scheme: 'nivo' }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabel='y'
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
          {
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: 'left-to-right',
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: 'circle',
            symbolBorderColor: 'rgba(0, 0, 0, .5)',
            effects: [
              {
                on: 'hover',
                style: {
                  itemBackground: 'rgba(0, 0, 0, .03)',
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    );
  };

  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth='lg' className={classes.container}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper className={classes.root}>
              <Box m={2} display='flex' alignItems='center'>
                <Box flexGrow={1}>
                  <Autocomplete
                    id='country-select-demo'
                    style={{ width: 300 }}
                    options={props.countries}
                    classes={{
                      option: autoCompleteClasses.option,
                    }}
                    autoHighlight
                    getOptionLabel={(option) => option.country}
                    renderOption={(option) => (
                      <React.Fragment>
                        <span>{countryToFlag(option.countryInfo.iso2)}</span>
                        {option.country}
                      </React.Fragment>
                    )}
                    getOptionSelected={onSelect}
                    onChange={onAutocompleteSelect}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label='Choose a country'
                        variant='outlined'
                        inputProps={{
                          ...params.inputProps,
                          autoComplete: 'new-password', // disable autocomplete and autofill
                        }}
                      />
                    )}
                  />
                </Box>
              </Box>
            </Paper>
          </Grid>
          <Backdrop open={props.isLoading}>
            <CircularProgress />
          </Backdrop>
          {!props.isLoading ? (
            <Grid item xs={12}>
              <Paper className={classes.root} elevation={2}>
                {country ? (
                  <Box
                    m={2}
                    display='flex'
                    alignItems='center'
                    height={600}
                    width={1400}
                  >
                    {Chart({ data })}
                  </Box>
                ) : (
                  ''
                )}
              </Paper>
            </Grid>
          ) : (
            ''
          )}
        </Grid>
      </Container>
    </main>
  );
};

const mapStateToProps = (state) => {
  return {
    countries: state.cases.countries,
    selectedCountry: state.cases.country,
    isLoading: state.isLoading,
  };
};

export default connect(mapStateToProps, actions)(Country);
