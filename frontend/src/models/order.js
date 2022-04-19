export class order {
    constructor (sellerId, buyerId, buyerName, farmName, farmId, orderDate, orderId, itemsPurchased, fulfilled) {
        this.sellerId = sellerId;
        this.buyerId = buyerId;
        this.buyerName = buyerName;
        this.farmName = farmName;
        this.farmId = farmId;
        this.orderDate = orderDate;
        this.orderId = orderId;
        this.itemsPurchased = itemsPurchased;
        this.fulfilled = fulfilled;
    }
}