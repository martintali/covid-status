import React from 'react';
import clsx from 'clsx';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MUICookieConsent from 'material-ui-cookie-consent';
import useStyles from 'assets/styles';
import Sidebar from 'components/Sidebar';
import Home from 'components/Home';
import Country from 'components/Country';
import WorldTable from 'components/WorldTable';

export default function App() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <BrowserRouter>
        <CssBaseline />
        <AppBar
          position='absolute'
          className={clsx(classes.appBar, open && classes.appBarShift)}
        >
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge='start'
              color='inherit'
              aria-label='open drawer'
              onClick={handleDrawerOpen}
              className={clsx(
                classes.menuButton,
                open && classes.menuButtonHidden
              )}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component='h1'
              variant='h6'
              color='inherit'
              noWrap
              className={classes.title}
            >
              COVID-19 Status App
            </Typography>
          </Toolbar>
        </AppBar>
        <Sidebar open={open} handleDrawerClose={handleDrawerClose} />

        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/world' exact component={WorldTable} />
          <Route path='/country' exact component={Country} />
        </Switch>
      </BrowserRouter>
      <MUICookieConsent
        cookieName='mySiteCookieConsent'
        message='This website uses cookies to enhance the user experience.'
      />
    </div>
  );
}
