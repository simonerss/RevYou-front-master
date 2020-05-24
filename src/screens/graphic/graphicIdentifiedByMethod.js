import React from 'react';
import { connect } from 'react-redux';
// import { HTTP } from '../../services/config';
import GraphicIdentifiedByMethodComponent from '../../components/apresentacao/graphicIdentifiedByMethodComponent';
import { exportComponentAsJPEG, exportComponentAsPDF, exportComponentAsPNG } from "react-component-export-image";
import { Button } from 'antd';

class GraphicIdentifiedByMethod extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dataAutomaticMethod: [],
            dataAutomaticAmount: [],
            dataManualAmount: [],
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

        fetch(`http://localhost:5000/dataGraphic/identifiedByManualsearch/${id.refproject}`)
            .then(dataManualAmount => dataManualAmount.json().then(dataManualAmount =>
                this.setState({ dataManualAmount })))
            .catch(erro => this.setState({ erro }));

        fetch(`http://localhost:5000/dataGraphic/identifiedByAutomaticSearch/${id.refproject}`)
            .then(dataAutomaticAmount => dataAutomaticAmount.json().then(dataAutomaticAmount =>
                this.setState({ dataAutomaticAmount })))
            .catch(erro => this.setState({ erro }));

        fetch(`http://localhost:5000/dataGraphic/byAutomaticSearchMethod/${id.refproject}`)
            .then(dataAutomaticMethod => dataAutomaticMethod.json().then(dataAutomaticMethod =>
                this.setState({ dataAutomaticMethod })))
            .catch(erro => this.setState({ erro }));
    }

    render() {
        return (
            <React.Fragment>                
                <GraphicIdentifiedByMethodComponent {...this.state} ref={this.componentRef} />
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
        );
    }
}

//redux
const mapStateToProps = (state) => ({
    login: state.login,
    project: state.project
})

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(GraphicIdentifiedByMethod);
