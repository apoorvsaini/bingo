import React from 'react';
import { connect } from 'react-redux';

import './style.css';
import { loadTickets, ticketsLoaded, setTicketsData } from '../../actions/bingo';
import ticketGen from '../../api/generate-tickets';

import Ticket from '../Ticket';

class BingoContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    // Make API call to generate the tickets data
    generateTickets() {
        let _t = this;

        ticketGen().then(function(data) {
            _t.props.setTicketsData(data);
            _t.props.ticketsLoaded();
        })
        .catch(function (error) {
            console.log(error);
            _t.props.ticketsLoaded();
        });
    }

    componentDidMount() {
        this.props.loadTickets();
        this.generateTickets();
    }

    render() {
        if(Object.keys(this.props.ticketsData).length === 0 && this.props.loading === false) {
            return (<div className = 'home'> ERROR! </div>);
        }
        else if (Object.keys(this.props.ticketsData).length === 0 && this.props.loading === true) {
            return (<div className = 'home'> Loading... </div>);
        }
        else {
            return (
                <div className = 'bingo_container'>
                    {Object.keys(this.props.ticketsData).map(id => (
                        <div className = 'ticket_area' key = {id} id = {id}>
                            <Ticket id = {id} loading = {this.props.loading} data = {(id in this.props.ticketsData) ? this.props.ticketsData[id] : null}/>
                        </div>
                    ))}
                </div>
            );
        }
    }

}

function mapDispatchToProps(dispatch) {
    return ({
        loadTickets: () => dispatch(loadTickets()),
        ticketsLoaded: () => dispatch(ticketsLoaded()),
        setTicketsData: (data) => dispatch(setTicketsData(data)),
    });
}

function mapStateToProps(props) {
    return ({
        tickets: props.bingo.tickets,
        loading: props.bingo.loading,
        ticketsData: props.bingo.ticketsData,
    });
}

export default connect(mapStateToProps, mapDispatchToProps)(BingoContainer); 