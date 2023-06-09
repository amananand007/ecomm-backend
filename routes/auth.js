const express = require("express")
const router = express.Router()
const { check, validationResult } = require('express-validator');
const {signout,signup,signin, isSignedIn} = require("../controllers/auth")



router.post("/signup",[
    check("name","name should atleast 3 character").isLength({ min: 3 }),
    check("email","email is requied").isEmail(),
    check("password","password should be atleast 3 character").isLength({min:3})
],signup
);


router.post("/signin",[
    check("email","email is requied").isEmail(),
    check("password","password field is required").isLength({min:3})
],signin
);
router.get("/signout", signout)


router.get("/testroute",isSignedIn,(req,res) => {
    res.send("A protected route")
})



module.exports = router;