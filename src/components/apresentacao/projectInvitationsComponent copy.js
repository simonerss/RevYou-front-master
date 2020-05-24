import React from 'react';
// import { storiesOf } from '@storybook/react';
// import { categoryName } from './_base';
import moment from 'moment';
import Datatable from 'react-bs-datatable';


const header = [
    { title: 'E-mail Researcher', prop: 'email', filterable: true },
    { title: 'Situation', prop: 'situation', sortable: true, filterable: true },
    { title: 'Send Date', prop: 'createdAt', sortable: true, filterable: true },
    { title: 'Updated Date', prop: 'updatedAt', sortable: true, filterable: true }
];

const onSortFunction = {
    date(columnValue) {
        return moment(columnValue, 'Do MMMM YYYY').valueOf();
    }
};

const projectInvitationsComponent = ({ inviteds }) => {
    return (
        <div>
            <h2>Project Sent Invitations</h2>
            <hr />
            <Datatable
                tableHeaders={header}
                tableBody={inviteds}
                tableClass="striped hover responsive"
                rowsPerPage={5}
                rowsPerPageOption={[5, 10, 15, 20]}
                initialSort={{ prop: 'name', isAscending: true }}
                onSort={onSortFunction}
            />
        </div>
    );
};

export default projectInvitationsComponent;
