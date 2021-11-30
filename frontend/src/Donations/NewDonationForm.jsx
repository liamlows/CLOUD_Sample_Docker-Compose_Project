import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { NavigationBar } from '../Navigation/NavigationBar';
import { DonationsRepository } from '../api/DonationsRepository';
import { AccountsRepository } from '../api/AccountsRepository';

export class NewDonationForm extends React.Component {

    donationsRepository = new DonationsRepository();
    accountsRepository = new AccountsRepository();

    // soupKitchenStrings = {};



    

    state = {
        RDH_ID: sessionStorage.userID,
        soupKitchenID: 0,
        foodName: "",
        foodCategory: "",
        timeMade: undefined,
        expirationDate: undefined,
        photoURL: "",
        preservationType: "",
        donationDescription: "",
        quantity: 0,
        redirect: false,
        soupKitchenIDs: [],

    }

    setRDH_ID(RDH_ID) {
		this.setState(state => {
			state.RDH_ID = RDH_ID;
			return state;
		});
	}

    setSoupKitchenID(soupKitchenID) {
		this.setState(state => {
			state.soupKitchenID = soupKitchenID;
			return state;
		});
	}

    setFoodName(foodName) {
		this.setState(state => {
			state.foodName = foodName;
			return state;
		});
	}

    setFoodCategory(foodCategory) {
		this.setState(state => {
			state.foodCategory = foodCategory;
			return state;
		});
	}
    
    setTimeMade(timeMade) {
		this.setState(state => {
			state.timeMade = timeMade;
			return state;
		});
	}

    setExpirationDate(expirationDate) {
		this.setState(state => {
			state.expirationDate = expirationDate;
			return state;
		});
	}

    setPhotoURL(photoURL) {
		this.setState(state => {
			state.photoURL = photoURL;
			return state;
		});
	}

    setPreservationType(preservationType) {
		this.setState(state => {
			state.preservationType = preservationType;
			return state;
		});
	}

    setDonationDescription(donationDescription) {
		this.setState(state => {
			state.donationDescription = donationDescription;
			return state;
		});
	}

    setQuantity(quantity) {
		this.setState(state => {
			state.quantity = quantity;
			return state;
		});
	}


    async createNewDonation() {

        await this.donationsRepository.addDonation(this.state).then(
            this.setState({redirect: true})
        )

    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={ `/donations/` }/> // Or redirect to the newly donated donation page?
        }

        // if(!this.state.soupKitchenIDs) {
        //     return <div>Loading...</div>
        // }

        return <>
            <NavigationBar></NavigationBar>

            <div className="container w-50 my-2">
                <form id="new-donation-form" className="my-4"
                    onSubmit={
                        (e) => {
                            this.createNewDonation();
                            e.preventDefault();
                        }
                    }
                >
                    <h2>Donate Food</h2> 
                    <div className="container w-50 my-1">
                        <p> RDH Donor (You): {this.state.RDH_ID} </p>
                    </div>
                    <div className="container w-50 my-1 form-label-group">
                        <label htmlFor="soupKitchenID">Soup Kitchen/Shelter Recipient</label>
                        <select id="soupKitchenID" name="soupKitchenID" className="form-control"
                            onChange={ e => this.setSoupKitchenID(e.target.value)}
                        >
                                    {
                                        this.state.soupKitchenIDs.map((x, i) => <option key={ i }>{ x.userID }</option>)
                                    }
                        </select>
                    </div>
                    <div className="container w-50 my-1 form-label-group">
                        <label htmlFor="foodName">Donation Item(s) Name</label>
                        <input type="text" className="form-control my-1" id="foodName" name="foodName" 
                            onChange={e => this.setFoodName(e.target.value)}
                        />
                    </div>
                    <div className="container w-50 my-1 form-label-group">
                        <label htmlFor="foodCategory">Donation Item(s) Category</label>
                        <input type="text" className="form-control my-1" id="foodCategory" name="foodCategory" 
                            onChange={e => this.setFoodCategory(e.target.value)}
                        />
                    </div>
                    <div className="container w-50 my-1 form-label-group">
                        <label htmlFor="timeMade">Time Donation Item(s) were Made</label>
                        <input type="datetime-local" className="form-control my-1" id="timeMade" name="timeMade" 
                            onChange={e => this.setTimeMade(e.target.value)}
                        />
                    </div>
                    <div className="container w-50 my-1 form-label-group">
                        <label htmlFor="expirationDate">Donation Item(s) Expiration Date</label>
                        <input type="datetime-local" className="form-control my-1" id="expirationDate" name="expirationDate" 
                            onChange={e => this.setExpirationDate(e.target.value)}
                        />
                    </div>
                    <div className="container w-50 my-1 form-label-group">
                        <label htmlFor="photoURL">Donation Item(s) Photo URL</label>
                        <input type="text" className="form-control my-1" id="photoURL" name="photoURL" 
                            onChange={e => this.setPhotoURL(e.target.value)}
                        />
                    </div>
                    <div className="container w-50 my-1 form-label-group">
                        <label htmlFor="preservationType">Preservation Method of Donation Item(s)</label>
                        <input type="text" className="form-control my-1" id="preservationType" name="preservationType" 
                            onChange={e => this.setPreservationType(e.target.value)}
                        />
                    </div>
                    <div className="container w-50 my-1 form-label-group">
                        <label htmlFor="donationDescription">Further Description of Donation</label> 
                        <textarea className="form-control my-1" id="donationDescription" name="donationDescription" 
                            onChange={e => this.setDonationDescription(e.target.value)}
                        />
                    </div>
                    <div className="container w-50 my-1 form-label-group">
                        <label htmlFor="quantity">Donation Item Quantity</label>
                        <input type="number" min="1" max="999999" className="form-control my-1" id="quantity" name="quantity" 
                            onChange={e => this.setQuantity(e.target.value)}
                        />
                    </div>

                    <div className="container w-75">
                        <div className="row mt-4">
                            <div className="col">
                                <Link className="btn btn-danger" to={`/donations/`}> Cancel </Link>
                            </div>
                            <div className="col">
                                <button type="submit" className="btn btn-primary" form="new-donation-form">Create New Donation</button>
                            </div>
                        </div>
                    </div>
                </form>

            </div>
        </>;
    }

    async populateSoupKitchenIDs() {
        const response = await this.accountsRepository.getUsersByType(2);

        if (response) {
            this.setState({soupKitchenIDs: response})
        }


    }

    componentDidMount() {
        // If user can view this page, they are an RDH owner. Admin as well?
        // Nah, admin as well is too much work. Admin shouldn't be able to create new donations.
        // Actually check user stories
        this.populateSoupKitchenIDs();
    }

}

export default NewDonationForm;