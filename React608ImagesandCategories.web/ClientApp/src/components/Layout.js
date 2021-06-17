import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Layout extends React.Component {

  render() {
    return (
      
            <>
              <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
                <Link to='/' className="navbar-brand">Categories</Link>

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarsExampleDefault">
                  <ul className="navbar-nav mr-auto">
                    <li className="nav-item active"><Link to='/' className="nav-link">Home</Link> </li>
                    <li className="nav-item active"><Link to='/uplimg/1,%201' className="nav-link">Upload Image</Link> </li> 
                    <li className="nav-item active"><Link to='/allimg' className="nav-link">View Images</Link> </li>
                    
                  </ul>

                </div>
              </nav>

              <div className="container" style={{ marginTop: 60 }}>
                {this.props.children}
              </div>

            </>
         
    );
  }
}
export default Layout;