import axios from "axios";
import { useEffect, useState } from "react"


const FarmPage = () => {
    const [description, setDescription] = useState("");
    const [userToken, setUserToken] = useState();

    useEffect(() => {
        setUserToken(localStorage.getItem("userToken"));
        axios.get("http://localhost:8000/api/farm/", {
            userToken
        }).then(res => {
            console.log(res);
            setDescription(res.data.description);
        })
    }, [userToken]);

    return (
        <div id="#Farm-Page">
            <h1>Your Farm</h1>
            <p> Description: {description}</p>
            <button onClick={() => console.log(userToken)}>debug</button>
        </div>
    )
}
export default FarmPage;
