import React, {Component} from 'react';
import logo from '../images/revyoulogo.png';
import {
    Layout, Menu
  } from 'antd';


class Header extends Component {


  render() {
    const { Header } = Layout;

    return (
        <Header className="header">
          <div className="logo"> <img src={logo} className="App-logo" alt="logo" /></div>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            style={{ lineHeight: '64px' }}
          >
            {/* <Menu.Item key="1">nav 1</Menu.Item>
            <Menu.Item key="2">nav 2</Menu.Item>
            <Menu.Item key="3">nav 3</Menu.Item> */}
          </Menu>
        </Header> 
    );
  }
}

export default Header;

