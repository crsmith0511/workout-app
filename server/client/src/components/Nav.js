import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
// import * as actions from '../actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faChartPie, faDoorClosed} from "@fortawesome/free-solid-svg-icons";

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
          <li><Link to="/home"><FontAwesomeIcon icon={faHome} /> Home</Link></li>
          <li style={{marginLeft: "5px"}}><Link to="/home"><FontAwesomeIcon icon={faChartPie}/> Activity</Link></li>
          <li style={{color: "#22212e"}} onClick={handleLogoutClick}><FontAwesomeIcon icon={faDoorClosed} /> Sign Out</li>
        </React.Fragment>

      );
  }


  return (
    <NavContainer>
      <NavUl style={{marginLeft: "-3%"}}>
        {renderLinks()}
      </NavUl>
    </NavContainer>
  );
};

export default Nav;


const NavContainer = styled.div`
  background-color: #c7d0ed;
  display: block;
  color: #dfdee3;
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
    color: #dfdee3;
  }
  width: 100%;
`;

const NavUl = styled.ul`
  background-color: #c7d0ed;
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
    color: #22212e;
  }
`;

