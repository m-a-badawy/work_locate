const {roomModel} = require('../models/room');
const {workingSpaceModel} = require('../models/workingSpace');

module.exports = async function getAvailableRooms(req, res) {
    const  workspaceId  = req.params;

    const workspace = await workingSpaceModel.findById(workspaceId);
    if (!workspace) return res.status(404).send('Workspace not found in the database.....');

    const availableRooms = await roomModel.find({ workspaceId, isAvailable: true });

    return res.status(200).send(availableRooms);
}