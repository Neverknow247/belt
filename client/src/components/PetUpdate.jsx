import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {navigate, Link} from '@reach/router';

const PetUpdate = props => {
    const [info, setInfo] = useState("");
    const { id } = props;
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [description, setDescription] = useState("");
    const [skillOne, setSkillOne] = useState("");
    const [skillTwo, setSkillTwo] = useState("");
    const [skillThree, setSkillThree] = useState("");
    const [likes, setLikes] = useState(0);
    useEffect(() => {
        axios.get(`http://localhost:8000/api/pets/${props.id}`)
            .then(res => {
                setInfo(res.data.pet[0])
                setName(res.data.pet[0].name);
                setType(res.data.pet[0].type);
                setDescription(res.data.pet[0].description);
                setSkillOne(res.data.pet[0].skillOne);
                setSkillTwo(res.data.pet[0].skillTwo);
                setSkillThree(res.data.pet[0].skillThree);
                setLikes(res.data.pet[0].likes);
            })
    },[])
    const updateProduct = e => {
        e.preventDefault();
        axios.put('http://localhost:8000/api/pets/' + id, {
            name,
            type,
            description,
            skillOne,
            skillTwo,
            skillThree,
            likes
        })
            .then(res => console.log(res));
        navigate("/")
    }
    return (
        <div className="body">
            <div className="header">
                <h1>Pet Shelter</h1>
                <Link to="/">back to home</Link>
            </div>
            <div className="content">
                <h2>Edit {name}</h2>
            </div>
            <form className="box" onSubmit={updateProduct}>
                <div className="row">
                    <div className="column">
                        <p>
                            <label>Pet Name: </label> <br/>
                            <input type="text" onChange={e => setName(e.target.value)} />
                        </p>
                        <p>
                            <label>Pet Type: </label> <br/>
                            <input type="text" onChange={e => setType(e.target.value)} />
                        </p>
                        <p>
                            <label>Pet Description: </label> <br/>
                            <input type="text" onChange={e => setDescription(e.target.value)} />
                        </p>
                        <input type="submit" value="Update Pet" />
                    </div>
                    <div className="column">
                        <p>Skills (optional):</p>
                        <p>
                            <label>Skill 1: </label> <br/>
                            <input type="text" onChange={e => setSkillOne(e.target.value)} />
                        </p>
                        <p>
                            <label>Skill 2: </label> <br/>
                            <input type="text" onChange={e => setSkillTwo(e.target.value)} />
                        </p>
                        <p>
                            <label>Skill 3: </label> <br/>
                            <input type="text" onChange={e => setSkillThree(e.target.value)} />
                        </p>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default PetUpdate;
