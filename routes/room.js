const validationSchema = require('../middlewares/validationSchema');
const validateObjectID = require('../middlewares/validateObjectID');
const { workingSpaceModel } = require('../models/workingSpace');
const { roomModel, roomValidation } = require('../models/room');
const Authorization = require('../middlewares/auth');
const Admin = require('../middlewares/admin');
const express = require('express');
const _ = require('lodash');

const router = express.Router();


// get all the rooms                            ---> done
// get all available rooms                      ---> done
// get all unavailable rooms                    ---> done
// get a specific room                          ---> done
// create a new room                            ---> done
// delete a specific room                       ---> done
// get an available room in the working space   


router.get('/workingSpace', async (req, res) => {
    const workingSpace = await workingSpaceModel.findById(req.workingSpace._id).select()
    const rooms = await roomModel.find().sort('name');
    res.status(200).send(rooms);
});

router.get('/available', async (req, res) => {
    const rooms = await roomModel.find({ availabilityStatus: 'available' }).sort('name');
    res.status(200).send(rooms);
});

router.get('/unavailable', async (req, res) => {
    const rooms = await roomModel.find({ availabilityStatus: 'unavailable' }).sort('name');
    res.status(200).send(rooms);
});

router.get('/:id', validateObjectID , async (req, res) => {
    const rooms = await roomModel.findById(req.params.id);
    if (!rooms) return res.status(404).send('This workingSpace ID is not available in the database.');
    res.status(200).send(rooms);
});

router.post('/', [Authorization, validationSchema(roomValidation)] , async (req, res) => {
    
    const workingSpace = await workingSpaceModel.findById(req.body.workspaceId);
    if (!workingSpace) return res.status(400).send('This workingSpace is not available in the database...');

    const room = new roomModel({
        name: req.body.name,
        capacity: req.body.capacity,
        pricePerHour: req.body.pricePerHour,
        availabilityStatus: req.body.availabilityStatus,
        workspaceId: workingSpace._id
    });
    await room.save();
    res.status(201).send(room);
});

router.put('/:id', [Authorization, validateObjectID , validationSchema(roomValidation)] , async (req, res) => {

    const room = await roomModel.findByIdAndUpdate(req.params.id, { 
        name: req.body.name,
        location: req.body.location,
        address: req.body.address,
        description: req.body.description,
    }, { new: true });

    room.updatedAt = Date.now();
    await room.save();

    if (!room) return res.status(404).send('This workingSpace ID is not available in the database.');
    res.status(200).send(room);
});

router.delete('/:id', [Authorization, validateObjectID , Admin ], async (req, res) => {
    const room = await roomModel.findByIdAndDelete(req.params.id);
    if (!room) return res.status(404).send('This workingSpace ID is not available in the database.');
    res.status(204).send(room);
});

module.exports = router;