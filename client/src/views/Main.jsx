import PetForm from '../components/PetForm'
import PetList from '../components/PetList'
import { useEffect, useState } from 'react';
import axios from 'axios';

const Main = () => {
    const [pets, setPets] = useState([]);
    const[loaded, setLoaded] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:8000/api/pets')
            .then(res => {
                setPets(res.data.pet);
                setLoaded(true);
            })
            .catch(err => console.log("Error: ", err))
    },[])
    const removeFromDom = petId => {
        setPets(pets.filter(pet => pet._id != petId._id));
    }
    return (
        <div className="App">
            {loaded && <PetList pets={pets} removeFromDom={removeFromDom}/>}
        </div>
    )
}

export default Main;
