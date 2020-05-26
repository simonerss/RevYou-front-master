import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Row, Col } from 'antd';

class graphicAcceptedByYearComponent extends React.Component {
    render() {
        const data = this.props.data.acceptedByYearAmount;   

        return (
            <Row style={{ backgroundColor: '#ffffffff' }}>
                <Col sm={12}>
                    <LineChart width={600} height={300} data={data}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <XAxis dataKey="year" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="amount" stroke="#8884d8"  />
                    </LineChart>
                </Col>
            </Row>
        );
    }
};

export default graphicAcceptedByYearComponent;
