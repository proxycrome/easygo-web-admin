import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { useDispatch } from 'react-redux';
import { confirmEmail } from './slice';

export const EmailConfirmation = (props) => {
    const [isEmailConfirmed, setIsEmailConfirmed] = useState({status:null, message: ''});
    const location = useLocation();
    const dispatcher = useDispatch();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get('token')
        confirmEmailFn(token)
        console.log({token})
    },[])

    async function confirmEmailFn(token){
        try {
            const response = await dispatcher(confirmEmail({token}));
            console.log(response);
            setIsEmailConfirmed({status: true, message: response});
        } catch (error) {
            setIsEmailConfirmed({status: false, message: error.message});
        }
    }

    if(isEmailConfirmed.status === null){
        return (
            <div>
            <p>loading... please wait</p>
            </div>
        )
    }

    if(isEmailConfirmed.status){
        <div>
            <p>Email confirmation was successful, please login to EasyGo mobile to continue</p>
        </div>
    }else{
        return (
            <div>
                <p>{isEmailConfirmed.message}</p>
            </div>
        );
    }

    
};