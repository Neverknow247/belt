const Pet = require("../models/pets.model");
const petRoutes = require("../routes/pets.routes");

module.exports.findAllPets = (req,res) => {
    Pet.find()
        .then(allPets => res.json({ pet: allPets}))
        .catch(err => res.status(200).json({message:"Somthing went wrong!", error: err}));
};
module.exports.findOnePet = (req,res) => {
    Pet.find({_id: req.params.id})
        .then(onePet => res.json({ pet: onePet}))
        .catch(err => res.status(200).json({message:"Somthing went wrong!", error: err}));
};
module.exports.createPet = (req,res) => {
    let {name, type, description, skillOne, skillTwo, skillThree} = req.body;
    let likes = 0;
    Pet.create({
        name,
        type,
        description,
        skillOne,
        skillTwo,
        skillThree,
        likes
    })
        .then(pet=>res.json(pet))
        .catch(err=>res.json({message:"Somthing went wrong!", error: err}))
};
module.exports.updatePet = (req, res) => {
    Pet.findOneAndUpdate({_id: req.params.id}, req.body, {new:true})
        .then(updatePet => res.json({pet: updatePet}))
        .catch(err=>res.json({message:"Somthing went wrong", error: err}));
};
module.exports.deletePet = (req, res) => {
    Pet.deleteOne({_id: req.params.id})
        .then(deleteConfirmation => res.json({pet: deleteConfirmation}))
        .catch(err=>res.json({message:"Something went wrong", error: err}));
};