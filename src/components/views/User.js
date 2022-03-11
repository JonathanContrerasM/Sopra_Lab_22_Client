import {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
import {Spinner} from 'components/ui/Spinner';
import {Button} from 'components/ui/Button';
import {useHistory, useParams} from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import "styles/views/Game.scss";
import {Logout} from "../../helpers/common";


const Player = ({user}) => (
    <div className="player container1">
        <div className="player username">Username: {user.username}</div>
        <div className="player name1">Name: {user.name}</div>
        <div className="player id">id: {user.id}</div>
    </div>
);

const PlayerMoreInfo = ({user}) =>{


    if (user.birthDate == null){
        var birthDate = null;
    }else {
        const bday = new Date(user.birthDate);
        var birthDate = bday.toLocaleDateString("de-DE")
    }


    const registrationDate = new Date(user.registrationDate);
    const registrationDateStringFormat = registrationDate.toLocaleDateString("de-DE")+" - "+registrationDate.toLocaleTimeString("de-DE");

    return(
    <div className="player container1">
        <div className="player registrationDate">Registration Date: {registrationDateStringFormat} </div>

        <div className={"player birthDate"}>Birth Date: {birthDate}</div>
        <div className={"player status"}>Status: {user.status}</div>
    </div>
);

};

const User = () => {

    const history = useHistory();

    const [user, setUser] = useState(null);

    //Gets the user with the path id
    useEffect(() => {
        // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
        async function fetchData() {
            try {
                console.log('/users/' + id)
                const response = await api.get('/users/' + id);

                await new Promise(resolve => setTimeout(resolve, 1000));

                // Get the returned user and update the state.
                setUser(response.data);


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
        //suggested to delete this array
    }, []);

    let content = <Spinner/>;

    const {id} = useParams();

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
                        disabled={localStorage.getItem("token") !== user.token}
                        width="50%"
                        onClick={() => history.push("/game/users/" + user.id + "/edit")}
                    >
                        Edit
                    </Button>
                </div>
                <div className="game button-container1">
                    <Button
                        width="10%"
                        onClick={() => Logout(history)}
                    >
                        Logout
                    </Button>
                </div>

            </div>
        );
    }


    return (
        <BaseContainer className="game container1">
            <h2>User Overview</h2>
            <p className="game paragraph">

            </p>
            {content}
        </BaseContainer>
    );
}

export default User;
