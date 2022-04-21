import axios from "axios";
import { useEffect, useState } from "react"
import Button from '@mui/material/Button';
import { useParams } from "react-router-dom";
import { getFarmById } from "../../api/farms";
import { farm } from "../../models/farm";
import FarmImg from '../../images/farm.jpg';
import horse from '../../images/horse.jpg';
import { item } from "../../models/item";
import './FarmPage.css';
import { Link } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import { ItemCard } from "../ItemCard/itemCard";

const FarmPage = () => {
    const params = useParams();

    const [ thisfarm, setFarm ] = useState(undefined);

    const myfarm = new farm(
        "Awesome Farm", 
        "This is an awesome farm.", 
        FarmImg, 
        [new item("Horse", "Big horse", horse, 20, 1, 2)], 
        1, 
        1,
        "2005");
   
    useEffect(() => {
        if (params.farmId) {
            getFarmById(params.farmId).then(x => setFarm(x));
        }
    }, []);

    return <>
        <div className="farmPage">
            <div className="farmIntro" >
                <img src={myfarm.image} className="farmImage">
                </img>
                <div className="farmSpecifics">
                    <h2 className="fw-light"> {myfarm.name} </h2>
                    <h6 className="fw-light"> Est. {myfarm.dateFounded} </h6>
                    <div className="row">
                        <div className="column">
                            <p className=""> {myfarm.description} </p>
                        </div>
                        <div className="column">
                            <Link to="/editfarm" className="btn btn-success float-end">
                                Edit Farm
                            </Link> 
                            <div className="clearfix"></div>
                        </div>
                    </div>
                </div>
                <hr />
            </div>
            <Typography variant={"h5"} fontWeight={"bold"} mt={2} mb={2} textAlign={"center"}>
                Items for Sale
            </Typography>
            <Grid container textAlign={"center"}>
                <Grid container
                        spacing={1}
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="stretch"
                        mb={4}
                >
                        {
                            myfarm.items.map((item, index) => {
                                return index < 6 ? 
                                <Grid item xs={6} sm={4} md={3} lg={3} key={index}>
                                    <ItemCard name={item.name}
                                        description={item.description}
                                        image={item.image}
                                        price={item.price}
                                        stock={item.stock}
                                        addText={"Add to cart"} />
                                </Grid> : null
                            })
                        }
                </Grid>
            </Grid>
            <Link to="/edititems" className="btn btn-success col-12 mb-2">
                Edit Items
            </Link> 
        </div>
    </>;
};
export default FarmPage;
