const express = require('express')
const router = express.Router()
const Joblist = require('../models/jobs')

// Getting all
router.get('/', async (req, res)=>{
    try {
        const jobs = await Joblist.find()
        res.render('jobs',{jobs: jobs})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


//Creating one
router.post('/', async (req, res)=>{
    const jobs = new Joblist({
        company: req.body.company,
        companyInformation: req.body.companyInformation,
        jobInformation: req.body.jobInformation,
        rolesAndResponsibilities: req.body.rolesAndResponsibilities,
        eligibilityCriteria: req.body.eligibilityCriteria,
        selectionProcess: req.body.selectionProcess,
        lastDateToApply: req.body.lastDateToApply
    })
    try {
        const newJobs = await jobs.save()
        res.status(201).json(newJobs)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})


//Getting one
router.get('/:id',getJobs, (req, res)=>{
    res.json(res.job)
})


//Updating one
router.patch('/:id',getJobs, async (req, res)=>{
    if(req.body.company!= null){
        res.job.name = req.body.company
    }
    if(req.body.companyInformation != null){
        res.job.companyInformation = req.body.companyInformation
    }
    if(req.body.jobInformation != null){
        res.job.jobInformation = req.body.jobInformation
    }
    if(req.body.rolesAndResponsibilities != null){
        res.job.rolesAndResponsibilities = req.body.rolesAndResponsibilities
    }
    if(req.body.eligibilityCriteria != null){
        res.job.eligibilityCriteria = req.body.eligibilityCriteria
    }
    if(req.body.selectionProcess != null){
        res.job.selectionProcess = req.body.selectionProcess
    }
    if(req.body.lastDateToApply != null){
        res.job.lastDateToApply = req.body.lastDateToApply
    }
    try {
        const updatedJobs = await res.job.save()
        res.json(updatedJobs)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Deleting one
router.delete('/:id',getJobs, async (req, res)=>{
    try {
        await res.job.remove()
        res.json({ message: 'job deleted' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


async function getJobs(req, res, next) {
    let job
    try {
        job = await Joblist.findById(req.params.id)
        if(job == null){
            return res.status(404).json({ message: 'can not find job' })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

    res.job = job
    next()
}

module.exports = router