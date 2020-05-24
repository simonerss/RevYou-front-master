import React from 'react';
import { connect } from 'react-redux';
import GraphicAcceptedByYearComponent from '../../components/apresentacao/graphicAcceptedByYearComponent';
import { exportComponentAsJPEG, exportComponentAsPDF, exportComponentAsPNG } from "react-component-export-image";
import {Button} from 'antd';

class GraphicAcceptedByYear extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };
        this.getData = this.getData.bind(this);
        this.componentRef = React.createRef();        
    }

    componentWillMount() {
        this.getData();
    }

    getData() {
        const id = this.props.match.params;
        fetch(`http://localhost:5000/dataGraphic/acceptedByYear/${id.refproject}`)
            .then(data => data.json().then(data =>
                this.setState({ data })))
            .catch(erro => this.setState({ erro }));
    }

    render() {
        return (
            <div>
                <React.Fragment>
                    <h3>Accepted Studies by Year of Publication</h3>
                    <hr />                
                    <GraphicAcceptedByYearComponent {...this.state} ref={this.componentRef} />
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

export default connect(mapStateToProps, mapDispatchToProps)(GraphicAcceptedByYear);
