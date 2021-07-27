import React from "react";

const Rank = ({ name, entries }) => {
	return (
		<div>
			<div className="white f3">
				{`${
					name === undefined ? "User" : name
				}, your current entry count is...`}
			</div>
			<div className="white f1">{entries > 0 ? entries : 0}</div>
		</div>
	);
};

export default Rank;
