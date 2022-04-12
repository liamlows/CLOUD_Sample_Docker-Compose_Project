export class farm {
    constructor(name, description, image, farmId, ownerId, dateFounded, items){
        this.farmName = name;
        this.farmDescription = description;
        this.farmImage = image;
        this.items = items;
        this.farmId = farmId;
        this.ownerId = ownerId;
        this.dateFounded = dateFounded;
    }
}