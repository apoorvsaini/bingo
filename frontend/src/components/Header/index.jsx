import React from 'react';
import { connect } from 'react-redux';

import './style.css';
import { setNewBall } from '../../actions/bingo';


class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        
    }

    render() {
        return (
            <div className = 'header'>
            </div>
        );
    }

}

function mapDispatchToProps(dispatch) {
    return ({
        setNewBall: (data) => dispatch(setNewBall(data)),
    });
}

function mapStateToProps(props) {
    return ({
        ticketsDrawn: props.bingo.ticketsDrawn,
        ticketsData: props.bingo.ticketsData,
    });
}

export default connect(mapStateToProps, mapDispatchToProps)(Header); 