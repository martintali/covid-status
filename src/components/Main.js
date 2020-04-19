import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import SyncIcon from '@material-ui/icons/Sync';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import { fetchAll, fetchLocation, filterCountry } from 'actions';
import useStyles from 'assets/styles';
import Table from 'components/Table';

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <Link color='inherit' href='https://material-ui.com/'>
        Covid-19 Status App
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const Main = (props) => {
  const classes = useStyles();

  useEffect(() => {
    props.fetchAll();
    props.fetchLocation();
  }, []);

  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Backdrop open={props.isLoading}>
        <CircularProgress />
      </Backdrop>
      {!props.isLoading ? (
        <Container maxWidth='lg' className={classes.container}>
          <Box pb={2} display='flex' alignItems='center'>
            <Box flexGrow={1}>
              <TextField
                fullWidth
                id='standard-basic'
                label='Filter by country name'
                onChange={(e) => props.filterCountry(e.target.value)}
              />
            </Box>
            <Box>
              <IconButton onClick={() => props.fetchAll()}>
                <SyncIcon color='primary' />
              </IconButton>
            </Box>
          </Box>
          <Table />

          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      ) : (
        ''
      )}
    </main>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoading: state.isLoading,
    userLocation: state.userLocation,
  };
};

export default connect(mapStateToProps, {
  fetchAll,
  fetchLocation,
  filterCountry,
})(Main);
