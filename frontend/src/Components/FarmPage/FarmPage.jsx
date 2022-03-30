import axios from "axios";
import { useEffect, useState } from "react"


const FarmPage = () => {
    const [description, setDescription] = useState("");
    const [userToken, setUserToken] = useState();
    const [newDescription, setNewDescription] = useState("");

<<<<<<< HEAD
    useEffect(() => {
        setUserToken(localStorage.getItem("userToken"));
        axios.get("http://localhost:8000/api/farm/", {
            userToken
        }).then(res => {
=======
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
>>>>>>> 14d9d0d529dd27fb685de335955d80be9671ad8f
            console.log(res);
            console.log("hjappy");
            setDescription(res.data.description);
        })
<<<<<<< HEAD
    }, [userToken]);

=======
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
>>>>>>> 14d9d0d529dd27fb685de335955d80be9671ad8f
    return (
        <div id="#Farm-Page">
            <h1>Your Farm</h1>
            <p> Description: {description}</p>
<<<<<<< HEAD
            <button onClick={() => console.log(userToken)}>debug</button>
        </div>
    )
=======
            <form>
                <textarea col='50' value={newDescription} onChange={e=>setNewDescription(e.target.value)}></textarea>
                <button type='button' onClick={()=>editDescription()}> edit description</button>
            </form>
            <button onClick={()=>console.log(userToken)}>debug</button>
        </div>
        )
>>>>>>> 14d9d0d529dd27fb685de335955d80be9671ad8f
}
export default FarmPage;
