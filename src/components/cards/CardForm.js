import React, { useEffect, useState } from 'react'
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CardForm = ({
    card,
    onSave,
    onChange,
    saving = false,
    errors = {}
}) => {

    const [startDate, setStartDate] = useState();

    useEffect(() => {

        // setStartDate({ startDate })
        card.expireDate = startDate;
    }, [startDate]);


    return (
        <form onSubmit={onSave} className="padding-align-pages">
            <h2>{card.id ? "Edit" : "Add"} Card</h2>
            {errors.onSave && (
                <div className="alert alert-danger" role="alert">
                    {errors.onSave}
                </div>
            )}

            <div className="form-row">
                <div className="form-group col-md-4">
                    <TextInput
                        name="name"
                        label="Title"
                        value={card.name}
                        onChange={onChange}
                        error={errors.name}
                        placeholder={"Title"}
                    />

                </div>
                <div className="form-group col-md-4">
                    <TextInput
                        name="description"
                        label="Description"
                        value={card.description}
                        onChange={onChange}
                        error={errors.description}
                        placeholder={"Description"}
                    />
                </div>
                <div className="form-group col-md-4">
                    <TextInput
                        name="url"
                        label="URL"
                        value={card.url}
                        onChange={onChange}
                        error={errors.url}
                        placeholder={"URL"}
                    />
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-md-4">
                    <label htmlFor="iconSelect" className="col-form-label text-nowrap">Display icon</label>
                    <select id="iconSelect" className="form-control">
                        <option value="bookmark">bookmark</option>
                        <option value="bank">bank</option>
                        <option value="bullseye">bullseye</option>
                        <option value="cicle">cicle</option>
                        <option value="eur">eur</option>
                        <option value="money">money</option>
                        <option value="github">github</option>
                        <option value="windows">windows</option>
                    </select>
                </div>
                <div className="form-group col-md-4">
                    <label htmlFor="groupBySelect" className="col-form-label text-nowrap">Expire Date</label>
                    <div style={{ marginTop: 0 }} >
                        <DatePicker
                            selected={startDate}
                            onChange={date => setStartDate(date)}
                            dateFormat="dd-MMM-yyyy"
                        />

                    </div>
                </div>
            </div>
            <button type="submit" disabled={saving} className="btn btn-primary">
                {saving ? "Saving..." : "Save"}
            </button>
        </form >
    );
};

CardForm.propTypes = {
    card: PropTypes.object.isRequired,
    errors: PropTypes.object,
    onSave: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    saving: PropTypes.bool,

};

export default CardForm;
