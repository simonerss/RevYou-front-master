import React, { Component } from 'react';
import { Table, Button, Modal} from 'antd';
import { formStatus } from './../../util/constants';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

class FormTable extends Component {
  static propTypes = {
    forms: PropTypes.array.isRequired,
    researchers: PropTypes.array,
    formComp: PropTypes.object.isRequired, 
  };

  static defaultProps = {
    researchers: []
  };

  state = { visible: false, title: '', formId: '', type: '' };

  showModal = (status, formId, type) => {
    this.setState({
      visible: true,
      title: status,
      formId: formId,
      type: type
    });
  };

  closeModal = () => {
    this.setState({
      visible: false
    });
  };

  getButtonFormConfig = form => {
    const { currentResearcher, researchers } = this.props;
    let config = {};
    switch (form.status) {
      case formStatus.ON_GOING:
        config.color = 'DodgerBlue';
        break;
      case formStatus.FILLED:
        config.color = 'LimeGreen';
        break;
      default:
        config.color = 'white';
        break;
    }
    //this table will be use at StepSetting to show all final answer from a STEP already finished
    config.disabled = researchers.length > 0 ? form.ResearcherId !== currentResearcher.id : false;
    return config;
  };

  render() {
    const { forms, researchers, currentResearcher } = this.props;
    const FormComponent = this.props.formComp;
    const { title, formId, type } = this.state;
    const filterResearcher = researchers.map(r => ({ text: r.name, value: r.id }));
    const columns = [
      {
        title: 'Title',
        colSpan: 15,
        dataIndex: 'title',
        sorter: (a, b) => {
          if (a.title[0] < b.title[0]) {
            return -1;
          }
          if (a.title[0] > b.title[0]) {
            return 1;
          }
          return 0;
        },
        sortDirections: ['ascend', 'descend'],
        render: (text) => {
          return {
            children: <b>{text}</b>,
            props: {
              colSpan: 15
            },
          };
        }
      },
      {
        title: 'Forms',
        dataIndex: 'Forms',
        filters: filterResearcher,
        filterMultiple: false,
        colSpan: 9,
        filteredValue: filterResearcher.some( res => res.value === currentResearcher.id)? 
          [currentResearcher.id] : [],  
        render: (forms, row) =>
        <>
          {forms.map(form => {
            const config = this.getButtonFormConfig(form);
            return (
              <Button
                key={form.id}
                onClick={() => this.showModal(row.title, form.id, form.type)}
                icon="form"
                disabled={config.disabled}
                style={{marginRight: "0.2em", backgroundColor:config.color}}
              />
            );
          })}
          </>,
        onFilter: (value, record) => {
          let wasFound = false;
          record.Forms.forEach(form => {
            if (form.ResearcherId === value) {
              wasFound = true;
            }
          });
          return wasFound;
        }
      }
    ];
    return (
      <>
        <Table dataSource={forms} columns={columns} size="middle" rowKey='id'/>
        <Modal title={<b>{type.toUpperCase()+'-'+title}</b>} visible={this.state.visible} destroyOnClose={true} footer={null}
        closable centered={true} onCancel={this.closeModal} width={700} 
        style={{whiteSpace: "initial"}}>
          {/* FormComponent changes according to ExtractionForm or ConflictForm, this implementation
          follows https://stackoverflow.com/questions/48919320/react-how-to-pass-props-to-a-component-passed-as-prop */}
          {React.cloneElement(FormComponent, {formId: formId, closeModal:this.closeModal, type})}

        </Modal>
      </>
    );
  }
}

export default connect(state => ({
  currentResearcher: state.researcher
}))(FormTable);
