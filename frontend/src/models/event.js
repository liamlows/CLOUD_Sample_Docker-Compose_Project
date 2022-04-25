export class event{
    constructor (event_name, event_description, event_id, farmName, farmId, userId, event_image_url) {
        this.event_name = event_name;
        this.event_description = event_description;
        this.eventId = event_id;
        this.event_image_url = event_image_url;
        this.farmName = farmName;
        this.farmId = farmId;
        this.userId = userId;
        
    }
}