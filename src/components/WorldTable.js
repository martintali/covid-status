import React, { useState } from 'react';
import { connect } from 'react-redux';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import * as actions from 'actions';
import useStyles from 'assets/styles';
import SyncIcon from '@material-ui/icons/Sync';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Table from 'components/Table';

const WorldTable = (props) => {
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth='lg' className={classes.container}>
        <Grid container>
          <Grid item xs={12}>
            <Box pl={2} pb={2} display='flex' alignItems='center'>
              <Box flexGrow={1}>
                <TextField
                  fullWidth
                  id='standard-basic'
                  label='Filter by country name'
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    props.filterCountry(e.target.value);
                  }}
                />
              </Box>
              <Box>
                <IconButton
                  onClick={() => {
                    setSearchTerm('');
                    props.fetchAll();
                  }}
                >
                  <SyncIcon color='primary' />
                </IconButton>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Table />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </main>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoading: state.isLoading,
  };
};

export default connect(mapStateToProps, actions)(WorldTable);
