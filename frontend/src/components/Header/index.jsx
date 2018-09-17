import React from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';

import api from '../../api/api-config';
import validateBingo from '../../api/claim-bingo';

import './style.css';
import '../../assets/bulma.min.css';
import { setNewBall, stopGame, startGame } from '../../actions/bingo';
import { setConnected } from '../../actions/home';


class Header extends React.Component {
    socket = io.connect(api.API_URL, api.SOCKET_OPTIONS);
    startButton = <div></div>;
    bingoButtton = <div></div>;
    timer = false;

    constructor(props) {
        super(props);
        //this.socket = io.connect(api.API_URL, api.SOCKET_OPTIONS);
    }

    claimBingo(event) {
        let _t = this;
        if (this.props.bingoTickets.length > 0) {
            validateBingo(this.props.bingoTickets[0]).then(function(result) {
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
            if (_t.props.gameStarted) {
                console.log(_t.props.ballsDrawn.length);
                _t.props.setNewBall(data);
            }
        });

        this.socket.on('over', function (data) {
            console.log(data);
            if (data.userId === sessionStorage.getItem('userId')) {
                alert('Your won!');
            }
            else {
                alert('Your Lost!');
            }
            _t.props.stopGame();
            _t.socket.emit('stop', 'stop');
            window.location.reload();
        });

        this.props.startGame();

        // If no new balls are received in next 2 seconds, restart
        if (!this.timer) {
            if(!this.socket.connected) {
                this.timer = setInterval(function(){ 
                    console.log('retrying...' + _t.socket.connected);
                    if(_t.props.ballsDrawn.length === 0) {
                        console.log('restart...');
                        _t.startGame();
                    }
                    else {
                        clearInterval(_t.timer);
                        _t.timer = false;
                    }
                }, 2000);
            }
        }
    }

    checkConnection() {
        if(!this.socket.connected) {
            console.log('reconnecting...');
            this.socket = io.connect(api.API_URL, api.SOCKET_OPTIONS);
        }
    }

    render() {
        if (this.props.gameStarted === true && this.socket.connected) {
            this.startButton = <div></div>;
            this.bingoButtton = <button className = 'bingo_button button is-danger' onClick = {(e) => this.claimBingo(e)}>Shout Bingo!</button>
        }
        else if (this.props.gameStarted === true && !this.socket.connected) {
            this.startButton = <button className = 'bingo_button button is-warning'>Wait...</button>;
            this.bingoButtton = <div></div>;
        }  
        else {
            this.startButton = <button className = 'bingo_button button is-dark' onClick = {(e) => this.startGame(e)}>Start Game!</button>;
            this.bingoButtton = <div></div>;
        }

        return (
            <div className = 'header'>
                <div className = 'ball_ticker_area'>
                    {this.startButton}
                    {this.bingoButtton}
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
        gameStarted: props.bingo.gameStarted,
    });
}

export default connect(mapStateToProps, mapDispatchToProps)(Header); 