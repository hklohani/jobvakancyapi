const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema({
    company: {
        type: String,
        required: true
    },
    companyInformation: {
        type: String,
        required: true
    },
    jobInformation : {
        type: String
    },
    rolesAndResponsibilities :{
        type: String,
        required: true,
    },
    eligibilityCriteria : {
        type: String,
    },
    selectionProcess : {
        type: String,
        required: true
    },
    lastDateToApply: {
        type: Date,
        default: Date.now()
    }

})

module.exports = mongoose.model('Joblist', jobSchema)