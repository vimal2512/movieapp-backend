import { client } from './index.js';
import bcrypt from 'bcrypt'

export function updateMovieById(id, updateMovie) {
    return client.db("a6movie").collection("movies").updateOne({ id: id }, { $set: updateMovie });
}
export function addMovie(newMovie) {
    return client.db("a6movie").collection("movies").insertMany(newMovie);
}
export function deleteMovie(id) {
    return client.db("a6movie").collection("movies").deleteOne({ id: id });
}
export function getMovieById(id) {
    return client.db("a6movie").collection("movies").findOne({ id: id });
}
export function getMovie(req) {
    return client.db("a6movie").collection("movies").find(req.query).toArray();
}

export async function genPassword(password){
    const salt =await bcrypt.genSalt(10)  //bcrypt.genSalt(no.of.rounds)
    console.log(salt)
    const hashedPassword =await  bcrypt.hash(password,salt)
    console.log(hashedPassword)
    return hashedPassword
}

export async function createUser(username,hashedPassword){
    return await client.db("a6movie").collection("users").insertOne({username:username,password:hashedPassword})
}

export async function getUserByName(username){
  return await client.db("a6movie").collection("users").findOne({username:username})
}


