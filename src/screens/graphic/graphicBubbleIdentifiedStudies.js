import React from 'react';
import { connect } from 'react-redux';
import GraphicBubbleIdentifiedStudiesComponent from '../../components/apresentacao/graphicBubbleIdentifiedStudiesComponent';
// import { exportComponentAsJPEG, exportComponentAsPDF, exportComponentAsPNG } from "react-component-export-image";
// import { Button } from 'antd';

class GraphicBubbleIdentifiedStudies extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            studies: [],
            dataYear: [],
            dataBaseName: [],
        };
        this.getData = this.getData.bind(this);
        this.componentRef = React.createRef();
    }

    componentWillMount() {
        this.getData();
    }

    getData() {
        const id = this.props.match.params;

        fetch(`http://localhost:5000/study/identified/${id.refproject}`)
            .then(studies => studies.json().then(studies =>
                this.setState({ studies })))
            .then(
                fetch(`http://localhost:5000/dataGraphic/studiesPublishYear/${id.refproject}`)
                    .then(dataYear => dataYear.json().then(dataYear =>
                        this.setState({ dataYear })))
            ).then(
                fetch(`http://localhost:5000/dataGraphic/studiesSearchEngine/${id.refproject}`)
                    .then(dataBaseName => dataBaseName.json().then(dataBaseName =>
                        this.setState({ dataBaseName })))
            ).catch(erro => this.setState({ erro }));
    }

    render() {
        return (
            <div>
                <React.Fragment>
                    <GraphicBubbleIdentifiedStudiesComponent {...this.state} ref={this.componentRef} />
                    {/*    
                    <Button onClick={() => exportComponentAsJPEG(this.componentRef)}>
                        Export As JPEG
                    </Button>
                    <Button onClick={() => exportComponentAsPDF(this.componentRef)}>
                        Export As PDF
                    </Button>
                    <Button onClick={() => exportComponentAsPNG(this.componentRef)}>
                        Export As PNG
                    </Button>
                    */}
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

export default connect(mapStateToProps, mapDispatchToProps)(GraphicBubbleIdentifiedStudies);
