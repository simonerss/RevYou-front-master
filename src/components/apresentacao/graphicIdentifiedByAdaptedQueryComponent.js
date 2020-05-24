import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Row, Col } from 'antd';

class GraphicIdentifiedByAdaptedQueryComponent extends React.Component {

    render() {
        const data = this.props.data;
        return (
            <Row style={{ backgroundColor: '#ffffffff' }}>
                <Col sm={12}>
                    <h3>Identified Studies by Adapted Query</h3>
                    <hr />
                    <LineChart width={600} height={300} data={data.StudyByadaptedQueryAmount}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Legend />
                        <Line type="monotoneX" dataKey="value" stroke="#82ca9d" />
                    </LineChart>
                </Col>
            </Row>
        );
    }
};

export default GraphicIdentifiedByAdaptedQueryComponent;
