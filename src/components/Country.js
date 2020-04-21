import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import * as actions from 'actions';
import useStyles from 'assets/styles';
import { makeStyles } from '@material-ui/core/styles';
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
                    onChange={({ target }) => {
                      setCountry(props.countries[target.dataset.optionIndex]);
                    }}
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
          <Grid item xs={12}>
            <Paper className={classes.root} elevation={2}>
              {country ? (
                <Box m={2} display='flex' alignItems='center'>
                  {country.country}
                </Box>
              ) : (
                ''
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </main>
  );
};

const mapStateToProps = (state) => {
  return {
    countries: state.cases.countries,
    isLoading: state.isLoading,
  };
};

export default connect(mapStateToProps, actions)(Country);
