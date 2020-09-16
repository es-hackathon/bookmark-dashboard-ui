import React, { useEffect, useState } from 'react'
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";
import SelectInput from "../common/SelectInput";
import { Multiselect } from 'multiselect-react-dropdown';

const GroupForm = ({
    group,
    cards,
    onSave,
    onChange,
    saving = false,
    errors = {}
}) => {

    const [options, setoptions] = useState([{ name: 'Srigar', id: 1 }, { name: 'Sam', id: 2 }]);

    // useEffect(() => {

    //     // setStartDate({ startDate })
    //     card.expireDate = startDate;
    // }, [startDate]);

    function onSelect(event) {
        const id = event.map(x => x.id)

        group.cards = id;
    }

    function onRemove(event) {
        const { name, value } = event.target;
        setoptions(prevGroup => ({
            ...prevGroup,
            [name]: value
        }));
    }

    function handleInputChange(event) {
        // group.isActive = event.target.checked
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;

        const name = target.name;

        // this.setState({
        //   [name]: value
        // });
    }
    return (
        <form onSubmit={onSave} className="padding-align-pages">

            <h2>{group.id ? "Edit" : "Add"} Group</h2>
            {errors.onSave && (
                <div className="alert alert-danger" role="alert">
                    {errors.onSave}
                </div>
            )}

            <div className="form-row">
                <div className="form-group col-md-4">
                    <TextInput
                        name="name"
                        label="Name"
                        value={group.name}
                        onChange={onChange}
                        error={errors.name}
                    />

                </div>
                <div className="form-group col-md-4">
                    <TextInput
                        name="description"
                        label="Description"
                        value={group.description}
                        onChange={onChange}
                        error={errors.description}
                    />
                </div>
                <div className="form-group col-md-4">
                    <label htmlFor="iconSelect" className="col-form-label text-nowrap"
                        style={{ paddingTop: 0 }}
                    >Map card</label>
                    <Multiselect id="iconSelect"
                        options={cards} // Options to display in the dropdown
                        selectedValues={group.cardSelected} // Preselected value to persist in dropdown
                        onSelect={onSelect} // Function will trigger on select event
                        // onRemove={onRemove} // Function will trigger on remove event
                        displayValue="name" // Property name to display in the dropdown options
                        showCheckbox={true}
                        closeIcon="close"
                        closeOnSelect={false}
                    />
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-md-4">
                    <input type="checkbox"
                        name="isActive"
                        value={group.isActive}
                        id="isActive"
                        checked={true}
                        onChange={handleInputChange}
                    />
                    <label className="form-check-label" htmlFor="isActive">
                        &nbsp;&nbsp;Active
                    </label>

                </div>
            </div>
            <button type="submit" disabled={saving} className="btn btn-primary">
                {saving ? "Saving..." : "Save"}
            </button>
        </form>
    );
};

GroupForm.propTypes = {
    group: PropTypes.object.isRequired,
    errors: PropTypes.object,
    onSave: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    saving: PropTypes.bool
};

export default GroupForm;
