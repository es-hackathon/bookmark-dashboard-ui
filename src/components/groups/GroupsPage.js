import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from "prop-types";
import * as groupActions from "../../redux/actions/groupActions";
import * as cardActions from "../../redux/actions/cardActions";
import GroupList from "./GroupList";
import { Redirect } from "react-router-dom";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

class GroupsPage extends Component {

    state = {
        redirectToAddGroupPage: false
    };

    componentDidMount() {
        const { groups, cards, actions } = this.props;

        if (groups.length === 0) {
            actions.loadGroups().catch(error => {
                alert("Loading groups failed" + error);
            });
        }


    }

    handleDeleteGroup = async group => {
        toast.success("Group deleted");
        try {
            await this.props.actions.deleteGroup(group);
        } catch (error) {
            toast.error("Delete failed. " + error.message, { autoClose: false });
        }
    };

    render() {
        return (
            <div className="padding-align-pages">
                {this.state.redirectToAddGroupPage && <Redirect to="/group"></Redirect>}
                <h2>Groups</h2>
                {this.props.loading ?
                    <Spinner /> : (
                        <> <button
                            style={{ marginBottom: 20 }}
                            className="btn btn-primary add-group"
                            onClick={() => this.setState({ redirectToAddGroupPage: true })}>Add Group</button>

                            <GroupList onDeleteClick={this.handleDeleteGroup} groups={this.props.groups} />
                        </>)
                }
            </div>
        )
    }
}

GroupsPage.propTypes = {
    groups: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired
}

function mapStateToProps(state) {
    return {
        groups:
            state.cards.length === 0
                ? []
                : state.groups.map(group => {
                    return {
                        ...group,
                        cardSelected: state.cards.find(a => a.id === group.id)
                    }
                }),
        cards: state.cards,
        loading: state.apiCallsInProgress > 0
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            loadGroups: bindActionCreators(groupActions.loadGroups, dispatch),
            loadCards: bindActionCreators(cardActions.loadCards, dispatch),
            deleteGroup: bindActionCreators(groupActions.deleteGroup, dispatch)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupsPage);