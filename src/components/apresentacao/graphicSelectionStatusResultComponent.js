import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Row, Col } from 'antd';


class GraphicSelectionStatusResultComponent extends React.Component {

    render() {
        const data = this.props.data;

        return (
            <Row style={{ backgroundColor: '#ffffffff' }}>
                <Col sm={12}>
                    <h4>Studies in Each Status After the Selection Step</h4>
                    <hr />
                    <BarChart width={600} height={300} data={data.StudyStatusAmount}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="status" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="amount" fill="#8884d8" />
                    </BarChart>
                </Col>
            </Row>
        );
    }
}

export default GraphicSelectionStatusResultComponent;