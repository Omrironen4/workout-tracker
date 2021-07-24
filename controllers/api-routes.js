const express = require('express');
const router = express.Router();
const db = require('../models');

//Get all workouts 
router.get('/workouts', async (req, res) => {
    try {
        const allWorkouts = await db.Workout.find({});
        console.log(allWorkouts)
        res.json(allWorkouts);
        
    } catch (error) {
        res.json(error)
    }
});

//Get workouts in range
router.get('/workouts/range', async (req, res) => {
    try {
        const allWorkouts = await db.Workout.find({}, null,  {sort: {day: "desc"}}).limit(7);
console.log(allWorkouts)
        res.json(allWorkouts)
        // this will return the last seven workouts.
    }
    catch (error) {
        res.json(error);
    }
});

//Create a workout 
router.post('/workouts', async ({body}, res) => {
    try {
        const newWorkouts = await db.Workout.create(body);
        console.log(newWorkouts);
        res.json(newWorkouts);

    } catch (error) {
        res.json(error);
    }
});

//Edit exercie 
router.put('/workouts/:id', async ( req, res) => {
    try {
        await db.Workout.findByIdAndUpdate(req.params.id, {
            $push: {
                exercises: req.body
            }
        })
        res.json("ok")
    } catch (error) {
        res.json(error);
    }
})

module.exports = router;

