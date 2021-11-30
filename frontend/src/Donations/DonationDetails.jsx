import React from 'react';
import { AccountsRepository } from '../api/AccountsRepository';
import { DonationsRepository } from '../api/DonationsRepository';
import NavigationBar from '../Navigation/NavigationBar';
import './DonationDetails.css'

export class Donation extends React.Component {

    accountsRepository = new AccountsRepository();
    donationsRepository = new DonationsRepository();



    state = {
        // foodDonationID: 0,
        RDHUsername: "",
        RDHAddress: "",
        soupKitchenUsername: "",
        soupKitchenAddress: "",
        donationImgURL: "",
        foodName: "",
        quantity: 0,
        foodCategory: "",
        description: "",
        timeMade: "",
        expirationDate: "",
        preservationType: "",
        // claimed: 0
    }

    // updateClaimed(claimedStatus) {
    //     if (claimedStatus) {
    //         this.donationsRepository.updateClaimed(this.state.foodDonationID, 0).then(
    //         this.setState({claimed: 0}))

    //     }
    //     else if (!claimedStatus) {
    //         this.donationsRepository.updateClaimed(this.state.foodDonationID, 1).then(
    //         this.setState({claimed: 1}))
    //     }

    // }

    render() {
        return  <>
            <NavigationBar></NavigationBar>
            <div className="container my-1 w-50">
                <h2>Food Donation</h2>
                <div className="row d-flex align-items-center mx-5 my-3"> 
                    <div className="col d-flex justify-content-center px-4">
                        <b>Donated By:</b>
                    </div>

                    <div className="col ">
                        <div className="row my-1 justify-content-center"> 
                            {this.state.RDHUsername}
                        </div>
                        <div className="row my-1 justify-content-center">
                            {this.state.RDHAddress}
                        </div>
                    </div>
                    <div className="col d-flex justify-content-center px-4">
                        <b>Donated To:</b>
                    </div>

                    <div className="col ">
                        <div className="row my-1 justify-content-center"> 
                            {this.state.soupKitchenUsername}
                        </div>
                        <div className="row my-1 justify-content-center">
                            {this.state.soupKitchenAddress}
                        </div>
                    </div>
                </div>
                <div className="row my-1">
                    {this.state.donationImgURL && 
                        <div className="col">
                                <img className="border border-dark foodphoto my-1" src={this.state.donationImgURL} alt="Food donation pic"/>
                        </div>
                    }
                    {(this.state.donationImgURL === "" || this.state.donationImgURL.length === 0) && 
                        <div className="col">
                            <img className="border border-dark foodphoto my-1" src="https://place-hold.it/200" alt="Food donation pic"/>
                        </div>
                    }
                </div>
                <div className="container">
                    <div className="row my-1">
                        <p>{this.state.foodName} ({this.state.quantity})</p>
                    </div>
                    <div className="row my-1">
                        <p>Donation Category: {this.state.foodCategory}</p>
                    </div>
                    <div className="row my-1">
                        <p>{this.state.description}</p>
                    </div>
                </div>
                <div className="container">
                    <h5><u>Preservation Info</u></h5>
                    <div className="row my-1">
                        <p>Food items made on: {this.state.timeMade.substring(0,10)}</p>
                    </div>
                    <div className="row my-1">
                        <p>Preservation Method: {this.state.preservationType}</p>
                    </div>
                    <div className="row my-1">
                        <p>Food items expire on: {this.state.expirationDate.substring(0,10)}</p>
                    </div>
                </div>
                {/* Anytime something is claimed, it means that any driver can cancel any claim.
                    This is problematic so we can't leave it in.
                    I was wrong.
                    We need to change the schema to have a driverID on every food donation.
                    When the driver usertype clicks the button, it calls a simple PUT to
                    assigns their sessionStorage.siteID to the foodDonations' driverID field.
                    That way only a driver who actually claimed the dono could cancel.
                */}
                {/* {(this.state.claimed === 0 && sessionStorage.userType !== "1") && 
                    <div className="container mt-4">
                        <p>This donation has <b>not</b> been claimed.</p>.
                        Contact a driver to ensure this donation gets delivered!
                    </div>
                }
                {(this.state.claimed === 0 && sessionStorage.userType === "1") &&
                    <div className="container">
                        <form id="claim-form"
                            onSubmit={
                                (e) => {
                                    this.updateClaimed(this.state.claimed);
                                    e.preventDefault();
                                }
                            }
                        > 
                            <button type="submit" form="claim-form" className="btn btn-primary">Claim this Delivery</button>
                        </form>
                    </div>
                }
                {(this.state.claimed === 1 && sessionStorage.userType !== "1") &&
                    <div className="container">
                        <p>This donation has been claimed.</p>
                    </div>
                }
                {(this.state.claimed === 1 && sessionStorage.userType === "1") &&
                    <div className="container">
                        <form id="claim-form"
                            onSubmit={
                                (e) => {
                                    this.updateClaimed(this.state.claimed);
                                    e.preventDefault();
                                }
                            }
                        > 
                            <button type="submit" form="claim-form" className="btn btn-danger">Cancel Claim</button>
                        </form>
                    </div>
                } */}
            </div>


        </>;
    }

    async populateStateFields(foodDonationID) {
        const response = await this.donationsRepository.getRDHandSoupKitchenInfo(foodDonationID);

        if (response) {
            this.setState({
                RDHUsername: response[0].RDH_name,
                RDHAddress: response[0].address,
                soupKitchenUsername: response[0].soupKitchenName,
                soupKitchenAddress: response[0].sAddress
            })
        }
        
        const response2 = await this.donationsRepository.getDonation(foodDonationID);
        if (response2) {
            this.setState({
                foodDonationID: response2[0].foodDonationID,
                donationImgURL: response2[0].photoURL,
                foodName: response2[0].foodName,
                quantity: response2[0].quantity,
                foodCategory: response2[0].foodCategory,
                description: response2[0].description,
                timeMade: response2[0].timeMade,
                preservationType: response2[0].preservationType,
                expirationDate: response2[0].expirationDate,
                claimed: response2[0].claimed
            })
        }

    }

    componentDidMount() {
        
        // pass in props as foodDonation id on link. 
        const foodDonationID = this.props.match.params;


        this.populateStateFields(foodDonationID.foodDonationID);

    }

}