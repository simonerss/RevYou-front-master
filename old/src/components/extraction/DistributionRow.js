import React, { Component } from 'react';
import { Form, Checkbox, Row, Col, Tooltip, Divider } from 'antd';
import PropTypes from 'prop-types';

class DistributionRow extends Component {
  static propTypes = {
    numExtractorStudy: PropTypes.number.isRequired,
    researchers: PropTypes.array.isRequired,
    study: PropTypes.object.isRequired, 
    avoid: PropTypes.array
  };

  static defaultProps = {
    avoid: []
  };

  checkResearchNum = (rule, value, callback) => {
    const { numExtractorStudy } = this.props;
    if (value.length === numExtractorStudy) {
      callback();
      return;
    }
    callback(`The number of selected researcher for Study should be ${numExtractorStudy}.`);
  };

  render() {
    const CheckboxGroup = Checkbox.Group;
    const { study, researchers, form, distribution, avoid } = this.props;

    return (
      <Row gutter={24}>
        <Col span={14}>
          <b>{study.title}</b>
        </Col>
        <Col span={10}>
          <Form.Item>
            {form.getFieldDecorator(`[${study.id}]`, {
              initialValue: distribution || undefined,
              rules: [{ validator: this.checkResearchNum }]
            })(
             
              <CheckboxGroup style={{ width: '100%' }}>
              <Row type="flex" justify="center">    
                  {researchers.map(res => (
                    <Col key={res.id} span={Math.round(24/researchers.length)}>
                      <Tooltip placement="left" title={res.name}>
                        <Checkbox value={res.id} disabled={avoid.includes(res.id)}/>
                      </Tooltip>
                    </Col>
                  ))}
              </Row>
              </CheckboxGroup>
            
            )}
          </Form.Item>
        </Col>
        <Divider dashed style={{marginTop:0}}/>
      </Row>
    );
  }
}
export default DistributionRow;
