import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { NavigationBar } from '../Navigation/NavigationBar';
import { DonationsRepository } from '../api/DonationsRepository';

export class NewDonationForm extends React.Component {

    donationsRepository = new DonationsRepository();

    state = {
        RDH_ID: 1,
        soupKitchenID: 1,
        foodName: "",
        foodCategory: "",
        timeMade: undefined,
        expirationDate: undefined,
        photoURL: "",
        preservationType: "",
        donationDescription: "",
        quantity: 0,
        redirect: false,
    }

    // map all rdh id names to RDH_ID dropdown? // populate with user id that clicks on it?
    // same with soupKitchenID?

    setRDH_ID(RDH_ID) {
		this.setState(state => {
			state.RDH_ID = RDH_ID;
			return state;
		});
	}

    setsoupKitchenID(soupKitchenID) {
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
                    <div className="container w-50 my-1 form-label-group">
                        <label htmlFor="RDH_ID">RDH Donor</label>
                        <p>Figure this out</p>
                    </div>
                    <div className="container w-50 my-1 form-label-group">
                        <label htmlFor="soupKitchenID">Soup Kitchen Recipient</label>
                        <p>Figure this out</p>
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
                        {/* Make this a textarea */}
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

    componentDidMount() {

    }

}

export default NewDonationForm;