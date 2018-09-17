import React from 'react';
import { connect } from 'react-redux';

import '../../assets/bulma.min.css';
import './style.css';
import { setUserId, setErr } from '../../actions/home';
import auth from '../../api/auth';

import BingoContainer from '../BingoContainer';
import Header from '../Header';

class Home extends React.Component {
    homeDom = <div></div>;

    constructor(props) {
        super(props);
    }

    authenticate() {
        let _t = this;

        auth().then(function(userId) {
            if ((userId !== null|| userId !== undefined) && userId.length > 0) {
                _t.props.setUserId(userId);
                _t.props.setErr(false);
            }
            else {
                _t.props.setErr(true);
            }
        })
        .catch(function (error) {
            _t.props.setUserId(null);
            _t.props.setErr(true);
        });
    }

    componentDidMount() {
        // get the userId
        this.authenticate();
    }

    render() {
        if ((this.props.userId === null || this.props.userId === undefined) && this.props.showErr === false) {
            this.homeDom = 'Loading...';
        }
        else if (this.props.showErr === true) {
            this.homeDom = 'Error';
        }
        else {
            this.homeDom = <BingoContainer />;
        }

        return (
          <div className = 'home'>
            <Header userId = {this.props.userId} />
            { this.homeDom }
          </div>
        );
    }

}

function mapDispatchToProps(dispatch) {
    return ({
        setUserId: (userId) => dispatch(setUserId(userId)),
        setErr: (error) => dispatch(setErr(error)),
    });
}

function mapStateToProps(props) {
    return ({
        userId: props.home.userId,
        showErr: props.home.showErr,
        restart: props.home.restart
    });
}

export default connect(mapStateToProps, mapDispatchToProps)(Home); 