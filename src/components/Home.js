import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { fetchAll, fetchLocation, filterCountry } from 'actions';
import useStyles from 'assets/styles';
import Table from 'components/Table';
import Chart from 'components/Chart';
import { formatNumber, formatWithPlus } from 'helpers/numbers';

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

const Home = (props) => {
  const classes = useStyles();

  useEffect(() => {
    props.fetchAll();
    props.fetchLocation();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  let data = [];
  let dataTicks = [];
  let dataYTicks = [];
  if (props.historical) {
    data = [
      {
        id: 'cases',
        color: 'teal',
        data: [],
      },
    ];
    Object.keys(props.historical.cases).forEach((key, idx) => {
      if (idx % 5 === 0) {
        dataTicks.push(key.toString());
        dataYTicks.push(props.historical.cases[key].toString());
      }
      data[0].data.push({
        x: key.toString(),
        y: props.historical.cases[key].toString(),
      });
    });
  }

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const fixedTableHeightPaper = clsx(classes.paper, classes.fixedTableHeight);
  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Backdrop open={props.isLoading}>
        <CircularProgress />
      </Backdrop>
      {!props.isLoading ? (
        <Container maxWidth='lg' className={classes.container}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={fixedHeightPaper} elevation={2} mt={2}>
                <Box
                  display='flex'
                  alignItems='center'
                  style={{ width: '100%', height: '100%' }}
                >
                  <Chart data={data} ticks={dataTicks} yTicks={dataYTicks} />
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <React.Fragment>
                  <Typography
                    component='h2'
                    variant='h6'
                    color='primary'
                    gutterBottom
                  >
                    Today Cases
                  </Typography>
                  <Typography component='p' variant='h4'>
                    {formatWithPlus(props.world.todayCases)}
                  </Typography>
                  <Typography
                    component='h2'
                    variant='h6'
                    color='primary'
                    gutterBottom
                  >
                    Total Cases
                  </Typography>
                  <Typography component='p' variant='h4'>
                    {formatNumber(props.world.cases)}
                  </Typography>
                  <Typography
                    color='textSecondary'
                    className={classes.depositContext}
                  >
                    on {new Date(props.world.updated).toLocaleString()}
                  </Typography>
                </React.Fragment>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={`${classes.paper} ${fixedTableHeightPaper}`}>
                <Typography
                  component='h2'
                  variant='h6'
                  color='primary'
                  gutterBottom
                >
                  Cases
                </Typography>
                <Table trim />
                <Box className={classes.seeMore} pt={2}>
                  <Link color='primary' to='/world'>
                    See more cases
                  </Link>
                </Box>
              </Paper>
            </Grid>
          </Grid>
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
    historical: state.cases.historical,
    world: state.cases.global,
  };
};

export default connect(mapStateToProps, {
  fetchAll,
  fetchLocation,
  filterCountry,
})(Home);
