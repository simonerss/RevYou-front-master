import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Row, Col } from 'antd';

class GraphicIdentifiedByMethodComponent extends React.Component {

    render() {

        const dataManualAmount = this.props.dataManualAmount;
        const dataAutomaticAmount = this.props.dataAutomaticAmount;
        const dataAutomaticMethod = this.props.dataAutomaticMethod;

        const searchMethod = [
            { method: 'Automatic Search', amount: parseInt(dataAutomaticAmount, 10) },
            { method: 'Manual Search', amount: parseInt(dataManualAmount, 10) }
        ];

        return (
            <Row style={{backgroundColor: '#ffffffff'}}> 
                <Col sm={12}>
                    <h3>Identified Studies by Search Method</h3>
                    <hr />
                    <BarChart width={600} height={300} data={searchMethod}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="method" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="amount" fill="#990000" />
                    </BarChart>
                    <hr />

                    <BarChart width={600} height={300} data={dataAutomaticMethod.automaticSearchAmount}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="method" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="amount" fill="#cc0000" />
                    </BarChart>
                    <hr />
                </Col>
            </Row>
        );
    }
}

export default GraphicIdentifiedByMethodComponent;