const Events = require('../modules/Events');
const User = require('../modules/User');
const asyncHandler = require('express-async-handler');

require('dotenv').config()

const getEvents = asyncHandler(async (req, res) =>{

    const events = await Events.find().lean()

    if(!events?.length){
        return res.status(400).json({message:"События не найдены"})
    }

    res.json(events)

})


const currentEvent = asyncHandler(async (req, res) => {

const id = req.params.id


if(!id){
    return res.status(400).json({message: "Событие не найдено"})
}

const event = await Events.findById(id).lean().exec()


if(!event){
    return res.status(400).json({message:"Событие не найдено"})
}


res.json(event)

})


const yourEvents = asyncHandler(async (req, res) => {

    const id = req.params.id

    if(!id){
        return res.status(400).json({message: "Пользователь не найден"})
    }

    const event = await Events.find({eventAuthor: id}).lean().exec()



    if(!event){
        return res.status(400).json({message:"Событие не найдено"})
    }


    res.json(event)

})


const createEvent = asyncHandler(async (req, res) => {

    const {eventName, eventTime, eventTipe, eventAgeGroup, eventFreeOrPay, eventPlace, eventDescription, eventAuthor, eventAuthorPhone, eventAuthorEmail} = req.body


    if(!eventName || !eventTime || !eventTipe || !eventAgeGroup || !eventFreeOrPay || !eventPlace || !eventDescription || !eventAuthor || !eventAuthorPhone || !eventAuthorEmail){
        return res.status(400).json({message: "Все данные должны быть заполнены"})
    }






    const author = await User.findById(eventAuthor).lean().exec()

    const email = await User.findOne({email: eventAuthorEmail}).lean().exec()


    if(!author || email === null){
        return res.status(400).json({message: "пользователь не существует"})
    }





    const event = {eventName, eventTime, eventTipe, eventAgeGroup, eventFreeOrPay, eventPlace, eventDescription, eventAuthor, eventAuthorPhone, eventAuthorEmail};

    const newEvent = await Events.create(event);

    if(newEvent){
        //return res.status(201).json({message:`Событие ${newEvent.eventName} было успешно создано`})
        return res.json(newEvent)
    }else{
        return res.status(400).json({message:"При создании события что-то пошло не так"})
    }

})


const updateEvents = asyncHandler(async (req, res) => {

    const id = req.params.id

    const {eventName, eventTime, eventTipe, eventAgeGroup, eventFreeOrPay, eventPlace, eventDescription, eventAuthor, eventAuthorPhone, eventAuthorEmail} = req.body


    const event = await Events.findById(id).exec()

    if(!event){
        return res.status(400).json({message: "Событие не найдено"})
    }

    const author = await User.findById(eventAuthor).lean().exec()

    const email = await User.findOne({email: eventAuthorEmail}).lean().exec()


    if(!author || email === null){
        return res.status(400).json({message: "пользователь не существует"})
    }

    event.eventName = eventName
    event.eventTime = eventTime
    event.eventTipe = eventTipe
    event.eventAgeGroup = eventAgeGroup
    event.eventFreeOrPay = eventFreeOrPay
    event.eventPlace = eventPlace
    event.eventDescription = eventDescription
    event.eventAuthor = eventAuthor
    event.eventAuthorPhone = eventAuthorPhone
    event.eventAuthorEmail = eventAuthorEmail

    const updatedEvent = await event.save()

    res.json({message: `Событие  ${updatedEvent.eventName} было обновлено`})

})


const deleteEvent = asyncHandler(async (req, res) => {

    const id = req.params.id

    if(!id){
        return res.status(400).json({message:"Событие не найдено"})
    }

    const event = await Events.findById(id).exec()

    const result = await event.deleteOne()

    res.json({message: `Событие ${result.eventName} было удалено`})
})















//const eventFilter = asyncHandler(async (req, res) => {

//    const {eventName, eventTipe, eventAgeGroup, eventFreeOrPay, eventPlace, eventDescription, eventAuthor, eventAuthorPhone, eventAuthorEmail} = req.body

//    const EN = await Events.find({eventName})
//    const ET = await Events.find({eventTipe})

//   if(!EN || !ET){
//      return res.status(400).json("Событие не найдено")
//   }

//  res.json(EN || ET)

//})


module.exports = {getEvents, currentEvent, createEvent, yourEvents, updateEvents, deleteEvent}