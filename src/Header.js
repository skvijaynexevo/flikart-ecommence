import React, { Component } from 'react';
import logo from '../src/logo.png'

class Header extends Component {
    render() {
        return (
            <header>
          <div className="navbar fixed-top navbar-dark bg-blue box-shadow">
            <div className="container d-flex justify-content-between">
              <a href="" className="navbar-brand d-flex align-items-center">
                <img src={logo} style={{width :'100px'}}/>
              </a>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarHeader" aria-controls="navbarHeader"
                aria-expanded="false" aria-label="Toggle navigation">
                <span className="glyphicon glyphicon-shopping-cart" data-toggle="modal" data-target="#exampleModal">
                  <i className="fas fa-shopping-cart"></i>
                  <span className="counter">
                    No. of Items: {this.props.noItems} </span>
                    <span className="counter">
                   Total: ${this.props.total}
                  </span>
                </span>
              </button>
            </div>
          </div>
        </header>
        );
    }
}

export default Header;
