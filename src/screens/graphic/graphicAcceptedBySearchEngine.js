import React from 'react';
import { connect } from 'react-redux';
import GraphicAcceptedBySearchEngineComponent from '../../components/apresentacao/graphicAcceptedBySearchEngineComponent';
import { exportComponentAsJPEG, exportComponentAsPDF, exportComponentAsPNG } from "react-component-export-image";
import { Button } from 'antd';

class GraphicAcceptedBySearchEngine extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
        this.getData = this.getData.bind(this);
        this.componentRef = React.createRef();
    }

    componentWillMount() {
        this.getData();
    }

    getData() {
        const id = this.props.match.params;
        fetch(`http://localhost:5000/dataGraphic/rejectedByCriteria/${id.refproject}`)
            .then(data => data.json().then(data =>
                this.setState({ data })))
            .catch(erro => this.setState({ erro }));
    }

    render() {
        return (
            <div>
                <React.Fragment>                    
                    <GraphicAcceptedBySearchEngineComponent {...this.state} ref={this.componentRef} />
                    <Button onClick={() => exportComponentAsJPEG(this.componentRef)}>
                        Export As JPEG
                    </Button>
                    <Button onClick={() => exportComponentAsPDF(this.componentRef)}>
                        Export As PDF
                    </Button>
                    <Button onClick={() => exportComponentAsPNG(this.componentRef)}>
                        Export As PNG
                    </Button>
                </React.Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(GraphicAcceptedBySearchEngine);
