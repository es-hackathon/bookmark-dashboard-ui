import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import PropTypes, { number, string } from "prop-types";
import { loadCards, saveCard } from "../../redux/actions/cardActions";
import CardForm from "./CardForm";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

const newCard = {
    id: "",
    name: "",
    description: "",
    url: "",
    expireDate: "",

}


function ManageCardPage({
    cards,
    loadCards,
    saveCard,
    history,
    ...props }) {
    const [card, setCard] = useState({ ...props.card });
    const [errors, setErrors] = useState({});
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (cards.length === 0) {
            loadCards().catch(error => {
                alert("Loading card failed" + error);
            });
        } else {
            setCard({ ...props.card })
        }


    }, [props.card]);

    function handleChange(event) {
        const { name, value } = event.target;
        setCard(prevCard => ({
            ...prevCard,
            [name]: value
        }));
    }
    function formIsValid() {
        const { name, description, url } = card;

        const errors = {};

        if (!name) errors.name = "Title is required.";
        if (!description) errors.description = "Description is required";
        if (!url) errors.url = "URL is required";

        setErrors(errors);
        // Form is valid if the errors object still has no properties
        return Object.keys(errors).length === 0;
    }

    function handleSave(event) {

        event.preventDefault();
        if (!formIsValid()) return;
        setSaving(true);
        saveCard(card).then(() => {
            toast.success("Card saved.");
            history.push("/cards");
        }).catch(error => {
            setSaving(false);
            setErrors({ onSave: error.message });
        });
    }


    return cards.length === 0 ? (
        <Spinner />
    ) : (
            <CardForm
                card={card}
                errors={errors}
                onChange={handleChange}
                onSave={handleSave}
                saving={saving}
            />
        )
}

ManageCardPage.propTypes = {
    card: PropTypes.object.isRequired,
    cards: PropTypes.array.isRequired,
    loadCards: PropTypes.func.isRequired,
    saveCard: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
}

export function getCardById(cards, id) {
    return cards.find(card => card.id === id) || null;
}

function mapStateToProps(state, ownProps) {
    const id = ownProps.match.params.id;
    const card =
        id && state.cards.length > 0
            ? getCardById(state.cards, id)
            : newCard;
    return {
        card,
        cards: state.cards,
    }
}

const mapDispatchToProps = {
    loadCards,
    saveCard
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCardPage);
