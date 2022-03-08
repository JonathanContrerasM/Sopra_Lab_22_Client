import {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
import {Spinner} from 'components/ui/Spinner';
import {Button} from 'components/ui/Button';
import {useHistory, useParams} from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import "styles/views/Game.scss";
import * as url from "url";

const Player = ({user}) => (
    <div className="player container1" >
        <div className="player username">Username: {user.username}</div>
        <div className="player name1">Name: {user.name}</div>
        <div className="player id">id: {user.id}</div>
    </div>
);

const PlayerMoreInfo = ({user}) => (
    <div className="player container1" >
        <div className="player registrationDate">Registration Date: {user.registrationDate} </div>
        <div className={"player birthDate"}>Birth Date: {user.birthDate}</div>
        <div className={"player status"}>Status: {user.status}</div>
    </div>
);

const User = () => {

    const history = useHistory();

    // define a state variable (using the state hook).
    // if this variable changes, the component will re-render, but the variable will
    // keep its value throughout render cycles.
    // a component can have as many state variables as you like.
    // more information can be found under https://reactjs.org/docs/hooks-state.html
    const [user, setUser] = useState(null);


    const logout = () => {
        setOffline();
        localStorage.removeItem('token');
        localStorage.removeItem("currentUserid");
        history.push('/login');
    }

    const setOffline = async () => {
        try {
            let x = localStorage.getItem('currentUserId');
            const response = await api.put("/setOffline/"+x);
            console.log(response);

        }catch (error) {
            console.error(`Something went wrong while fetching the users: \n${handleError(error)}`);
            console.error("Details:", error);
            alert("Something went wrong while fetching the users! See the console for details.");
        }
    }


    useEffect(() => {
        // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
        async function fetchData() {
            try {
                console.log('/users/'+id)
                const response = await api.get('/users/'+id);


                // delays continuous execution of an async operation for 1 second.
                // This is just a fake async call, so that the spinner can be displayed
                // feel free to remove it :)
                await new Promise(resolve => setTimeout(resolve, 1000));


                // Get the returned user and update the state.
                setUser(response.data);


                // This is just some data for you to see what is available.
                // Feel free to remove it.
                console.log('request to:', response.request.responseURL);
                console.log('status code:', response.status);
                console.log('status text:', response.statusText);
                console.log('requested data:', response.data);

                // See here to get more data.
                console.log(response);
            } catch (error) {
                console.error(`Something went wrong while fetching the users: \n${handleError(error)}`);
                console.error("Details:", error);
                alert("Something went wrong while fetching the users! See the console for details.");
            }
        }

        fetchData();
    }, []);

    let content = <Spinner/>;

   const {id}= useParams();

    if (user) {
        content = (

            <div className="game">

                <ul className="game user-list">


                        <Player user={user} key={user.id}/>
                    <PlayerMoreInfo user={user} key={user.id}/>

                </ul>
                <div className="game button-container">
                    <Button
                        width="50%"
                        onClick={() => history.push("/game")}
                    >
                        Back
                    </Button>
                </div>
                <div className="game button-container">
                    <Button
                        disabled={localStorage.getItem("token") != user.token}
                        width="50%"
                        onClick={() => logout()}
                    >
                        Edit
                    </Button>
                </div>
                <div className="game button-container1">
                    <Button
                        width="10%"
                        onClick={() => logout()}
                    >
                        Logout
                    </Button>
                </div>

            </div>
        );
    }


        return (
            <BaseContainer className="game container1">
                <h2>Member</h2>
                <p className="game paragraph">

                </p>
                {content}

            </BaseContainer>
        );
}

export default User;
