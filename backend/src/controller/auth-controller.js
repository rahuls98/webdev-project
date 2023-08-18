import * as usersDao from "../Dao/user-dao.js";
export const register = async (req, res) => {
    try{
        const user = await usersDao.findUserByUsername(req.body.username);
        if (user) {
            res.sendStatus(403);
            return;
        }
        const newUser = await usersDao.createUser(req.body);
        req.session["currentUser"] = newUser;
        res.json(newUser);
    }catch (error){
        console.log(error);
        res.status(500).json({
            status : 500,
            message : "Found Duplicate Key retry with a different user ID"
        });
    }
};

export const login = async (req, res) => {
    console.log(req.body)
    const email = req.body.email;
    const password = req.body.password;
    if (email && password) {
        try{
            const user = await usersDao.findUserByCredentials(email, password);
            if (user) {
                req.session["currentUser"] = user;
                res.json(user);
            } else {
                res.status(400).json({
                    status : 400,
                    message : "Incorrect Credentials !!!"
                });
            }
        }catch (error){
            console.log(error);
            res.status(500).json({
                status : 500,
                message : "Error fetching entry from Database"
            });
        }
    } else {
        res.status(400).json({
            status : 400,
            message : "Username and Password missing in the request body !!!"
        });
    }
};

export const logout = async (req, res) => {
    req.session.destroy();
    res.status(200).json({
        status : 200,
        message : "session closed for the user"
    });
};

export const update = (req, res) => {
    console.log(req.body);
    const currentUser = req.session["currentUser"];
    if (currentUser === undefined) {
        res.sendStatus(401);
    }
    let response = usersDao.updateUser(req.body._id , req.body);

    if (response.status === 'ok') {
        res.json(response.user)
    } else {
        res.sendStatus(500)
    }
};
