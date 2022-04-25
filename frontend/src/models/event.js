export class event{
    constructor (event_name, event_description, event_id, farmName, farmId, userId, eventImage) {
        this.event_name = event_name;
        this.event_description = event_description;
        this.eventId = event_id;
        this.eventImage = eventImage;
        this.farmName = farmName;
        this.farmId = farmId;
        this.userId = userId;
        
    }
}