import React, { useEffect, useState } from 'react'
import { useSearchParams,useNavigate } from 'react-router-dom';
// Redux Imports =========
import { useDispatch } from "react-redux";
import {
checkVerificatonTokenFieldOfUserAsync
} from "../AuthSlice";
import { createSelfChatAsync } from '../../chat/ChatSlice';
import {showCurrentUserAsync} from '../../user/UserSlice'
import ResetPassword from './ResetPassword';
// =======================
const Verification = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchParams,_] = useSearchParams();
    const [query,setQuery] = useState({});
    useEffect(()=>{
        const temp = {};
        for(let key of searchParams.keys()) {
            console.log(key);
            
            temp[key] = searchParams.get(key);
        }
        setQuery(temp);
    },[searchParams]);


    useEffect(()=>{
        if( (query?.verify) ){
            if( (query.verify == "email") ){
                console.log("called it ");
                const check = async () =>{
                    await dispatch(checkVerificatonTokenFieldOfUserAsync({query,body:{isEmailVerified:true}}));
                    await dispatch(createSelfChatAsync());
                    await dispatch(showCurrentUserAsync());
                    navigate("/chats");
                } 
                check();
            }
        }
    },[query]);
    console.log(query," ");
  return (
    <div>
        {
            (query) && (query.verify) && (query.verify == "password") &&
            ( <ResetPassword query={query}/> )
        }
    </div>
  )
}

export default Verification
