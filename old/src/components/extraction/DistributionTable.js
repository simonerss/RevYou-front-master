import React, { Component } from 'react';
import { Form, Button, Row, Col, Tooltip, Divider, Slider } from 'antd';
import PropTypes from 'prop-types';
import DistributionRow from './DistributionRow';
import { message } from 'antd';

class DistributionTable extends Component {
  static propTypes = {
    numExtractorStudy: PropTypes.number,
    researchers: PropTypes.array.isRequired,
    studies: PropTypes.array.isRequired,
    distribution: PropTypes.object,
    type: PropTypes.string.isRequired,
    create: PropTypes.func.isRequired,
    stepId: PropTypes.string,
    avoid: PropTypes.object
  };

  static defaultProps = {
    numExtractorStudy: 1,
    distribution: {},
    avoid: {}
  };

  state = {
    sliderRange: [0, 0], 
    isSubmitting: false
  };

  handleSubmit = e => {
    e.preventDefault();
    const { type, stepId, create } = this.props;

    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({isSubmitting: true})
        create(stepId, {distribution: values, type})
        .then(
          res => {
            message.success(res.data);
          },
          error => {
            message.warning(error.data);
          }
        )
        .finally(this.setState({isSubmitting: false}));
      }
    });
  };

  onAfterChange = value => {
    this.setState({ sliderRange: value });
  };

  checkInterval = number => {
    const { sliderRange } = this.state;
    return number >= sliderRange[0] && number < sliderRange[1];
  };

  /** According to the slider values it will set all studies for a specific researcher, or none */
  sequentialDistribution = researcherId => {
    const { studies, form, avoid } = this.props;
    for (let index = 0; index < studies.length; ++index) {
      const avoidResearchers = Object.keys(avoid).length === 0? []: avoid[studies[index].id];
      const articleIndex = `[${studies[index].id}]`;
      const currentValue = form.getFieldValue(articleIndex) || [];
      const findIndex = currentValue.indexOf(researcherId);
      let newValue = currentValue;
      // add the reasearchId to the study array if it's inside the slider interval and not yet added
      // if in Conflicts distribution, it will check if researcher is inside AvoidResearcher
      if (findIndex === -1 && this.checkInterval(index) && (!avoidResearchers.includes(researcherId))) {
        newValue = currentValue.concat(researcherId);
      } else if (!this.checkInterval(index)) {
        //remove the researcher from study array if it's in, but not inside the slider interval
        newValue = currentValue.filter(item => item !== researcherId);
      }
      const valuesFiltered = newValue.filter(elem => elem !== null);
      form.setFields({
        [articleIndex]: {
          value: valuesFiltered
        }
      });
    }
  };

  render() {
    const { researchers, numExtractorStudy, form, studies, distribution, avoid } = this.props;
    const {isSubmitting} = this.state;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Row type="flex" align="middle" justify="space-around" gutter={24}>
          <Col span={14}>
            <h2>Studies</h2>
          </Col>
          <Col span={10}>
            <Slider range step={1} onAfterChange={this.onAfterChange} max={studies.length} />
            <Row type="flex" justify="center">
              {researchers.map(researcher => (
                //Flex layout uses a 24 grid layout to define the width of each "box"
                <Col key={researcher.id} span={Math.floor(24 / researchers.length)}>
                  <Tooltip placement="left" title={researcher.name}>
                    <b>{researcher.name.split(' ', 1)}</b>
                    <Button
                      shape="circle"
                      type="dashed"
                      icon="retweet"
                      onClick={() => this.sequentialDistribution(researcher.id)}
                    />
                  </Tooltip>
                </Col>
              ))}
            </Row>
          </Col>
          <Divider style={{ marginTop: 0 }} />
        </Row>
        {studies.map(study => (
          <DistributionRow
            key={study.id}
            study={study}
            researchers={researchers}
            numExtractorStudy={numExtractorStudy}
            form={form}
            distribution={distribution[study.id] || []}
            avoid={avoid[study.id]}
          />
        ))}

        <Form.Item wrapperCol={{ span: 12, offset: 12 }}>
          <Button type="primary" htmlType="submit" loading={isSubmitting}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const Distribution = Form.create({ name: 'distribution_table' })(DistributionTable);
export default Distribution;
