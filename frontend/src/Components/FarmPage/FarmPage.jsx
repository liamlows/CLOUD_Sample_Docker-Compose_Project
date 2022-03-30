import axios from "axios";
import { useEffect, useState } from "react"


const FarmPage = () => {
    const [description, setDescription] = useState("");
    const [userToken, setUserToken] = useState();
    const [newDescription, setNewDescription] = useState("");

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
    const editDescription = (e) => {
        axios.post("http://localhost:8000/api/farm/description", {
             newDescription}, {
             headers: {
                "x-access-token": localStorage.getItem("userToken")
            }
        }
        ).then(getDescription())
    }
    return (
        <div id="#Farm-Page">
            <h1>Your Farm</h1>
            <p> Description: {description}</p>
            <form>
                <textarea col='50' value={newDescription} onChange={e=>setNewDescription(e.target.value)}></textarea>
                <button type='button' onClick={()=>editDescription()}> edit description</button>
            </form>
            <button onClick={()=>console.log(userToken)}>debug</button>
        </div>
        )
}
export default FarmPage;
