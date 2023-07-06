import { Router } from 'express';
import { sample_users } from '../data';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import { User, UserModel } from '../models/user.model';
import { HTTP_BAD_REQUEST } from '../constants/http_status';
import bcrypt from 'bcryptjs';
const router = Router();

router.get("/seed", asyncHandler(
    async (req, res) => {
        const usersCount = await UserModel.countDocuments();
        console.log('usersCount', usersCount);
        if (usersCount > 0) {
            res.send("Seed is already done!");
            return;
        }

        await UserModel.create(sample_users);
        res.send("Seed Is Done!");
    }
))

router.get("/all", asyncHandler(
    async (req, res) => {
        const users = await UserModel.find().select('-password');
        res.send(users);
    }
))


router.put('/updateProfile', asyncHandler(async (req: any, res) => {
    console.log('currentuser update profile req', req.body)
    const { id, name, address } = req.body;
    console.log('currentuser update profile req', id)
    //const user = await UserModel.find({ user: id });

    const userExist = await UserModel.findById(id);

    const user = await UserModel.findByIdAndUpdate(
        id,
        {
            name: name,
            address: address,

        },
        // { new: true }
    )

    if (user) {
        const updatedUser = await UserModel.findById(id).select('-password');
        res.send(generateTokenReponse(updatedUser!));
    }
    else {
        res.status(HTTP_BAD_REQUEST).send('the user details cannot be update!');
    }
}))

router.put('/updatePassword', asyncHandler(async (req: any, res) => {
    console.log('currentuser update password req', req.body)
    const { id, password } = req.body;
    //const user = await UserModel.find({ user: id });
    const userExist = await UserModel.findById(id);

    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.findByIdAndUpdate(
        id,
        {
            password: encryptedPassword,

        },
        // { new: true }
    )

    if (user) {
        const updatedUser = await UserModel.findById(id).select('-password');
        res.send(updatedUser);
    }
    else {
        res.status(HTTP_BAD_REQUEST).send('the user password cannot be update!');
    }
}))


router.post("/login", asyncHandler(
    async (req, res) => {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            res.send(generateTokenReponse(user));
        }
        else {
            res.status(HTTP_BAD_REQUEST).send("Username or password is invalid!");
        }

    }
))

router.post('/register', asyncHandler(
    async (req, res) => {
        const { name, email, password, address } = req.body;
        const user = await UserModel.findOne({ email });
        if (user) {
            res.status(HTTP_BAD_REQUEST)
                .send('User is already exist, please login!');
            return;
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        const newUser: User = {
            id: '',
            name,
            email: email.toLowerCase(),
            password: encryptedPassword,
            address,
            isAdmin: false
        }

        const dbUser = await UserModel.create(newUser);
        res.send(generateTokenReponse(dbUser));
    }
))

const generateTokenReponse = (user: User) => {
    const token = jwt.sign({
        id: user.id, email: user.email, isAdmin: user.isAdmin
    }, process.env.JWT_SECRET!, {
        expiresIn: "30d"
    });

    return {
        id: user.id,
        email: user.email,
        name: user.name,
        address: user.address,
        isAdmin: user.isAdmin,
        token: token
    };
}


export default router;