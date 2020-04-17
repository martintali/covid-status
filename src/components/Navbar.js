import React from 'react';
import { connect } from 'react-redux';
import { filterCountry } from 'actions';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faVirus } from '@fortawesome/free-solid-svg-icons';

const Navbar = (props) => {
  return (
    <nav className='navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow'>
      <span className='navbar-brand col-sm-3 col-md-2 mr-0'>
        <Icon icon={faVirus} size='lg' />
        COVID-19 Status
      </span>

      <input
        className='form-control form-control-dark w-100'
        type='text'
        placeholder='Search by country name'
        aria-label='Search by country name'
        onChange={(event) => props.filterCountry(event.target.value)}
      />
    </nav>
  );
};

export default connect(null, { filterCountry })(Navbar);
