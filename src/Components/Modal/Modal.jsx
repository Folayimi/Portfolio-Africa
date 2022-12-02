import React, {useState, useEffect} from 'react';
import './Modal.css';

const Modal = ({message,setError})=>{
    useEffect(()=>{
        setTimeout(()=>{
            setError(false)
        },[2000])
    },[])
    return(
        <>
            <div className="Mbackground">
                <div className="messageBox">
                    <h3>{message}</h3>
                </div>
            </div>
        </>
    )
}
export default Modal;