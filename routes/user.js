const express = require("express")
const router = new express.Router()
const User = require('../model/user')

router.post("/:id", async(req, res) => {
  const _id = req.body.userId
  try{
    const user = await User.find({_id})
    if(!user){
      res.status(404).send({
        error: `No user with id ${_id} found`
      })
    }
    await User.findOneAndUpdate({_id}, {isPaymentMade: true})
    await User.findOneAndUpdate({_id: user.refUser}, {$inc: { totalEarnings: 10 }})
    res.status(200)
  }catch(e){
    res.status(500).send(e)
  }
})

router.post("/add", async(req, res) => {
  console.log(req.body)
  try{
    const user = new User(req.body)
    await user.save()
    res.status(201).send(user)
  }catch(e){
    console.log(e)
    res.status(500).send(e)
  }
})

router.get("/:id", async(req, res) => {
  const _id = req.body.userId
  try{
    const user = await User.find({_id})
    if(!user){
      res.status(404).send({
        error: `No user with id ${_id} found`
      })
    }
    res.status(200).send(user)
  }catch(e){
    res.status(500).send(e)
  }
})

module.exports = router