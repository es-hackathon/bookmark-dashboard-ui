import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const CardList = ({ cards, onDeleteClick }) => (

	< table className="table" >
		<thead>
			<tr>
				{/* <th>Id</th> */}
				<th>Title</th>
				<th>Description</th>
				<th>Expire date</th>
				<th />
			</tr>
		</thead>
		<tbody>
			{cards.map((card) => {
				return (
					<tr key={card.id}>
						<td>
							 {card.name} 
						</td>
						<td>{card.description}</td>
						<td>{card.expireDate}</td>
						<td>
							<Link to={"/card/" + card.id} className="btn btn-outline-primary">Edit</Link>
						</td>
					</tr>
				);
			})}
		</tbody>
	</table >
);

CardList.prototype = {
	cards: PropTypes.array.isRequired,
	onDeleteClick: PropTypes.func.isRequired
};

export default CardList;
