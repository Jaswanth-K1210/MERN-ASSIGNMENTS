import exp from "express";
import { UserModel } from "../Models/user-models.js";

const UserApp = exp.Router();
UserApp.use(exp.json());


// Create a new user

// create a own user id while creating a user and use that id to fetch the user details
// how to create a own user id while creating a user and use that id to fetch the user details? y
UserApp.post('/register', async (req, res) => {
    try {
        let newUser = req.body;
        // Generate a unique user id gracefully handling older documents that lack a 'uid'
        const lastUser = await UserModel.findOne({}, 'uid').sort({ uid: -1 });
        
        let newUid = 1;
        if (lastUser && lastUser.uid != null && !isNaN(lastUser.uid)) {
            newUid = Number(lastUser.uid) + 1;
        } else {
            const count = await UserModel.countDocuments();
            newUid = count + 1;
        }
        newUser.uid = newUid;
            
        const newUserObj = new UserModel(newUser);
        await newUserObj.save();
        console.log("New user created:", newUserObj);
        res.status(201).json({message: "User created successfully", user: newUserObj});
    } catch (err) {
        console.error("Error creating user:", err);
        res.status(500).json({message: "Error creating user", error: err.message});
    }
});

// Get all users

UserApp.get('/users', async (req, res) => {
    const users = await UserModel.find();
    if(users.length === 0){
        return res.status(404).json({message: "No users found"});
    }
    res.status(200).json({message: "List of users", users: users});
});

//Read a User by ID
UserApp.get('/users/:id', async (req, res) => {
    const userId = req.params.id;
    const userFind = await UserModel.findById(userId);
    if(!userFind){
        return res.status(404).json({message: "User not found"});
    }
    res.status(200).json({message: `User details for ID: ${userId}`, user: userFind});
});

// read user by name
UserApp.get('/name/:name', async (req, res) => {
    const userName = req.params.name;
    console.log("Searching for user with name:", userName);
    const userFind = await UserModel.findOne({name: userName});
    if(!userFind){
        return res.status(404).json({message: "User not found"});
    }
    res.status(200).json({message: `User details for name: ${userName}`, user: userFind});
});

// Update a User by ID
UserApp.put('/users/:id', async (req, res) => {
    const userId = req.params.id;
    const updateData = req.body;
    try {
        const userUpdate = await UserModel.findByIdAndUpdate(userId, updateData, { new: true });
        if(!userUpdate){
            return res.status(404).json({message: "User not found"});
        }
        res.status(200).json({message: "User updated successfully", user: userUpdate});
    } catch(err) {
        res.status(500).json({message: "Error updating user", error: err.message});
    }
});
//Delete a User by ID
UserApp.delete('/users/:id', async (req, res) => {
    const userId = req.params.id;
    const userDelete = await UserModel.findByIdAndDelete(userId);
    if(!userDelete){
        return res.status(404).json({message: "User not found"});
    }
    res.status(200).json({message: `User with ID: ${userId} deleted successfully`, user: userDelete});
});

export default UserApp;