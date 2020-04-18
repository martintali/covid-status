import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { fetchAll, fetchLocation } from 'actions';
import useStyles from 'assets/styles';
import Table from 'components/Table';

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <Link color='inherit' href='https://material-ui.com/'>
        Your Website
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
      <Container maxWidth='lg' className={classes.container}>
        <Backdrop open={props.isLoading}>
          <CircularProgress />
        </Backdrop>
        {!props.isLoading ? <Table /> : ''}
        <Box pt={4}>
          <Copyright />
        </Box>
      </Container>
    </main>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoading: state.isLoading,
    userLocation: state.userLocation,
  };
};

export default connect(mapStateToProps, { fetchAll, fetchLocation })(Main);
