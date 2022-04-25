export class event{
    constructor (eventTitle, eventDescription, eventId, eventTime, eventDate, farmName, farmId, userId, eventImage) {
        this.eventTitle = eventTitle;
        this.eventTime = eventTime;
        this.eventDate = eventDate;
        this.eventDescription = eventDescription;
        this.eventId = eventId;
        this.eventImage = eventImage;
        this.farmName = farmName;
        this.farmId = farmId;
        this.userId = userId;
        
    }
}