import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import "./../scss/formgroup.scss";

export const FormGroup = props => {
	const { groupError, inline, legend, children, hint, name, ...rest } = props;

	const clonedChildren = React.Children.map(children, child =>
		React.cloneElement(child, { name, inline, ...rest })
	);

	const classes = classnames({
		formgroup: true,
		"formgroup--no-legend": legend ? false : true
	});

	return (
		<fieldset className={classes}>
			{legend && <legend className="formgroup__legend">{legend}</legend>}
			{groupError && <p className="formgroup__error-message">{groupError}</p>}
			{hint && <p className="formgroup__hint">{hint}</p>}
			{clonedChildren}
		</fieldset>
	);
};

FormGroup.propTypes = {
	children: PropTypes.arrayOf(PropTypes.node).isRequired,
	legend: PropTypes.node.isRequired,
	name: PropTypes.string.isRequired,
	hint: PropTypes.node,
	inline: PropTypes.bool,
	groupError: PropTypes.bool | PropTypes.string
};
