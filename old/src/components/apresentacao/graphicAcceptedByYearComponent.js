import React from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts';
import { Row, Col } from 'antd';

class graphicAcceptedByYearComponent extends React.Component {
    render() {
        const data = this.props.data.acceptedByYearAmount;          
        return (
            <Row style={{ backgroundColor: '#ffffffff' }}>
                <Col sm={12}>
                <BarChart width={700} height={300} data={data}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="amount" fill="#cc5200" />
                    </BarChart>
                </Col>
            </Row>
        );
    }
};

export default graphicAcceptedByYearComponent;
