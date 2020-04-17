import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

const Sidebar = ({ cases }) => {
  return (
    <div>
      <nav className='col-md-2 d-none d-md-block bg-secondary sidebar'>
        <div className='sidebar-sticky'>
          <ul className='nav flex-column'>
            <li className='nav-item'>
              <a className='nav-link active' href='/'>
                <Icon icon={faHome} size='lg' /> Dashboard
                <span className='sr-only'>(current)</span>
              </a>
            </li>
          </ul>
        </div>

        <div className='sidebar-bottom px-2'>
          <p className='text-center text-light'>
            {`Last update: ${new Date(cases.updated).toLocaleString()}`}
          </p>

          <p className='text-center text-light'>
            {`Affected countries: ${cases.affectedCountries}`}
          </p>
        </div>
      </nav>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    cases: state.cases.global,
  };
};

export default connect(mapStateToProps)(Sidebar);
