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
							<Link to={"/card/" + card.id}>{card.name}</Link>
						</td>
						<td>{card.description}</td>
						<td>{card.expireDate}</td>
						<td>
							<button
								className="btn btn-outline-danger"
								onClick={() => onDeleteClick(card)}>
								Delete
              				</button>
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
