import {Redirect} from "react-router-dom";
import PropTypes from "prop-types";


export const RegisterGuard = props => {
    if (!localStorage.getItem("token")) {
        return props.children;
    }
    // if user is already logged in, redirects to the main /app
    return <Redirect to="/game"/>;
};

RegisterGuard.propTypes = {
    children: PropTypes.node
}