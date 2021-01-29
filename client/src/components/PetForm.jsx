import React, { useState } from 'react';
import axios from 'axios';
import { navigate, Link } from '@reach/router';

const PetForm = props => {
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [description, setDescription] = useState("");
    const [skillOne, setSkillOne] = useState("");
    const [skillTwo, setSkillTwo] = useState("");
    const [skillThree, setSkillThree] = useState("");

    const changeHandler = e => {

    }
    const submitHandler = e => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/pets', {
            name,
            type,
            description,
            skillOne,
            skillTwo,
            skillThree
        })
            .then(res => console.log("Response: ", res))
            .catch(err => console.log("Error", err));
        navigate("http://localhost:3000");
    }

    return (
        <div className="body">
            <div className="header">
                <h1>Pet Shelter</h1>
                <Link to="/">back to home</Link>
            </div>
            <div className="content">
                <h2>Know a pet needing a home?</h2>
            </div>
            <form className="box" onSubmit={submitHandler}>
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
                        <input type="submit" value="Add Pet" />
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
export default PetForm;