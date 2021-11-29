import React from 'react';
import { NavigationBar } from '../Navigation/NavigationBar';
import { Link, Redirect } from "react-router-dom"
import { AccountsRepository } from '../api/AccountsRepository';

export class Donations extends React.Component {

    accountsRepository = new AccountsRepository();

    state = {
        // userID: 1,
        redirect: false
    }

    // async goToProfile(userID) {
    //     const response = await this.accountsRepository.getUser(userID);

    //     if(response) {
    //         this.setState({userID: response[0].userID, redirect: true});
            
    //     }
    // }

    render () {

        if (this.state.redirect) {
            return <>
                <Redirect to={`/profile/` + this.state.userID}/>
            </>;
        }

        return(
            <>
                <NavigationBar></NavigationBar>
                <div>Incomplete</div>
                {/* <span type="button" 
                    className="btn btn-primary" 
                    onClick={() => this.goToProfile(this.state.userID)}>
                        Profile
                </span> */}
            </>
        )
    }

}