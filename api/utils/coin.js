import User from "../models/User.js";
import dotenv from "dotenv";


function checkcoin(usercoins, requiredcoins){
    return ( (usercoins >= requiredcoins)? true:false);
}

export const validationcreation = async (req, res, next) => {
    
    try {
        var user = await User.findById(req.body.ownerid)
        res.usercoin = user.coin
        res.userid = req.body.ownerid
        if(checkcoin(user.coin, process.env.CREATION)) {next()}
        else{
            res.status(201).json({
                message: 'Operation is not valided: please load some coins to your account!',
                success: 0
            });
        }
    } catch (err) {
        next(err);
    }
};
export const validationlocation = async (req, res, next) => {
    try {
        var user = await User.findById(req.body.clientid)
        res.usercoin = user.coin
        res.userid = req.body.clientid
        if(checkcoin(user.coin, process.env.LOCATION)) {next()}
        else{
            res.status(201).json({
                message: 'Operation is not valid: please load some coins to your account!',
                success: 0
            });
        }
    } catch (err) {
        next(err);
    }
};

