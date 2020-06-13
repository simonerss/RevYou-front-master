import React, { Component } from 'react';
import { connect } from 'react-redux';
import StudiesInSelectionConflictComponent from '../../components/apresentacao/studiesInSelectionConflictComponent';
import { HTTP } from '../../services/config';

class StudiesInSelectionConflict extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
        this.getData = this.getData.bind(this);
    }

    componentWillMount() {
        this.getData();
    }

    getData() {
        const id = this.props.match.params;
        HTTP.get(`study/studiesInConflict/${id.refproject}`).then(res => {
            let data = res.data.map(data => {
                return {
                    key: data.id,
                    title: data.title,
                    authors: data.authors,
                    year: data.year,                    
                    base: data.base,
                    sr_status: data.sr_status,
                    citekey: data.citekey,
                    abstract: data.abstract,
                    keywords: data.keywords,
                    venue: data.venue,                    
                    pages: data.pages,
                    volume: data.volume,
                    url: data.url,
                    issn: data.issn,
                    doi: data.doi,
                    search: data.search,
                    generalStatus: data.generalStatus,
                    venueType: data.venueType,
                    createdAt: data.createdAt,
                    updatedAt: data.updatedAt,
                    selectionstatus: 'in_conflict',
                };
            });
            this.setState({ data });
        });
    }

    render() {
        console.log(this.state);
        return (
            <div>
                <h3>Conflict Studies In Selection Step</h3><hr />
                <StudiesInSelectionConflictComponent {...this.state} />
            </div>
        );
    }
}

//redux
const mapStateToProps = (state) => ({
    login: state.login,
    project: state.project
})

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(StudiesInSelectionConflict);
