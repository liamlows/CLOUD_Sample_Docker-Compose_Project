export class NFT{
    constructor(id,name,image_url,price,description,creator_id,seller_id,owner_id,for_sale){
        this.id=id;
        this.name=name;
        this.image_url=image_url;
        this.price=price;
        this.description=description;
        this.creator_id=creator_id;
        this.seller_id=seller_id;
        this.owner_id=owner_id;
        this.for_sale=for_sale;
    }
}