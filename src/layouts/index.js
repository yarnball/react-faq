import React from "react";
import Link from "gatsby-link";
import MenuMobile from "../components/menu-mobile";
import MenuDesktop from "../components/menu-desktop";
import Headroom from "react-headroom";
import Stars from "../components/stars";
import Logo from "../components/logo";
import "../css/main.css";
import classNames from "classnames";
import "../css/menu-mobile.css";
import styled from "styled-components";
import { rhythm, scale } from "../utils/typography";

import MenuItems from "../components/menu-items";

console.log("version", React.version);

const Header = styled.div`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

class Template extends React.Component {
  state = { on: false };

  handleClick = e => {
    const { on } = this.state;
    this.setState({ on: !on });
  };

  renderUp(menuSectionClass, showNavClass) {
    return (
      <div className="menu-mobile">
        <div className={menuSectionClass}>
          <MenuItems
            handleClick={this.handleClick}
            showNavClass={showNavClass}
          />
        </div>
      </div>
    );
  }

  render() {
    let { on } = this.state;
    let menuToggleClass = classNames({ on: on, "menu-toggle": true });
    let menuSectionClass = classNames({ on: on, "menu-section": true });
    let showNavClass = classNames({ hidden: !on });
    const { location, children } = this.props;

    return (
      <div >
        {this.renderUp(menuSectionClass, showNavClass)}

        <Headroom
          upTolerance={5}
          downTolerance={0}
          wrapperStyle={{
            marginBottom: rhythm(1)
          }}
          style={{
            position: "relative",
            zIndex: 100,
            background: "rgba(55,61,73,0.975)",
            boxShadow:
              "0 2px 4px -1px rgba(0,0,0,0.06), 0 4px 5px 0 rgba(0,0,0,0.06), 0 1px 10px 0 rgba(0,0,0,0.08)"
          }}
        >
          <div
            className="header wrap"
            style={{
              maxWidth: 960,
              paddingTop: 0,
              padding: `${rhythm(1)} ${rhythm(1 / 2)}`,
              display: "flex",
              justifyContent: "flex-start"
            }}
          >
            <Logo />
            <div id="search-box">
              <input
                id="search"
                type="text"
                placeholder="search questions..."
              />
            </div>
            <MenuMobile
              menuToggleClass={menuToggleClass}
              menuSectionClass={menuSectionClass}
              showNavClass={showNavClass}
              handleClick={this.handleClick}
            />
          </div>
        </Headroom>

        <div
          className="menu-desktop wrap"
          style={{
            maxWidth: 960,
            paddingTop: 0
          }}
        >
          <MenuDesktop />
        </div>

        <div
          className="wrap"
          style={{
            maxWidth: 960,
            padding: `${rhythm(1)} ${rhythm(3 / 4)}`,
            paddingTop: 0
          }}
        >
          {children()}
        </div>
      </div>
    );
  }
}

Template.propTypes = {
  children: React.PropTypes.func,
  location: React.PropTypes.object,
  route: React.PropTypes.object
};

export default Template;