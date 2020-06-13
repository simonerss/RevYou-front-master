// import React from 'react';
// import { Collapse, Table, Row, Input, Button } from 'antd';
// import Highlighter from 'react-highlight-words';
// import { SearchOutlined } from '@ant-design/icons';

// const Panel = Collapse.Panel;

// const GraphicBubbleIdentifiedStudiesComponent = ({ studies, dataYear, dataBaseName }) => {
//     let study = '';
//     let base = '';
//     let amountYear = 0;


//     console.log(dataBaseName);
//     const dataGraphic = dataYear.map(datay => {
//         amountYear = 0;
//         study = studies.map(datas => {
//             if (datas.year === datay.year) {
//                 amountYear++;
//             }
//         })
//         return ({ ano: (datay.year), qtd: amountYear});
//     }

//     )

//     console.log(dataGraphic);

//     return (
//         <div>
//             {/* <Row>
//                 <Collapse defaultActiveKey={['1', '2']} marginBottom="20">
//                     <Panel marginBottom={20} showArrow={false} accordion={false} key="1"
//                         header={<h3>Search Engine Distribuition</h3>} >

//                         <Table columns={columns} dataSource={data} rowKey={data => data.key} />

//                     </Panel>
//                 </Collapse>
//             </Row> */}
//         </div>
//     );
// };

// export default GraphicBubbleIdentifiedStudiesComponent;
