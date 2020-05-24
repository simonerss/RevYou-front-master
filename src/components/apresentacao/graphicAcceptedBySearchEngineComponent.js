import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Row, Col } from 'antd';

class GraphicAcceptedBySearchEngineComponent extends React.Component {

    render() {
        const data = this.props.data;
        return (
            <Row style={{ backgroundColor: '#ffffffff' }}>
                <Col sm={12}>
                    <h4>Number of Studies Accepted By Search Engine</h4>
                    <hr />
                    <BarChart width={600} height={300} data={data.acceptedBySearchEngine}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="description" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="amount" fill="#e60000" />
                    </BarChart>
                </Col>
            </Row >
        );
    }
};

export default GraphicAcceptedBySearchEngineComponent;
