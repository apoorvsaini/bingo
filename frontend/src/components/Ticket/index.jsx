import React from 'react';
import { connect } from 'react-redux';

import './style.css';

class Ticket extends React.Component {
    ticketDom = <div></div>;

    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.loading === true) {
            this.ticketDom = 'LOADING...';
        }
        else if (this.props.loading === false && this.props.data != null) {
            this.ticketDom = this.props.data.map(ball => (
                <div className = {((this.props.id) in this.props.markedBalls && (this.props.markedBalls[this.props.id]).indexOf(ball) !== -1) ? 'ticket_grid_marked' : 'ticket_grid'} key = {'ticket_grid-' + ball}> <span className = 'grid_ball'>{ball}</span> </div>
            ));
        }
        else {
            this.ticketDom = 'ERROR!';
        }

        return (
            <div className = 'ticket'>
                {this.ticketDom}
            </div>
        );
    }

}

function mapStateToProps(props) {
    return ({
        markedBalls: props.bingo.markedBalls,
    });
}



export default connect(mapStateToProps, null)(Ticket); 