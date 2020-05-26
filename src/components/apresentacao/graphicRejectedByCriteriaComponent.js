import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Row, Col } from 'antd';


class GraphicRejectedByCriteriaComponent extends React.Component {

    render() {
        const data = this.props.data.rejectedByCriteriaAmount;

        // let date = new Date();
        // let dia = date.getDate();
        // let mes = date.getMonth();
        // mes = ("00" + (mes+1)).slice(-2);
        // let ano = date.getFullYear();
        // let r = Math.random().toString(36).substring(7).toUpperCase();


        return (
            <Row style={{ backgroundColor: '#ffffffff' }}>
                <Col sm={12}>
                    <h4>Number of Studies Rejected By Selection Criteria</h4>
                    <hr />
                    <BarChart width={100} height={300} data={data}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="amount" fill="#33adff" />
                    </BarChart>
                </Col>
            </Row>
        );
    }
}

export default GraphicRejectedByCriteriaComponent;
