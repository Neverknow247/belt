const PetsController = require("../controllers/pets.controller");

module.exports = app => {
    app.get("/api/pets", PetsController.findAllPets);
    app.get("/api/pets/:id", PetsController.findOnePet);
    app.post("/api/pets", PetsController.createPet);
    app.put("/api/pets/:id", PetsController.updatePet);
    app.delete("/api/pets/:id", PetsController.deletePet);
};