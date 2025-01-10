const express = require("express");
const router = express.Router();
const users = require("../Model/user");

router.use(express.json());


// to create signup route
router.post('/',async(req,res)=>{
    try {
        const data =req.body;
        let newUser = await users(data).save();
        console.log(newUser);
        res.status(200).send({message:"Data added"})
    } catch (error) {
        console.log(error)
    }
})

// route for login
router.post('/login', async (req, res) => {
    console.log(req.body);
    const { username, password } = req.body;

    try {
        const user = await users.findOne({ username: username });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.password === password) {
            return res.status(200).json({ message: "Login successful", user });
        } else {
            return res.status(401).json({ message: "Invalid credentials" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "An error occurred" });
    }
});





module.exports = router;