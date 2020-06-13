import React, {Component} from 'react';
import { connect } from 'react-redux';
import MainQuestion from './mainQuestion';
import SecondaryQuestion from './secondaryQuestion';
import StandardQuery from './standardQuery';
import Language from './language'
import SearchEngine from './searchEngine'
import SearchKeyword from './searchKeyword'
import SelectionCriteria from './selectionCriteria'

class Protocol extends Component{
    render() {
        return(
            <div>
                <MainQuestion {...this.props}/>
                <SecondaryQuestion {...this.props}/>
                <StandardQuery {...this.props}/>
                <SearchKeyword {...this.props}/>
                <Language {...this.props}/>
                <SearchEngine {...this.props}/>
                <SelectionCriteria {...this.props}/>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    project: state.project
});

export default connect(mapStateToProps)(Protocol);