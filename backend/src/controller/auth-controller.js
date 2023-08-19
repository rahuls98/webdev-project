import * as usersDao from "../Dao/user-dao.js";
import Expert from "../models/Expert.js";


export const register = async (req, res) => {
    console.log(req.body)
    try {
        if (req.body.role === 'Expert') {
            const expert = await Expert.findExpertByUsername(req.body.email);
            if (expert) {
                res.status(403).json({
                    "message": "Expert already exists"
                });
                return;
            }
            const newExpert = await Expert.createExpert(req.body);
            newExpert.role = "Expert";
            req.session["currentUser"] = newExpert;
            res.json(newExpert);
        }

        if (req.body.role === "User" || req.body.role === "Admin") {
            const user = await usersDao.findUserByUsername(req.body.email);
            if (user) {
                res.status(403).json({
                    "message": "User already exists"
                });
                return;
            }
            const newUser = await usersDao.createUser(req.body);
            req.session["currentUser"] = newUser;
            res.json(newUser);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            message: "Found Duplicate Key retry with a different user ID"
        });
    }
};

export const login = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    if (email && password) {
        try {
            const user = await usersDao.findUserByCredentials(email, password);
            if (user) {
                req.session["currentUser"] = user;
                res.json(user);
            } else {
                const expert = await Expert.findExpertByCredentials(email, password);
                if (expert) {
                    expert.role = "Expert";
                    req.session["currentUser"] = expert;
                    res.json(expert);
                } else {
                    res.status(400).json({
                        status: 400,
                        message: "Incorrect Credentials,neither user nor admin nor expert !!!"
                    });
                }
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({
                status: 500,
                message: "Error fetching entry from Database"
            });
        }
    } else {
        res.status(400).json({
            status: 400,
            message: "Username and Password missing in the request body !!!"
        });
    }
};

export const logout = async (req, res) => {
    req.session.destroy();
    res.status(200).json({
        status: 200,
        message: "session closed for the user"
    });
};

export const update = (req, res) => {
    console.log(req.body);
    const currentUser = req.session["currentUser"];
    if (currentUser === undefined) {
        res.sendStatus(401);
    }
    let response = usersDao.updateUser(req.body._id, req.body);

    if (response.status === 'ok') {
        res.json(response.user)
    } else {
        res.sendStatus(500)
    }
};

export const verifyExpert = async (req, res) => {
    try {
        const updatedExpert = Expert.verifyExpert(req.body.id);
        res.status(200).json(updatedExpert);
    } catch (error) {
        console.log(error);
    }
}

export const getUnverifiedExperts = async (req, res) => {
    try {
        const unverifiedExperts = await Expert.findAllUnverifiedExperts();
        res.status(200).json(unverifiedExperts)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
}
