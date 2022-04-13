import React, { useContext } from 'react';
import './OrderExpandable.css';
import { AiOutlineArrowDown } from 'react-icons/ai';
import Collapsible from 'react-collapsible';
import { UserContext } from '../userContext';

const OrderExpandable = ({ orderId, buyerName, farmName, orderDate, itemsPurchased, fulfilled }) => {
    const userContext = useContext(UserContext);
    return (
        <div>
            <Collapsible trigger={<span>Order #{orderId} <AiOutlineArrowDown className='Collapsible__triggericon' /></span>}>
                <div className="order-buyer-name">
                    <span>Buyer: </span>
                    {buyerName}
                </div>
                <div className="order-farm-name">
                    <span>Seller: </span>
                    {farmName}
                </div>
                <div className="order-date">
                    <span>Order Date: </span>
                    {orderDate.toLocaleString()}
                </div>
                <div className="order-items">
                    <span>Items Purchased: </span>
                    {
                        itemsPurchased.map((item) => {
                            return item.name;
                        })
                    }
                </div>
                <div className={`order-fulfilled m-4 ${fulfilled ? 'alert alert-success' : 'alert alert-danger'}`}>
                    <span>Status: </span>
                    {
                        fulfilled ? 'Completed' : 'Pending'
                    }
                </div>
                
                {             
                     userContext.userData.isFarmer ? 
                             fulfilled ? null : <button className='btn btn-success float-end mb-4'>Mark as complete</button> : null
                }
                
            </Collapsible>
        </div>
    );
};

export default OrderExpandable;