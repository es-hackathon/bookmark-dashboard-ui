import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import PropTypes, { bool } from "prop-types";
import { loadGroups, saveGroup } from "../../redux/actions/groupActions";
import { loadCards } from "../../redux/actions/cardActions";
import GroupForm from "./GroupForm";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

const newGroup = {
    id: null,
    description: "",

    name: "",
    isActive: true,
    cardSelected: []
};

function ManageGroupPage({
    groups,
    cards,
    loadCards,
    loadGroups,
    saveGroup,
    history,
    ...props }) {
    const [group, setGroup] = useState({ ...props.group });
    const [errors, setErrors] = useState({});
    const [saving, setSaving] = useState(false);

    useEffect(() => {

        if (groups.length === 0) {
            loadGroups().catch(error => {
                alert("Loading groups failed" + error);
            });
        } else {
            setGroup({ ...props.group })
        }

        if (cards.length === 0) {
            loadCards().catch(error => {
                alert("Loading cards failed" + error);
            });
        }
    }, [props.group]);

    function handleChange(event) {
        const { name, value } = event.target;
        setGroup(prevGroup => ({
            ...prevGroup,
            [name]: value
        }));
    }
    function formIsValid() {
        const { name, description } = group;
        const errors = {};

        if (!name) errors.name = "Group name is required.";
        if (!description) errors.description = "Group description is required";

        setErrors(errors);
        // Form is valid if the errors object still has no properties
        return Object.keys(errors).length === 0;
    }

    function handleSave(event) {
        event.preventDefault();
        if (!formIsValid()) return;
        setSaving(true);
        saveGroup(group).then(() => {
            toast.success("Group saved.");
            history.push("/groups");
        }).catch(error => {
            setSaving(false);
            setErrors({ onSave: error.message });
        });
    }
    return cards.length === 0 || groups.length === 0 ? (
        <Spinner />
    ) : (
            <>
                <GroupForm
                    group={group}
                    errors={errors}
                    cards={cards}
                    onChange={handleChange}
                    onSave={handleSave}
                    saving={saving}
                />
            </>
        )
}

ManageGroupPage.propTypes = {
    group: PropTypes.object.isRequired,
    cards: PropTypes.array.isRequired,
    groups: PropTypes.array.isRequired,
    loadGroups: PropTypes.func.isRequired,
    loadCards: PropTypes.func.isRequired,
    saveGroup: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
}

export function getGroupBySlug(groups, id) {
    return groups.find(group => group.id === id) || null;
}

function mapStateToProps(state, ownProps) {
    const id = ownProps.match.params.id;
    const group =
        id && state.groups.length > 0
            ? getGroupBySlug(state.groups, id)
            : newGroup;
    return {
        group,
        groups: state.groups,
        cards: state.cards
    }
}

const mapDispatchToProps = {
    loadGroups,
    loadCards,
    saveGroup
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageGroupPage);
