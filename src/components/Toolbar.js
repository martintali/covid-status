import React from 'react';
import { connect } from 'react-redux';
import { fetchAll } from 'actions';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';

const Toolbar = (props) => (
  <div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-5 pt-sm-3 pb-sm-2 pb-0 mb-1'>
    <div className='btn-toolbar pt-2 pt-sm-0 mt-4 mb-2 mb-md-0 bg-dark ml-auto'>
      <button
        type='button'
        className='btn btn-sm btn-outline-light'
        onClick={() => props.fetchAll()}
      >
        <Icon icon={faSyncAlt} size='lg' title='Refresh' />
      </button>
    </div>
  </div>
);

export default connect(null, { fetchAll })(Toolbar);
