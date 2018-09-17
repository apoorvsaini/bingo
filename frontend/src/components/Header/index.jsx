import React from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';

import api from '../../api/api-config';
import validateBingo from '../../api/claim-bingo';

import './style.css';
import '../../assets/bulma.min.css';
import { setNewBall, stopGame, startGame, setGameResult } from '../../actions/bingo';
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
                if (result.claim) {
                    if (result.won === true) {
                        _t.props.setGameResult('won');
                    }
                    else {
                        _t.props.setGameResult('lost');
                    }
                    
                    //_t.props.stopGame();
                    setTimeout(function() { window.location.reload(); }, 10000);
                }
                else {
                    alert('Not a Bingo!');
                }
            });
        }
        else {
            alert('Not a Bingo!');
        }
    }

    startGame(event) {
        let _t = this;
        this.socket = io.connect(api.API_URL, api.SOCKET_OPTIONS);

        this.socket.emit('start', 'start');

        this.socket.on('ball', function (data) {
            if (_t.props.gameStarted) {
                _t.props.setNewBall(data);
            }
        });

        /*
        this.socket.on('over', function (data) {
            console.log(data);
            if (data.userId === sessionStorage.getItem('userId')) {
                //alert('Your won!');
                _t.props.setGameResult('won');
            }
            else {
                //alert('Your Lost!');
                _t.props.setGameResult('lost');
            }
            _t.props.stopGame();
            setTimeout(function() { window.location.reload(); }, 5000);
        }); */

        this.props.startGame();
        this.checkConnection();

        // If no new balls are received in next 2 seconds, restart
        /*
        if (!this.timer) {
            if(!this.socket.connected) {
                this.timer = setInterval(function(){ 
                    if(_t.props.ballsDrawn.length === 0) {
                        _t.startGame();
                    }
                    else {
                        clearInterval(_t.timer);
                        _t.timer = false;
                    }
                }, 2000);
            }
        }*/
    }

    checkConnection() {
        if(!this.socket.connected) {
            this.socket = io.connect(api.API_URL, api.SOCKET_OPTIONS);
        }
    }

    componentDidUpdate() {
        this.checkConnection();
    }

    render() {
        if (this.props.gameStarted === true && this.socket.connected) {
            this.startButton = <div></div>;
            this.bingoButtton = <button className = 'bingo_button button is-danger' onClick = {(e) => this.claimBingo(e)}>Shout Bingo!</button>

            if (this.props.gameResult !== null) {
                this.bingoButtton = <button className = 'bingo_button button is-danger'>You Got a Bingo! Game will reset in 10 seconds.</button>
            }
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
                    {(this.props.gameResult === null) ? this.props.ballsDrawn.map((data, index) => (
                        <span className = {(index === 0) ? 'last_ball' : 'balls'} key = {'ball-' + data.time}> {data.ball} </span>
                    )) : <span></span>}
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
        setGameResult: (data) => dispatch(setGameResult()),
    });
}

function mapStateToProps(props) {
    return ({
        ballsDrawn: props.bingo.ballsDrawn,
        ticketsData: props.bingo.ticketsData,
        bingoTickets: props.bingo.bingoTickets,
        connected: props.home.connected,
        gameStarted: props.bingo.gameStarted,
        gameResult: props.bingo.gameResult
    });
}

export default connect(mapStateToProps, mapDispatchToProps)(Header); 