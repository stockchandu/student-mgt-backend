const router = require("express").Router();
const Admin = require("../model/admin.model");
const jwt = require("jsonwebtoken");
const SECRET = "CHANDAN";

const newToken = (user) => {
    return jwt.sign({ user }, SECRET)
}

router.post("/admin_data", async (req, res) => {
    let userAdmin;
    try {
        let { firstname, lastname, email, password,profile_img } = req.body;

        userAdmin = await Admin.findOne({ email: email });
        if (userAdmin) {
            return res.status(400).send({ status: "email already exist" });
        }

        else {
            userAdmin = new Admin({
                firstname, lastname, email, password,profile_img
            })

            userAdmin.save();

            const token = newToken(userAdmin);

            return res.status(200).send({ userAdmin, token });
        }

    } catch (error) {
        return res.status(400).send({ error: "user exist" });
    }
})


//admin login
router.post("/admin_login", async (req, res) => {
    let userAdmin;
    try {
        let { firstname, lastname, email, password ,profile_img} = req.body;
        userAdmin = await Admin.findOne({ email: email });
        const checkPassword = userAdmin.password;
        if (!userAdmin) return res.status(400).send({ err: "wrong admin details" });
        if (checkPassword !== password) return res.status(200).send({ err: "wrong admin details", status: 400 });
        const token = newToken(userAdmin);
        return res.status(200).send({ userAdmin, token });
    } catch (error) {
        return res.status(400).send({ error: "issue with login", status: 400 });
    }
})

//update admin
router.patch("/admin_update/:id", async (req, res) => {
    let userAdmin;
    try {
        let { firstname, lastname, email, password, profile_img } = req.body;
        console.log(profile_img)
        userAdmin = await Admin.findByIdAndUpdate(req.params.id, req.body
          ,{ new: true })
        return res.status(200).send({ userAdmin})
    } 
    catch (error) {
    return res.status(400).send({ error: "issue with login", status: 400 });
}
})


module.exports = router;