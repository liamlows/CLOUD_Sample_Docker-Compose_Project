import axios from "axios";
import { useContext, useEffect, useState } from "react"
import Button from '@mui/material/Button';
import { useParams } from "react-router-dom";
import { getFarmById } from "../../api/farms";
import { farm } from "../../models/farm";
import FarmImg from '../../images/farm.jpg';
import horse from '../../images/horse.jpg';
import { item } from "../../models/item";
import './FarmPage.css';
import { Link } from "react-router-dom";
import { Divider, Grid, Typography } from "@mui/material";
import { ItemCard } from "../ItemCard/itemCard";
import AddItemToCartDialog from "../AddItemToCartDialog/AddItemToCartDialog";
import { UserContext } from "../userContext";
import AddItemToFarmDialog from "../AddItemToFarmDialog/AddItemToFarmDialog";
import FarmItemAdder from "../FarmItemAdder/FarmItemAdder";
import EventCard from "../eventCard/EventCard";
import { event } from "../../models/event";
import CreateEventDialog from "../CreateEventDialog/CreateEventDialog";
import EditFarmDialog from "../EditFarmDialog/EditFarmDialog";

const FarmPage = () => {
    const params = useParams();
    const [showCreateEvent, setShowCreateEvent] = useState(false);
    const [showEditFarm, setShowEditFarm] = useState(false);
    const [showEditItemDialog, setShowEditItemDialog] = useState();
    const [showAddItemDialog, setShowAddItemDialog] = useState();
    const [addItemDetails, setAddItemDetails] = useState();
    const [showAddItem, setShowAddItem] = useState(false);
    const userContext = useContext(UserContext);

    const [thisfarm, setFarm] = useState(new farm(
        "Awesome Farm",
        "This is an awesome farm.",
        FarmImg,
        1,
        1,
        "2005",
        [new item("Horse", "Big horse", horse, 1, 20, 4, 4)],
        [
            new event("Horse backriding party", "Bring your whole family !", 3, "Yellow Mountain Farm", 2, 1, "https://upload.wikimedia.org/wikipedia/commons/4/48/GGF_Race5.jpg"),
            new event("BIG BANG BOOM BASS = ", "Big ol bag lala palozaoza im just making up words here to test stuff with variable length", 6, "Yellow Mountain Farm", 4, 3, "https://i.cbc.ca/1.6165805.1630877196!/fileImage/httpImage/lawn-tractor-races.jpg"),
            new event("Horse backriding party forever and ever", "Loreeat cupiditate ut, minus necessit cupiditate ut, minus necessit cupiditate ut, minus necessit cupiditate ut, minus necessita quod vel eaque mollitia iste itaque ipsam? Rem?", 3, 1, "Yellow Mountain Farm", 2, "https://i.cbc.ca/1.6165805.1630877196!/fileImage/httpImage/lawn-tractor-races.jpg"),

        ]));


    const handleAddItem = (item) => {
        setShowAddItemDialog(true);
        setAddItemDetails(item)
    }

    const handleEditItem = (item) => {
        setShowEditItemDialog(true);
        setAddItemDetails(item)
    }
    useEffect(() => {
        if (params.farmId) {
            //getFarmById(params.farmId).then(x => setFarm(x));
        }

    }, [showCreateEvent, showAddItem, showEditItemDialog]);
    

    if (showAddItem)
        return <FarmItemAdder close={() => setShowAddItem(false)} />

    return <>
        <div className="farmPage p-4">
            <div className="farmIntro" >
                <img src={thisfarm.farmImage} className="farmImage" alt={thisfarm.farmName} />
                <div className="farmSpecifics">
                    <h2 className="fw-light"> {thisfarm.farmName} </h2>
                    <h6 className="fw-light"> Est. {thisfarm.dateFounded} </h6>
                    <div className="row">
                        <div className="column">
                            <p className=""> {thisfarm.farmDescription} </p>
                        </div>
                        <div className="column">
                            <div to="/editfarm" className="btn btn-success float-end" onClick={()=> setShowEditFarm(true)}>
                                Edit Farm
                            </div>
                            <div className="clearfix"></div>
                        </div>
                    </div>
                </div>
                <hr />
            </div>
            <Typography variant={"h5"} fontWeight={"bold"} mt={2} mb={2} textAlign={"center"}>
                Items for Sale
            </Typography>
            {
                userContext.userData.userId == params.id && <div onClick={() => setShowAddItem(true)} className="btn btn-success mb-2 float-end"> 
                    Add items to your farm
                </div>
            }
            <Grid container
                spacing={1}
                direction="row"
                justifyContent="flex-start"
                alignItems="stretch"
                mb={4}
            >
                {
                    thisfarm.items.map((item, index) => {
                        return <Grid item xs={12} sm={6} md={4} lg={3} key={index} padding={0}>
                            <ItemCard
                                name={item.name}
                                description={item.description}
                                image={item.image}
                                price={item.price}
                                stock={item.stock}
                                itemId={item.itemId}
                                addText={userContext.userData.userId == params.id ? "Edit item" : "Add to cart"}
                                action={item => userContext.userData.userId == params.id ? handleEditItem(item) : handleAddItem(item)} />
                        </Grid>
                    })
                }
            </Grid>
            <Divider variant="middle" sx={{margin:'0 20%'}}/>

            <Typography variant={"h5"} fontWeight={"bold"} mt={2} mb={2} textAlign={"center"}>
                Farm Events
            </Typography>
            {
                userContext.userData.userId == params.id && <div onClick={() => setShowCreateEvent(true)} className="btn btn-success mb-2 float-end"> 
                    Create new event
                </div>
            }
            <Grid container  rowSpacing={1} columnSpacing={[0,1]} sx={{ width: ["100%"] }}>
                {
                    thisfarm.events.map((event) => {
                        return <Grid item sm={6} md={4} lg={3} width="100%">
                            <EventCard {...event} />
                        </Grid>
                    })
                }
            </Grid>

            {
                showAddItemDialog && <AddItemToCartDialog
                    open={showAddItemDialog}
                    setOpen={setShowAddItemDialog}

                    {...addItemDetails} />
            }

            {
                showEditItemDialog && <AddItemToFarmDialog
                    open={showEditItemDialog}
                    setOpen={setShowEditItemDialog}
                    itemName={addItemDetails.name}
                    itemDescription={addItemDetails.description}
                    {...addItemDetails} />
            }
            {
                showEditFarm && <EditFarmDialog open={showEditFarm}
                                             setOpen={setShowEditFarm}
                                             farmName={thisfarm.farmName}
                                             farmDescription={thisfarm.farmDescription}
                                             farmImage={thisfarm.farmImage}
                                             farmId={params.id}/>
            }   
        
            {showCreateEvent && <CreateEventDialog open={showCreateEvent} setOpen={setShowCreateEvent}/>}
        </div>
    </>;
};
export default FarmPage;
