const express = require('express');
const app = express();


app.use(express.json()); // Pour le parsing de JSON

// Ici, vous allez définir vos routes.

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


const db = require('./models');

// Synchronisation des modèles avec la base de données
db.sequelize.sync().then(() => {
    console.log("Les modèles ont été synchronisés avec la base de données.");
});

app.get('/index.html', (req, res) => {
    res.sendFile(__dirname + '/index.html');
}); 
const {Profs} = require('./models');


// ajouter profs
app.post('/addprofs', async (req, res) => {
    try {
        const nouveauProf = await Profs.create(req.body);
        res.status(201).json(nouveauProf);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// recuperer la liste
app.get('/profs', async (req, res) => {
    try {
        const profs = await Profs.findAll();
        res.status(200).json(profs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



app.get('/profs/:id', async (req, res) => {
    try {
        const prof = await Profs.findByPk(req.params.id);
        if (prof) {
            res.status(200).json(prof);
        } else {
            res.status(404).json({ message: 'Prof non trouvé' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//update profs 
app.put('/updateprofs/:id', async (req, res) => {
    try {
        const prof = await Profs.findByPk(req.params.id);
        if (prof) {
            await prof.update(req.body);
            res.status(200).json(prof);
        } else {
            res.status(404).json({ message: 'Prof non trouvé' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//delete profs
//app.delete('/profs/:id', async (req, res) => {
//    try {
//        const nombreSupprime = await Profs.destroy({
//            where: { id: req.params.id }
//        });
//        if (nombreSupprime) {
//            res.status(200).json({ message: 'Prof supprimé' });
//        } else {
//            res.status(404).json({ message: 'Prof non trouvé' });
//        }
//    } catch (error) {
//        res.status(400).json({ message: error.message });
//    }
//});

// DELETE /profs/:id - Delete a teacher by ID
app.delete('/profs/:id', async (req, res) => {
    try {
        // Retrieve the ID of the teacher to delete from the request parameters
        const id = req.params.id;

        // Attempt to delete the teacher from the database
        const nombreSupprime = await Profs.destroy({
            where: { id: id }
        });

        // Check if any record was deleted
        if (nombreSupprime) {
            res.status(200).json({ message: 'Prof supprimé' }); // Success response
        } else {
            res.status(404).json({ message: 'Prof non trouvé' }); // No record found to delete
        }
    } catch (error) {
        // Handle any errors that occur during the delete operation
        res.status(500).json({ message: error.message }); // Server error response
    }
});
