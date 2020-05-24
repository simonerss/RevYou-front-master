import React, {Component} from 'react';
import {
    Layout
  } from 'antd';


class Footer extends Component {


  render() {
    const { Footer } = Layout;

    return (
        <Footer style={{ textAlign: 'center' }}>
            RevYou ©2019 Supported by DCOMP/UFS
        </Footer>
    );
  }
}

export default Footer;

