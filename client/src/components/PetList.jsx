import { navigate, Link } from '@reach/router';
import axios from 'axios';
import React from 'react';

const PetList = props => {

    const clickHandler = pet => {
        navigate(`/${pet._id}`)
        // console.log(pet)
    }
    const deletePet = pet => {
        axios.delete(`http://localhost:8000/api/pets/${pet._id}`)
            .then(res => {
                props.removeFromDom(pet)
            })
    }

    return (
        <div className="body">
            <div className="header">
                <h1>Pet Shelter</h1>
                <Link to="/pets/new">add a pet to the shelter</Link>
            </div>
            <div className="content">
                <h2>These pets are looking for a good home</h2>
            </div>
            <table>
                <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Actions</th>
                </tr>
                {/* {console.log(props.pets)} */}
                {props.pets.map((pet, i) => {
                    return <tr key={i}>
                        <td>{pet.name}</td>
                        <td>{pet.type}</td>
                        <td>
                            <Link to={`/${pet._id}`}>Details</Link> | <Link to={`/${pet._id}/edit`}>Edit</Link>
                            {/* <button onClick={e => { deletePet(pet) }}>Delete</button> */}
                        </td>
                    </tr>
                })}
            </table>
        </div>
    )
}
export default PetList;