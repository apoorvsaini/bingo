import React from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';

import api from '../../api/api-config';
import claimBingo from '../../api/claim-bingo';

import './style.css';
import { setNewBall, stopGame, startGame } from '../../actions/bingo';
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
            console.log(data);
            if (data.userId === sessionStorage.getItem('userId')) {
                alert('You finished # '+ data.rank);
            }
            _t.props.stopGame();
        });

        this.checkConnection();
        this.props.startGame();
    }

    checkConnection() {
        if(!this.socket.connected) {
            console.log('reconnecting...');
            this.socket = io.connect(api.API_URL, api.SOCKET_OPTIONS)
        }
    }

    componentDidUpdate() {
        this.checkConnection();
    }

    render() {
        let startButton = <div></div>;
        let bingoButtton = <div></div>;
        if (this.props.gameStarted === true) {
            alert('started');
            startButton = <div></div>;
            bingoButtton = <button className = 'bingo_button' onClick = {(e) => this.claimBingo(e)}>Shout Bingo!</button>
        }    
        else {
            startButton = <button className = 'bingo_button' onClick = {(e) => this.startGame(e)}>Start Game!</button>;
            bingoButtton = <div></div>;
        }

        return (
            <div className = 'header'>
                <div className = 'ball_ticker_area'>
                    <button className = 'bingo_button' onClick = {(e) => this.claimBingo(e)}>
                        Shout Bingo!
                    </button>
                    {startButton}
                    {bingoButtton}
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
        startGame: () => dispatch(startGame()),
        stopGame: () => dispatch(stopGame()),
    });
}

function mapStateToProps(props) {
    return ({
        ballsDrawn: props.bingo.ballsDrawn,
        ticketsData: props.bingo.ticketsData,
        bingoTickets: props.bingo.bingoTickets,
        connected: props.home.connected,
        gameStarted: props.home.gameStarted,
    });
}

export default connect(mapStateToProps, mapDispatchToProps)(Header); 