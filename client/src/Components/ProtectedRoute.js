import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function ProtectedRoute({component: Component, ...rest}){

    //didapat dari proses login yang berhasil
    const isAuthenticated = localStorage.getItem("isAuthenticated");

    return( 
        <Route 
        {...rest} 
        render = {(props) => {
            if(isAuthenticated){
                return (<Component/>)
            } else {
                return (
                    <Redirect to={{ pathname: "/", state: { from: props.location } }}/>
                );
            }
        }}
    />
    )
}

export default ProtectedRoute;