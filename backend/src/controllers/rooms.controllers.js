const roomCtrl = {};

roomCtrl.getRooms = (req,res) => res.json({message:'GET - Rooms Routes'});
roomCtrl.createRoom = (req,res) => res.json({message:'Post - Rooms Routes'});

roomCtrl.getRoom = (req,res) => res.json({message:'get - Rooms Routes'});
roomCtrl.updateRoom = (req,res) => res.json({message:'Post - Rooms Routes'});
roomCtrl.deleteRoom = (req,res) => res.json({message:'Delete - Rooms Routes'});


module.exports = roomCtrl;