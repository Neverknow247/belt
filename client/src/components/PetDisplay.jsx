import { navigate, Link } from "@reach/router";
import axios from "axios";
import { useEffect, useState } from "react";

const PetDisplay = props => {
    const [info, setInfo] = useState("");
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [description, setDescription] = useState("");
    const [skillOne, setSkillOne] = useState("");
    const [skillTwo, setSkillTwo] = useState("");
    const [skillThree, setSkillThree] = useState("");
    const [like, setLikes] = useState(0);
    const [clicked, setClicked] = useState("notClicked")

    useEffect(() => {
        axios.get(`http://localhost:8000/api/pets/${props.id}`)
            .then(res => {
                console.log(res.data.pet);
                setInfo(res.data.pet[0]);
                setName(res.data.pet[0].name);
                setType(res.data.pet[0].type);
                setDescription(res.data.pet[0].description);
                setSkillOne(res.data.pet[0].skillOne);
                setSkillTwo(res.data.pet[0].skillTwo);
                setSkillThree(res.data.pet[0].skillThree);
                setLikes(res.data.pet[0].likes);
                console.log("set")
            })
            .catch(err => {
                console.log("Error:", err);
            })
    }, []);




    const editHandler = e => {
        navigate(`/${info._id}/edit`);
    }
    const deletePet = e => {
        axios.delete(`http://localhost:8000/api/pets/${info._id}`);
        navigate("/");
    }
    const clickHandler = e => {
        let num = like;
        num += 1;
        setLikes(num);
        console.log(like)
        let likes = num
        axios.put(`http://localhost:8000/api/pets/${info._id}`, {
            name,
            type,
            description,
            skillOne,
            skillTwo,
            skillThree,
            likes
        })
            .then(res => console.log(res));
        setClicked("Clicked");
    }

    return (
        <div className="body">
            <div className="header">
                <h1>Pet Shelter</h1>
                <Link to="/">back to home</Link>
            </div>
            <div className="header">
                <h2>Details about: {info.name}</h2>
                <button className="adopt" onClick={deletePet}>Adopt {info.name}</button>
            </div>
            <div className="box">
                <div className="row2">
                    <div className="column">
                        <p className="bold">Pet Type:</p>
                        <p className="bold">Description:</p>
                        <p className="bold">Skills:</p>
                    </div>
                    <div className="column">
                        <p>{info.type}</p>
                        <p>{info.description}</p>
                        <p>
                            <ul>
                                <li>{info.skillOne}</li>
                                <li>{info.skillTwo}</li>
                                <li>{info.skillThree}</li>
                            </ul>
                        </p>
                    </div>
                </div>
                <div>
                    <p>{clicked == "notClicked" ? 
                    <button onClick={clickHandler} className="like">Like {info.name}</button> : 
                    <button disabled className={"likeDisabled"}>Like {info.name}</button>}{info.likes} like(s)</p>
                </div><br />
            </div>
        </div>
    )
}
export default PetDisplay;