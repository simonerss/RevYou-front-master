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
                    citekey: data.citekey,
                    abstract: data.abstract,
                    keywords: data.keywords,
                    venue: data.venue,
                    year: data.year,
                    pages: data.pages,
                    volume: data.volume,
                    url: data.url,
                    issn: data.issn,
                    doi: data.doi,
                    base: data.base,
                    search: data.search,
                    generalStatus: data.generalStatus,
                    venueType: data.venueType,
                    createdAt: data.createdAt,
                    updatedAt: data.updatedAt,
                    sr_id: data.sr_id,
                    sr_status: data.sr_status,
                    sr_createdat: data.sr_createdat,
                    sr_updatedat: data.sr_updatedat,
                    ss_id: data.ss_id,
                    startDate: data.startDate,
                    endDate: data.endDate,
                    dateChecker: data.dateChecker,
                    dateConflicts: data.dateConflicts,
                    method: data.method,
                    ss_status: data.ss_status,
                    ratedContent: data.ratedContent,
                    numCheckerStudy: data.numCheckerStudy,
                    scoreBoard: data.scoreBoard,
                    ss_createdat: data.ss_createdat,
                    ss_updatedat: data.ss_updatedat
                };
            });
            this.setState({ data });
        });
    }

    render() {
        console.log(this.state);
        return (
            <div>
                <h3>Studies In Selection Conflict</h3><hr />
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
