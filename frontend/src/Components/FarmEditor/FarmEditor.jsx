import { useEffect, useState } from "react"
import Button from '@mui/material/Button';
import { useParams } from "react-router-dom";
import { getFarmById , updateFarmByID} from "../../api/farms";
import { farm } from "../../models/farm";
import FarmImg from '../../images/farm.jpg';
import { item } from "../../models/item";
import { Link } from "react-router-dom";
import { TextField } from '../common/TextField';
import {CheckboxField} from '../common/CheckboxField';
import { SelectField } from '../common/SelectField';

const FarmEditor = () => {
    const params = useParams();

    const [ thisfarm, setFarm ] = useState(undefined);

    const myfarm = new farm("Awesome Farm", "This is an awesome farm.", FarmImg, [new item("Horse", "Big horse", "horse.jpg", 20, 1, 2)], 1, 1, "2005");
   
    useEffect(() => {
        if (params.farmId) {
            getFarmById(params.farmId).then(x => setFarm(x));
        }
    }, []);

    const handleSaveClick = () => {
        if (myfarm.farmId) {
            updateFarmByID(myfarm, myfarm.farmId).then(x => setFarm(x));
        }
    };

    const mergeAccount = delta => setFarm({ ...myfarm, ...delta});

    return <form className="container">
        <h1> Edit {myfarm.name} </h1>
        <TextField label="Name"
                   value={myfarm.name}
                   setValue={ name => mergeAccount({ name }) } />

        <TextField label="Description"
                   value={myfarm.description}
                   setValue={ description => mergeAccount({ description }) } />

        <TextField label="Farm Image"
                    value={myfarm.image}
                    setValue={ image => mergeAccount({ image }) } />
        <button type="button"
                className="btn btn-success btn-lg col-12 mt-4"
                onClick={() => handleSaveClick()}>
            Save
        </button>
    </form>;
};
export default FarmEditor;
