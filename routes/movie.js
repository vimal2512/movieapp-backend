import express from "express"
import { getMovieById, deleteMovie, getMovie, addMovie, updateMovieById } from '../helper.js'
import {auth} from "../middleware/auth.js"

const router=express.Router()

router.get("/:id",auth,async(req,res)=>{
    const{id}=req.params
    const movie=await getMovieById(id)
    movie?res.send(movie):res.status(404).send({message:"no movie found"})
})

router.delete("/:id",async(req,res)=>{
    const{id}=req.params
    const movie=await deleteMovie(id)
    movie?res.send(movie):res.status(404).send({message:"no movie found"})
})



router.get("/",auth,async(req,res)=>{
    const{language,rating}=req.query
   
    if(req.query.rating){
        req.query.rating=+req.query.rating
    }

    const movie=await getMovie(req)
    movie?res.send(movie):res.status(404).send({message:"no movie found"})


})

router.post("/",async(req,res)=>{
    const newMovie = req.body
    console.log(newMovie)
    const result =await addMovie(newMovie)
    res.send(result)
    
})

router.put("/",async(req,res)=>{
    const{id}=req.params
    const updateMovie=req.body
    console.log(updateMovie)
    const result = await updateMovieById(id, updateMovie)
    res.send(result)
})


export const movieRouter=router