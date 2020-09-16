import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from "prop-types";
import * as cardActions from "../../redux/actions/cardActions";
import CardList from "./CardList";
import { Redirect } from "react-router-dom";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

class CardPage extends Component {

    state = {
        redirectToAddCardPage: false
    };

    componentDidMount() {
        const { cards, actions } = this.props;
        if (cards.length === 0) {
            actions.loadCards().catch(error => {
                alert("Loading Cards failed" + error);
            });
        }
    }

    handleDeleteCard = async card => {
        toast.success("Card deleted");
        try {
            await this.props.actions.deleteCard(card);
        } catch (error) {
            toast.error("Delete failed. " + error.message, { autoClose: false });
        }
    };

    render() {
        return (
            <div className="padding-align-pages">
                {this.state.redirectToAddCardPage && <Redirect to="/card"></Redirect>}
                <h2>Cards</h2>
                {this.props.loading ?
                    <Spinner /> : (
                        <> <button
                            style={{ marginBottom: 20 }}
                            className="btn btn-primary add-card"
                            onClick={() => this.setState({ redirectToAddCardPage: true })}
                        >Add Card</button>
                            <CardList onDeleteClick={this.handleDeleteCard} cards={this.props.cards} />
                        </>)
                }
            </div>
        )
    }
}

CardPage.propTypes = {
    cards: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired
}

function mapStateToProps(state) {
    return {
        cards: state.cards,
        loading: state.apiCallsInProgress > 0
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            loadCards: bindActionCreators(cardActions.loadCards, dispatch),
            deleteCard: bindActionCreators(cardActions.deleteCard, dispatch)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardPage);