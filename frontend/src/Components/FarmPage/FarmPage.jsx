import axios from "axios";
import { useEffect, useState } from "react"
import Button from '@mui/material/Button';

const FarmPage = () => {
    const [description, setDescription] = useState("");
    const [userToken, setUserToken] = useState();

    useEffect(()=>{
       setUserToken(localStorage.getItem("userToken"));

        axios.get("http://localhost:8000/api/farm/1",{
        }).then(res=>{
            console.log(res);
            setDescription(res.data.description);
        })
    },[]);

    const getDescription = () =>{
        axios.get("http://localhost:8000/api/farm/1",{
        }).then(res=>{
            console.log(res);
            console.log("hjappy");
            setDescription(res.data.description);
        })
    }
   
    return (
        <div id="#Farm-Page">
            <Button variant="contained">Hello World</Button>;

            <h1>Your Farm</h1>
            <p> Description: {description}</p>
            
            <button onClick={()=>console.log(userToken)}>debug</button>
        </div>
        )
}
export default FarmPage;
