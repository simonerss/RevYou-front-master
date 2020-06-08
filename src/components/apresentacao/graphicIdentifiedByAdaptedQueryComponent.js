import React from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts';
import { Row, Col } from 'antd';

class GraphicIdentifiedByAdaptedQueryComponent extends React.Component {

    render() {
        const data = this.props.data.StudyByadaptedQueryAmount;
        
        return (
            <Row style={{ backgroundColor: '#ffffffff' }}>
                <Col sm={12}>
                    <h3>Identified Studies by Adapted Query</h3>
                    <hr />
                    <BarChart width={700} height={300} data={data}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" fill="#4d004d" />
                    </BarChart>
                </Col>
            </Row>
        );
    }
};

export default GraphicIdentifiedByAdaptedQueryComponent;
