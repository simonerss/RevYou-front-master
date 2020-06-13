import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout, Menu, Icon } from 'antd';
import { stepStatus } from '../util/constants';
import { Link } from 'react-router-dom';
import {login} from '../reducers/login/actions'

class Sider extends Component {
    constructor(props){
        super(props);
        this.state = {
            bases : [],
            selectedProject: true,
        } 
        this.handleLogout = this.handleLogout.bind(this);
    }

    async componentDidUpdate(prevProps, prevState) {
        if (prevProps.bases !== this.props.bases) {
            const bases = await this.props.bases.map(base => 
            (
                <Menu.Item key={base}>
                    <Link to={`/identification/specificbase/${base}`}>
                        {base}
                    </Link>
                </Menu.Item>
            ));
            this.setState({bases})
        }
        
        if(prevState.selectedProject === true && this.props.project.id){
          this.setState({selectedProject: false});
        }
    }

    handleLogout(){
      this.props.loginAct(undefined,undefined);
    }

  render() {
    const { SubMenu } = Menu;
    const { Sider } = Layout;
    const { step } = this.props;
    const isStep = Object.keys(step).length !== 0;
    return (
      <Sider width={200} style={{ background: '#fff' }}>
        <Menu
          mode="inline"
          defaultSelectedKeys={['9']}
          defaultOpenKeys={['sub3']}
          style={{ height: '100%', borderRight: 0 }}
        >
          <SubMenu key="User" title={<span><Icon type="user" />User</span>}>
            <Menu.Item key="1"><Link to="/home">Projects</Link></Menu.Item>
            <Menu.Item key="2"><Link to="/userprofile">Profile</Link></Menu.Item>
          </SubMenu>
          <SubMenu key="Project" disabled={this.state.selectedProject} title={<span><Icon type="laptop"/>Project</span>}>
          {/* <SubMenu key="Project" title={<span><Icon type="laptop"/>Project</span>}> */}
            <Menu.Item key="3"><Link to="/project/protocol">Edit Protocol</Link></Menu.Item>
            {/* <Menu.Item key="4"><Link to={`/searchEngineDistribuition/${this.state.projectid}`}>Search Engine Distribuition</Link></Menu.Item> */}
            <Menu.Item key="4"><Link to="/project/inviteresearchers">Invite Researcher</Link></Menu.Item>
            <Menu.Item key="5"><Link to="/project">Edit Basic Information</Link></Menu.Item>
          </SubMenu>
          <SubMenu key="Identification" disabled={this.state.selectedProject} title={<span><Icon type="file-search" />Identification</span>}>
          {/* <SubMenu key="Identification"  title={<span><Icon type="file-search" />Identification</span>}> */}
            <Menu.Item key="6"><Link to="/identification/setResearcherBase">Set Researchers</Link></Menu.Item>
            <Menu.Item key="7"><Link to="/identification">Resume Search Sessions</Link></Menu.Item>
            <Menu.Item key ="8"><Link to="/identification/studyManually">Add study manually</Link></Menu.Item>
            {this.state.bases}
            <Menu.Item key="81"><Link to="/identification/duplicates">Duplicate Studies</Link></Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub3"
            title={
              <span>
                <Icon type="notification" />
                Extraction
              </span>
            }
          >
            <Menu.Item key="9">
              <Link to="/extraction/step">
                <Icon type="setting" />
                Setting Step
              </Link>
            </Menu.Item>
            {isStep && (
              <Menu.Item key="10">
                <Link to="/extraction/template">
                  <Icon type="build" />
                  Template Form
                </Link>
              </Menu.Item>
            )}
            {isStep && (step.status === stepStatus.SETTING || step.status === stepStatus.ON_GOING) && (
              <Menu.Item key="11">
                <Link to="/extraction/distribution">
                  <Icon type="cluster" />
                  Distribution
                </Link>
              </Menu.Item>
            )}
            {isStep &&
              (step.status === stepStatus.SETTING_DECISORS ||
                step.status === stepStatus.REVIEWING ||
                step.status === stepStatus.SOLVING_CONFLICTS) && (
                <Menu.Item key="12">
                  <Link to="/extraction/conflicts">
                    <Icon type="cluster" />
                    Distribution
                  </Link>
                </Menu.Item>
              )}
            {isStep && step.status === stepStatus.ON_GOING && (
              <Menu.Item key="13">
                <Link to="/extraction/form">
                  <Icon type="form" />
                  Extraction Forms
                </Link>
              </Menu.Item>
            )}
            {isStep && step.status === stepStatus.SOLVING_CONFLICTS && (
              <Menu.Item key="14">
                <Link to="/extraction/conflict">
                  <Icon type="file-unknown" />
                  Conflict Forms
                </Link>
              </Menu.Item>
            )}
            {isStep && (
              <Menu.Item key="15">
                <Link to="/extraction/control">
                  <Icon type="dashboard" /> Control
                </Link>
              </Menu.Item>
            )}
            <Menu.Item key="16">
              <Link to="/extraction/previous">
                <Icon type="read" /> Previous Steps
              </Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="99" onClick={this.handleLogout}><Icon type="logout"/>Logout<Link to="/"/></Menu.Item>
        </Menu>
      </Sider>
    );
  }
}

const mapStateToProps = state => ({
  bases: state.bases,
  step: state.step,
  project: state.project
});

const mapDispatchToProps = (dispatch) => ({
  loginAct: (email, id) => {
    dispatch(login({email, id}))
  } 
})

export default connect(mapStateToProps, mapDispatchToProps)(Sider);
