import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Row, Col } from 'antd';

// Estudos identificados, classificados por searchEngine
class GraphicStudiesIdentifiedBySearchEngine extends React.Component {

    render() {
        const data = this.props.data;
        return (
            <Row style={{ backgroundColor: '#ffffffff' }}>
                <Col sm={12}>
                    <h3>Number of Studies Identified by Search Engine</h3>
                    <hr />
                    <BarChart width={600} height={300} data={data.StudyBySearchEngineAmountt}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="base" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="amount" fill="#82ca9d" />
                    </BarChart>
                </Col>
            </Row>
        );
    }
};

export default GraphicStudiesIdentifiedBySearchEngine;
