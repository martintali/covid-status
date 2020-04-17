import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchAll, fetchLocation } from 'actions';
import Sidebar from 'components/Sidebar';
import Table from 'components/Table';
import Loading from 'components/Loading';
import Toolbar from './Toolbar';

const Main = (props) => {
  useEffect(() => {
    props.fetchAll();
    props.fetchLocation();
  }, []);

  return (
    <div className='container-fluid bg-dark'>
      {props.isLoading ? (
        <Loading />
      ) : (
        <div className='row'>
          <Sidebar />

          <main
            role='main'
            className='col-md-9 ml-sm-auto col-lg-10 pt-3 px-4 bg-dark'
          >
            <Toolbar />
            <Table />
          </main>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoading: state.isLoading,
    userLocation: state.userLocation
  };
};

export default connect(mapStateToProps, { fetchAll, fetchLocation })(Main);
