export class Message {
    constructor(id, userID, battleID, text, date) {
        this.id = id;
        this.userID = userID;
        this.battleID = battleID;
        this.text = text;
        this.date = date;
    }
}