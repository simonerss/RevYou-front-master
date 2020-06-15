import React from 'react';
import { connect } from 'react-redux';
// import { HTTP } from '../../services/config';
import GraphicIdentifiedByMethodComponent from '../../components/apresentacao/graphicIdentifiedByMethodComponent';
import { exportComponentAsJPEG, exportComponentAsPDF, exportComponentAsPNG } from "react-component-export-image";
import { Button } from 'antd';
import {HTTP} from '../../services/config';

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

        HTTP.get(`dataGraphic/identifiedByManualsearch/${id.refproject}`)
            .then(res => {
                let dataManualAmount = res.data;
                this.setState({ dataManualAmount });
            }).catch(erro => this.setState({ erro }));

        HTTP.get(`dataGraphic/identifiedByAutomaticSearch/${id.refproject}`)
            .then(res => {
                let dataAutomaticAmount = res.data;
                this.setState({ dataAutomaticAmount });
            }).catch(erro => this.setState({ erro }));

        HTTP.get(`dataGraphic/byAutomaticSearchMethod/${id.refproject}`)
            .then(res => {
                let dataAutomaticMethod = res.data;
                this.setState({ dataAutomaticMethod });
            }).catch(erro => this.setState({ erro }));

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
