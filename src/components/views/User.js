import {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
import {Spinner} from 'components/ui/Spinner';
import {Button} from 'components/ui/Button';
import {useHistory, useParams} from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import "styles/views/Game.scss";



const User = () => {

   const {id}= useParams();
   console.log("Samuel kohl")

    return(


       <h1>
           {id}
       </h1>
   )
}

export default User;
