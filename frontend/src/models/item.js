export class item {
    constructor(name, description, image, itemId, price, stock,  farmId, tags){
        this.name = name;
        this.description = description;
        this.image = image;
        this.price = price;
        this.stock = stock;
        this.itemId = itemId;
        this.farmId = farmId;
        this.tags = tags;
    }
}