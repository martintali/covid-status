import React from 'react';

const Loading = () => (
  <div style={{ width: '100vw', height: '100vh' }}>
    <div className='bg-dark w-100 h-100'>
      <div className='container text-center w-100 h-100'>
        <div className='row align-items-center w-100 h-100'>
          <div className='col align-self-center'>
            <div
              className='spinner-grow text-primary align-middle'
              style={{
                width: '3rem',
                height: '3rem',
              }}
              role='status'
            >
              <span className='sr-only'>Loading...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Loading;
