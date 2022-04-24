export class farm {
    constructor(farmName, farmDescription, farmImage, farmId, ownerId, dateFounded, items, events){
        this.farmName = farmName;
        this.farmDescription = farmDescription;
        this.farmImage = farmImage;
        this.items = items;
        this.farmId = farmId;
        this.ownerId = ownerId;
        this.dateFounded = dateFounded;
        this.events = events;
    }
}