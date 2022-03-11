import React, {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
import {Spinner} from 'components/ui/Spinner';
import {Button} from 'components/ui/Button';
import {useHistory, useParams} from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import "styles/views/Game.scss";
import {Logout} from "../../helpers/common";
import 'styles/views/Login.scss';
import DatePicker from 'react-date-picker';


const FormField = props => {
    return (
        <div className="login field">
            <label className="login label1">
                {props.label}
            </label>
            <input
                className="login input"
                placeholder="enter here.."
                value={props.value}
                onChange={e => props.onChange(e.target.value)}
            />
        </div>
    );
};


const UserEdit = props => {

    const history = useHistory();
    const {id} = useParams();

    //Gets the user to extract current Username and Birthdate
    useEffect(() => {
        // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
        async function fetchData() {
            try {
                console.log('/users/' + id)
                const response = await api.get('/users/' + id);


                // delays continuous execution of an async operation for 1 second.
                // This is just a fake async call, so that the spinner can be displayed
                // feel free to remove it :)
                await new Promise(resolve => setTimeout(resolve, 1000));


                // Get the returned user and update the state.
                setNewUsername(response.data.username);
                if (response.data.birthDate != null) {
                    setNewBirthDate(new Date(response.data.birthDate));
                }


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
        //suggested to delete this array
    }, []);


    const [username, setNewUsername] = useState(null);
    const [birthDate, setNewBirthDate] = useState(null);
    //const [date, setDate] = useState(new Date());

    //Puts the data to the server and updates the user
    const doEdit = async () => {
        try {

            console.log('/users/' + id)
            const requestBody = JSON.stringify({username, birthDate, id});

            const response = await api.put('/users/' + id, requestBody);
            await new Promise(resolve => setTimeout(resolve, 1000));


            // This is just some data for you to see what is available.
            // Feel free to remove it.
            console.log('request to:', response.request.responseURL);
            console.log('status code:', response.status);
            console.log('status text:', response.statusText);
            console.log('requested data:', response.data);

            // See here to get more data.
            console.log(response);

            history.push("/game/users/" + id);
        } catch (error) {
            console.error(`Something went wrong while fetching the users: \n${handleError(error)}`);
            console.error("Details:", error);
            alert("Something went wrong while updating the user! See the console for details.");
        }
    };


    let content = <Spinner/>;


    return (
        <BaseContainer>
            <div className="game container2">
                <h2>Edit Users Info</h2>
                <p></p>

                <FormField
                    label="Username"
                    value={username}
                    onChange={un => setNewUsername(un)}
                />

                <legend>
                    Birthdate

                </legend>
                <p>

                </p>
                <DatePicker
                    label="come on"
                    value={birthDate}
                    dateFormat="MM-dd-yyyy"
                    onChange={d => setNewBirthDate(d)}

                />

                <div className="game button-container3">
                    <Button
                        width="100%"
                        onClick={() => doEdit()}
                    >
                        Done
                    </Button>
                </div>

                <div className="game button-container3">
                    <Button
                        width="100%"
                        onClick={() => history.push("/game/users/" + id)}
                    >
                        Back
                    </Button>
                </div>

                <div className="game button-container3">
                    <Button
                        width="100%"
                        onClick={() => Logout(history)}
                    >
                        Logout
                    </Button>
                </div>


            </div>

        </BaseContainer>
    );
};
export default UserEdit;


