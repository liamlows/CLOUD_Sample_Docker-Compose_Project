import React from 'react';
import { Link } from 'react-router-dom';
import { DonationsRepository } from '../api/DonationsRepository';


export class ProfileTable extends React.Component {

    donationsRepository = new DonationsRepository();

    state = {
        donations: []
    }

    render() {
        return <>
            <h4>My Donations</h4>
            <div className="container table_container">
                
                {
                    !this.state.donations.length && 
                        <div className="d-flex justify-content-center">
                            You aren't associated with any food donations.
                        </div>
                }
                {
                    this.state.donations.length !== 0 &&
                        <table className="table table-bordered table-striped my-4">
                            <thead>
                                <tr>
                                    <th scope="col">Donation #</th>
                                    <th scope="col">RDH Donor</th>
                                    <th scope="col">Soup Kitchen Recipient</th>
                                    <th scope="col">Food</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Claimed</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.donations.map((x, i) => 
                                        <tr key={i}>
                                                <th scope="row"><Link to={`/donation/`+ x.foodDonationID} >{x.foodDonationID}</Link></th>
                                                <td>{x.RDH_name}</td>
                                                <td>{x.soupKitchenID}</td> {/* WOuld probably have to update route to alias user ids. */}
                                                <td>{x.foodName}</td>
                                                <td>{x.quantity}</td>
                                                {/* <td>{x.timeMade.substring(0, 10)}</td>
                                                <td>{x.expirationDate.substring(0, 10)}</td> */}
                                                <td>{x.claimed}</td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                }
            </div>
        </>;
    }

    async setDonations(userID) {
        const response = await this.donationsRepository.getUserDonations(userID);

        if (response) {
            this.setState({donations: response})
        }

    }

    componentDidMount() {
        const userID = this.props.userID;
        this.setDonations(userID);

    }

}

