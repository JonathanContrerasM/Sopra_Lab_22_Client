import {api, handleError} from "./api";


export function Logout(history) {

    setOffline();
    localStorage.removeItem('token');
    localStorage.removeItem("currentUserid");

    history.push('/login');
}

export const setOffline = async () => {
    try {

        let currentUserId = localStorage.getItem('currentUserId');
        const response = await api.put("/setOffline/" + currentUserId);
        console.log(response);

    } catch (error) {
        console.error(`Something went wrong setting the user offline: \n${handleError(error)}`);
        console.error("Details:", error);
        alert("Something went wrong while setting the user offline! See the console for details.");
    }
}




