import React from "react";
import { Route } from "react-router-dom";
import axios from 'axios'

class CardView extends React.Component {
    constructor() {
        super();

        this.state = {
            url: ""
        }
    }

    getCustomer = () => {
        const fetchItems = async () => {
            
            const result = await axios(
                `${process.env.REACT_APP_API_URL}/cards/${this.props.match.params.id}`
            )
            console.log(result.data);
            this.setState({ url: result.data.url })
            window.location.replace(result.data.url)
        }

        fetchItems()
    }

    componentDidMount() {
        this.getCustomer();
    }
    
    render() {
           return (<section>Redirecting...</section>);
    }
}

export default CardView;
