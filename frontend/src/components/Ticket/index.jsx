import React from 'react';
import { connect } from 'react-redux';
import gameConfig from '../../config';

import './style.css';

import { markManualTicket } from '../../actions/bingo';

class Ticket extends React.Component {
    ticketDom = <div></div>;

    constructor(props) {
        super(props);
    }

    markTicketHandler(grid) {
        if (gameConfig.MANUAL && this.props.gameStarted) {
            if (!((this.props.id) in this.props.markedBalls) || !(this.props.markedBalls[this.props.id]).has(grid.ball)) {
                this.props.markManualTicket({tickedId: this.props.id, ball: grid.ball});
                alert(grid.ball)
            }
        }
        else {
            alert('You are not allowed to mark balls');
        }
    }

    render() {
        if (this.props.loading === true) {
            this.ticketDom = 'LOADING...';
        }
        else if (this.props.loading === false && this.props.data != null) {
            this.ticketDom = this.props.data.map(ball => (
                <div className = {((this.props.id) in this.props.markedBalls && (this.props.markedBalls[this.props.id]).has(ball)) ? 'ticket_grid_marked' : 'ticket_grid'} key = {'ticket_grid-' + ball} onClick = {(e) => this.markTicketHandler({ball})}> <span className = 'grid_ball'>{ball}</span> </div>
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
        gameStarted: props.bingo.gameStarted,
    });
}

function mapDispatchToProps(dispatch) {
    return ({
        markManualTicket: (data) => dispatch(markManualTicket(data)),
    });
}

export default connect(mapStateToProps, mapDispatchToProps)(Ticket); 