import React from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';

import api from '../../api/api-config';
import claimBingo from '../../api/claim-bingo';

import './style.css';
import { setNewBall } from '../../actions/bingo';
import { setConnected } from '../../actions/home';


class Header extends React.Component {
    socket = io.connect(api.API_URL, api.SOCKET_OPTIONS);

    constructor(props) {
        super(props);
    }

    claimBingo(event) {
        let _t = this;
        if (this.props.bingoTickets.length > 0) {
            claimBingo(this.props.bingoTickets[0]).then(function(result) {
                if (result) {
                    _t.socket.emit('winner', sessionStorage.getItem('userId'))
                }
                else {
                    alert('Invalid');
                }
            });
        }
        else {
            alert('LIAR!');
        }
    }

    startGame(event) {
        let _t = this;
        this.socket = io.connect(api.API_URL, api.SOCKET_OPTIONS);

        this.socket.emit('start', 'start');

        this.socket.on('ball', function (data) {
            _t.props.setNewBall(data);
        });

        this.socket.on('over', function (data) {
            if (data.indexOf(sessionStorage.getItem('userId') === -1)) {
                alert('Game over');
            }
            else {
                alert('Your rank is '+ (data.indexOf(sessionStorage.getItem('userId') + 1)));
            }
        });

        this.checkConnection();
    }

    checkConnection() {
        if(!this.socket.connected) {
            console.log('reconnecting...');
            this.socket = io.connect(api.API_URL, api.SOCKET_OPTIONS)
        }
    }

    componentDidMount() {
        
    }

    componentDidUpdate() {
        this.checkConnection();
    }

    render() {
        return (
            <div className = 'header'>
                <div className = 'ball_ticker_area'>
                    <button className = 'bingo_button' onClick = {(e) => this.claimBingo(e)}>
                        Shout Bingo!
                    </button>

                    <button className = 'bingo_button' onClick = {(e) => this.startGame(e)}>
                        start game!
                    </button>
                    {this.props.ballsDrawn.map((data, index) => (
                        <span className = {(index === 0) ? 'last_ball' : 'balls'} key = {'ball-' + data.time}> {data.ball} </span>
                    ))}
                </div>
            </div>
        );
    }

}

function mapDispatchToProps(dispatch) {
    return ({
        setNewBall: (data) => dispatch(setNewBall(data)),
        setConnected: (status) => dispatch(setConnected(status)),
    });
}

function mapStateToProps(props) {
    return ({
        ballsDrawn: props.bingo.ballsDrawn,
        ticketsData: props.bingo.ticketsData,
        bingoTickets: props.bingo.bingoTickets,
        connected: props.home.connected,
    });
}

export default connect(mapStateToProps, mapDispatchToProps)(Header); 