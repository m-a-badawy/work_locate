const { workingSpaceModel, workingSpaceValidation } = require('../models/workingSpace');
const validationSchema = require('../middlewares/validationSchema');
const validateObjectID = require('../middlewares/validateObjectID');
const Authorization = require('../middlewares/auth');
const { userModel } = require('../models/user');
const { roomModel } = require('../models/room');
const Admin = require('../middlewares/admin');
const express = require('express');
const _ = require('lodash');

const router = express.Router();


// get all the working spaces                   ---> done
// get a specific working space                 ---> done
// get an available room in the working space   ---> done
// create a new working space                   ---> done
// delete a specific working space              ---> done


router.get('/', async (req, res) => {
    const workingSpaces = await workingSpaceModel.find().sort('name');
    res.status(200).send(workingSpaces);
});

router.get('/:id', validateObjectID , async (req, res) => {
    const workingSpace = await workingSpaceModel.findById(req.params.id);
    if (!workingSpace) return res.status(404).send('This workingSpace ID is not available in the database.');
    res.status(200).send(workingSpace);
});

router.get('/:workspaceId/rooms/available', async (req, res) => {

    const rooms = await roomModel.find({
        workspaceId,
        availabilityStatus: 'available'
    });

    if (!rooms.length) return res.status(404).send('No available rooms found.');

    res.send(rooms);
});

router.post('/', [Authorization, validationSchema(workingSpaceValidation)] , async (req, res) => {

    const user = await userModel.findById(req.body.adminId);
    if (!user) return res.status(400).send('This user is not available in the database...');
    if (!user.isAdmin) return res.status(403).send('This user is not an admin....');

    const workingSpace = new workingSpaceModel({
        name: req.body.name,
        location: req.body.location,
        address: req.body.address,
        description: req.body.description,
        adminId: user._id,
    });
    await workingSpace.save();
    res.status(201).send(workingSpace);
});

router.put('/:id', [Authorization, validateObjectID , validationSchema(workingSpaceValidation)] , async (req, res) => {

    const workingSpace = await workingSpaceModel.findByIdAndUpdate(req.params.id, { 
        name: req.body.name,
        location: req.body.location,
        address: req.body.address,
        description: req.body.description,
    }, { new: true });

    workingSpace.updatedAt = Date.now();
    await workingSpace.save();
    
    if (!workingSpace) return res.status(404).send('This workingSpace ID is not available in the database.');
    res.status(200).send(workingSpace);
});

router.delete('/delete', [Authorization, validateObjectID , Admin ], async (req, res) => {
    const workingSpace = await workingSpaceModel.findByIdAndDelete(req.params.id);
    if (!workingSpace) return res.status(404).send('This workingSpace ID is not available in the database.');
    res.status(204).send(workingSpace);
});

module.exports = router;