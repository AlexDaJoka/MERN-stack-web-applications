const express = require('express')
const router = express.Router()
const eventsControllers = require('../controllers/eventsControllers')

router.get("/", eventsControllers.getEvents)
router.get('/:id', eventsControllers.currentEvent)
router.get('/yourEvents/:id', eventsControllers.yourEvents)
//router.get('/filter/filter', eventsControllers.eventFilter)
router.post("/createEvent", eventsControllers.createEvent)
router.patch("/:id" ,eventsControllers.updateEvents)
router.delete("/:id", eventsControllers.deleteEvent)


module.exports = router;