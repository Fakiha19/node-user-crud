const User = require('../models/user.model.js');
exports.create = (req, res) => {
    // Validate request
    if(!req.body.name && !req.body.email) {
        return res.status(400).send({
            message: "User name or email can not be empty"
        });
    }

    // Create a User
    const user = new User({
    name: req.body.name ,
    email: req.body.email,
    address:req.body.address,
    contact:req.body.contact,
    interest:req.body.interest,
    });

    // Save User in the database
    user.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the user."
        });
    });
};
exports.findAll = (req, res) => {
    User.find()
    .then(users => {
        res.send(users);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving users."
        });
    });
};
// Find a single user with a userId
exports.findOne = (req, res) => {
    User.findById(req.params.userId)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });            
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving user with id " + req.params.userId
        });
    });
};
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.name && !req.body.email) {
        return res.status(400).send({
            message: "User name or email can not be empty"
        });
    }

    // Find User and update it with the request body
    User.findByIdAndUpdate(req.params.userId, {
    name: req.body.name ,
    email: req.body.email,
    address:req.body.address,
    contact:req.body.contact,
    interest:req.body.interest,
    }, {new: true})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Error updating user with id " + req.params.userId
        });
    });
};
exports.delete = (req, res) => {
    User.findByIdAndRemove(req.params.userId)
    .then(User => {
        if(!User) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        res.send({message: "User deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Could not delete user with id " + req.params.userId
        });
    });
};