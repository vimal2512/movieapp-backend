import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { genPassword,createUser,getUserByName } from '../helper.js'

const router=express.Router()


router.post("/signup",async(req,res)=>{
    const {username,password} = req.body
    console.log(username,password)
   
    const isUserExist=await getUserByName(username)
    console.log(isUserExist)
    //  username already exist
     if(isUserExist){
        res.status(400).send({message:"username already taken"})
        return
     }
     if(!/^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/g.test(
        password
     )){
        res.status(404).send({message:"password pattern does not match"})
     }
    const hashedPassword =await genPassword(password)
    const result =await createUser(username,hashedPassword)
    res.send(result)
    
})


router.post("/login",async(req,res)=>{
    const {username,password} = req.body
    console.log(username,password)
   
    const userFromDb=await getUserByName(username)
    console.log(userFromDb)
    //  username already exist
     if(!userFromDb){
        res.status(400).send({message:"Invalid credentials"})
        return
     }
    const storedDbPassword = userFromDb.password
    const isPasswordMatch =await bcrypt.compare(password,storedDbPassword)
    if(!isPasswordMatch){
      res.status(400).send({message:"Invalid credentials"})
      return
    }
    const token = jwt.sign({id:userFromDb._id},process.env.SECRET_KEY)
    res.send({message:"Successful login",token:token} )
    
})

export const userRouter=router


//validate if already present
//validate if password matches
//store the user details-users collection-username and hashedPassword