import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
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
import Chart from 'components/Chart';

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
            <Grid container>
              <Grid item xs={7}>
                <Paper className={classes.root} elevation={2}>
                  {country ? (
                    <Box
                      m={2}
                      display='flex'
                      alignItems='center'
                      height={600}
                      width={1400}
                    >
                      <Chart data={data} />
                    </Box>
                  ) : (
                    ''
                  )}
                </Paper>
              </Grid>
              <Grid item xs={5}>
                <Paper className={classes.root} elevation={2}>
                  Larala
                </Paper>
              </Grid>
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
