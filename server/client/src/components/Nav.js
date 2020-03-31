import React from "react";
import { NavLink, Link } from "react-router-dom";
import styled from "styled-components";
import * as actions from '../actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCampground, faCommentAlt, faInbox, faChartPie, faSmile} from "@fortawesome/free-solid-svg-icons";

import './Nav.css';

// //loops through users
// renderPerson = (p) => {
//     return(
//       <Image src={p.profile_pic_url} roundedCircle fluid width="30px" height='30px'/>
//     )
//   }

const Nav = () => {

  const handleLogoutClick = () => {
    // Logout using Google passport api
    // Set authenticated state to false in the HomePage
    window.open('http://localhost:5000/logout', "_self");
  };

  const renderLinks = () => {

      return (
        <React.Fragment>
          <li></li>
          <li><Link to="/home"><FontAwesomeIcon icon={faCampground} /> Home</Link></li>
          <li><Link to="/home"><FontAwesomeIcon icon={faCommentAlt}/> Pings</Link></li>
          <li><Link to="/home"><FontAwesomeIcon icon={faInbox}/> Hey!</Link></li>
          <li><Link to="/home"><FontAwesomeIcon icon={faChartPie}/> Activity</Link></li>
          <li><Link to="/home"><FontAwesomeIcon icon={faSmile}/> My Stuff</Link></li>
          <li onClick={handleLogoutClick}>Sign Out</li>
          <li onClick={handleLogoutClick}>Sign Out</li>
          

        </React.Fragment>

      );
  }


  return (
    <NavContainer>
      <NavUl>
        {renderLinks()}
      </NavUl>
    </NavContainer>
  );
};

// function mapStateToProps(state) {
//     return {
//       authenticated: state.auth.authenticated,
//       email: state.auth.email
//     };
//   }
  
//   export default connect(mapStateToProps, actions)(Nav);
export default Nav;


const NavContainer = styled.div`
  background-color: #f6f2ef;
  display: block;
  color: #283c46
  margin: 0;
  width: 100%;
  height: auto;
  z-index: 6;
  #logo {
    float: left;
    width: 50px;
    height: auto;
  }
  a {
    color: #283c46;
  }
  width: 100%;
`;

const NavUl = styled.ul`
  background-color: rgba(246,242,239,0.9);
  display: fixed;
  flex-direction: row;
  justify-content: center;
  list-style: none;
  li:first-child {
    float: right;
  }
  li {
    padding: 20px;
  }
  li a {
    color: #283c46;
  }
`;

