import React, { createContext, useLayoutEffect, useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Cookies } from "react-cookie";
import jwt_decode from "jwt-decode";

const ThemeContext = createContext(null);

export const ThemeContextProvider = ({ children }) => {


	const cookies = new Cookies();
	const token = cookies.get("jwt");
	var decoded = null


	try {
		decoded = jwt_decode(token);
		console.log("decoded themecinext", decoded)
	}
	catch (e) {
		console.log(e);

	}

	const [auth, setAuth] = useState(decoded == null ? {} : decoded);


	const values = useMemo(
		() => ({

			auth,
			setAuth,

		}),
		[

			auth,

		],
	);

	return <ThemeContext.Provider value={values}>{children}</ThemeContext.Provider>;
};
ThemeContextProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

export default ThemeContext;
