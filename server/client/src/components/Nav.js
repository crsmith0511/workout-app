import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
// import * as actions from '../actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faChartPie, faDoorClosed} from "@fortawesome/free-solid-svg-icons";
import './Nav.css';

const Nav = user => {
  const handleLogoutClick = () => {
    window.open('http://localhost:5000/logout', "_self");
  };

  const renderLinks = () => {
      return (
        <React.Fragment>
          <li></li>
          <li><Link to="/home"><FontAwesomeIcon icon={faHome} /> Home</Link></li>
          <li style={{marginLeft: "5px"}}><Link to="/home"><FontAwesomeIcon icon={faChartPie}/> Activity</Link></li>
          <li style={{color: "#22212e"}} onClick={handleLogoutClick}><FontAwesomeIcon icon={faDoorClosed} /> Sign Out</li>
          {/* <li style={{color: "#22212e"}}><Link to="/home"> Welcome!</Link></li> */}
        </React.Fragment>

      );
  }


  return (
    <NavContainer>
      <NavUl style={{marginLeft: "-4%"}}>
        {renderLinks()}
      </NavUl>
    </NavContainer>
  );
};

export default Nav;


const NavContainer = styled.div`
background-color: #9fa6be;
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
    color: #22212e;
  }
  width: 100%;
`;

const NavUl = styled.ul`
  background-color: #9fa6be;
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

