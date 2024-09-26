import express from 'express'
import { deleteUser, getUser, getUsers, updateUser } from '../controllers/user.js';
import { verifyAdmin, verifyToken, verifyUser  } from '../utils/verifyToken.js';

const router = express.Router();

router.get("/checkauthentication", verifyToken, (req, res, next) => {
    res.send("Hello user, You are logged in");
})

router.get("/checkuser/:id",verifyUser , (req, res, next) => {
    res.send("hello user, you are logged in and you can delete your account")
})

router.get("/checkadmin/:id",verifyAdmin , (req, res, next) => {
    res.send("hello admin, you are logged in and you can delete any accounts")
})



// Update
router.put("/:id",verifyUser, updateUser);

// delete
router.delete("/:id",verifyUser, deleteUser);

// get
router.get("/:id",verifyUser, getUser);

// get all
router.get('/',verifyAdmin, getUsers);

export default router;