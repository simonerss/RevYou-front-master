// import React from 'react';
// import DataTable from 'react-redux-datatable';
// import 'react-redux-datatable/dist/styles.css';

// const apiLocation = 'https://my.api/service';

// const tableSettings = {
//     tableID: 'DataTable',
//     keyField: 'ref_id',
//     tableColumns: [
//         {
//             title: 'Ref',
//             key: 'ref_id',
//             filter: 'NumberFilter',
//             defaultValue: { comparator: '=' },
//         },
//         {
//             title: 'First Name',
//             key: 'first_name',
//         },
//         {
//             title: 'Surname',
//             key: 'surname',
//         },
//         {
//             title: 'Type',
//             key: 'type',
//             filter: 'SelectFilter',
//             filterOptions: {
//                 Add: 'Add',
//                 Amend: 'Amend',
//                 Remove: 'Remove',
//             },
//         },
//     ],
// };

// const ProjectInvitationsTest = () => (
//     <DataTable
//         tableSettings={tableSettings}
//         apiLocation={apiLocation}
//     />
// );

// export default ProjectInvitationsTest;