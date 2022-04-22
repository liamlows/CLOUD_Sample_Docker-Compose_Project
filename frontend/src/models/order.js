export class order {
    constructor(sellerId, buyerId, buyerName, farmName, farmId, orderDate, orderId, itemsPurchased, firstName, lastName, address, city, state, zip, fulfilled) {
        this.sellerId = sellerId;
        this.buyerId = buyerId;
        this.buyerName = buyerName;
        this.farmName = farmName;
        this.farmId = farmId;
        this.orderDate = orderDate;
        this.orderId = orderId;
        this.itemsPurchased = itemsPurchased;
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.city = city;
        this.state = state;
        this.zip = zip;
        this.fulfilled = fulfilled;
    }
}