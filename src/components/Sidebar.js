import React from 'react';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import LanguageIcon from '@material-ui/icons/Language';
import useStyles from 'assets/styles';

const Sidebar = ({ open, handleDrawerClose }) => {
  const classes = useStyles();
  return (
    <Drawer
      variant='permanent'
      classes={{
        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
      }}
      open={open}
    >
      <div className={classes.toolbarIcon}>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>
        <ListItem button component={Link} to='/'>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary='Dashboard' />
        </ListItem>
        <ListItem button component={Link} to='/world'>
          <ListItemIcon>
            <LanguageIcon />
          </ListItemIcon>
          <ListItemText primary='World cases' />
        </ListItem>
        <ListItem button component={Link} to='/country'>
          <ListItemIcon>
            <SearchIcon />
          </ListItemIcon>
          <ListItemText primary='Country' />
        </ListItem>
      </List>
      <Divider />
    </Drawer>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    open: ownProps.open,
    handleDrawerClose: ownProps.handleDrawerClose,
  };
};

export default connect(mapStateToProps)(Sidebar);
