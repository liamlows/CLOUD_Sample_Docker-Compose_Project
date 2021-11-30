import React from 'react';
import { NavigationBar } from '../Navigation/NavigationBar';
import { Link } from "react-router-dom"
import { AccountsRepository } from '../api/AccountsRepository';
import { DonationsRepository } from '../api/DonationsRepository';

export class Donations extends React.Component {

    donationsRepository = new DonationsRepository();
    accountsRepository = new AccountsRepository();

    state = {
        donations: [],
        redirect: false
    }

    render () {

        return <>
            <NavigationBar></NavigationBar>
            <h2 className="my-4">All Food Donations</h2>
            <div className="container table_container">
                <table className="table table-bordered table-striped my-4">
                    <thead>
                        <tr>
                            <th scope="col">Donation #</th>
                            <th scope="col">RDH Donor</th> {/*how to get names here instead of id # */}
                            <th scope="col">Soup Kitchen Recipient</th>
                            <th scope="col">Food</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Donation Made</th>
                            <th scope="col">Expiration Date</th>
                            <th scope="col">Claimed</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.donations.map((x, i) => 
                                <tr key={i}>
                                        <th scope="row"><Link to={`/donation/`+ x.foodDonationID} >{x.foodDonationID}</Link></th>
                                        <td>{x.RDH_name}</td> {/* Make this a link to profile with RDH's user id? */}
                                        <td>{x.soupKitchenName}</td> {/* WOuld probably have to update route to alias user ids. */}
                                        <td>{x.foodName}</td>
                                        <td>{x.quantity}</td>
                                        <td>{x.timeMade.substring(0, 10)}</td>
                                        <td>{x.expirationDate.substring(0, 10)}</td>
                                        <td>{x.claimed}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </>
    }

    async setDonations() {
        const response = await this.donationsRepository.getDonations();

        if (response) {
            this.setState({donations: response});
        }
    }

    componentDidMount() {
        this.setDonations();
    }

}