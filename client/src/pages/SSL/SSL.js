import React, { Component } from 'react';
import API from '../../utils/API';
import { withRouter } from "react-router";

class SSL extends Component {
    state = {
        SSL: ''
    };

    componentDidMount() {
        API.ssl(process.env.REACT_APP_SSL_TOKEN)
        .then(res => this.setState({SSL: res.data.SSL}))
    };

    render() {
        return (<div>null</div>);
    }
}

export default withRouter(SSL);