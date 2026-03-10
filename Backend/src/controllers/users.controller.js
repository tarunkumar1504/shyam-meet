import { User } from "../models/users.model.js";
import httpStatus from  'http-status'
import bcrypt , {hash} from  'bcrypt'
import crypto from 'crypto'

import  Meeting  from "../models/meeting.model.js";
const login = async (req,res)=>{
    const {username, password} = req.body;
    if(!username || !password){
        return res.status(404).json({message: "Please Provide useranme or password"})
    }
    try {
        const user = await User.findOne({username});
        if(!user){
            return res.status(httpStatus.NOT_FOUND).json({message:"USer Not FOund"}); 
        }
        if(await bcrypt.compare(password,user.password)){
            let token = crypto.randomBytes(20).toString("hex");
            user.token  = token;
            await user.save();
            return res.status(httpStatus.OK).json({token:token});

        }else{
            return res.status(httpStatus.UNAUTHORIZED).json({message:"Invalid password or username"})
        }
    } catch (error) {
        return res.status(500).json({message: `Something went wrong ${error}`})
    }
}

const register = async (req, res)=>{
    const {name , username , password} = req.body;
    try{
        const existingUser = await User.findOne({username});
        if(existingUser){
            return res.status(httpStatus.FOUND).json({message:"User already exists"})
        }
        const hashedpassword = await bcrypt.hash(password,10)

        const newUser = new User({
            name: name,
            username:username,
            password:hashedpassword
        })
        await newUser.save();
        res.status(httpStatus.CREATED).json({message: "User Registed"})
    }catch(e){
        res.json({message : `Something went wrong ${e}`})
    }
}

const getUserHistory = async (req, res)=>{
    const {token} = req.query;
    try{
        const user = await User.findOne({token:token})
        const meetings = await Meeting.find({user_id: user.username})
        res.json(meetings)
    }catch(e){
        res.json({message:`Something went wrong ${e}`})
    }
}
const addtoHistory = async (req,res)=>{
    const {token ,  meeting_code} = req.body;
    try {
        const user = await User.findOne({token: token})

        const newMeeting = new Meeting({
            user_id:user.username,
            meetingCode: meeting_code
        })

        await newMeeting.save();
         console.log("Saved meeting:", newMeeting);
         
        res.status(httpStatus.CREATED).json({message:"Added code to Histroy"})
    } catch (error) {
        res.json({message:`Something went Worng ${error}`})
    }
}

export {login, register, getUserHistory, addtoHistory}