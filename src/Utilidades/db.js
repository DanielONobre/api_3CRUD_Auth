const mongoose = require('mongoose')
const mongodbUrl = 'mongodb+srv://daniel:kTWYSStcuctItWs3@apicluster.hgu9qbq.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(mongodbUrl, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    user: 'daniel',
    pass: 'kTWYSStcuctItWs3'
})

const db = mongoose.connection

db.on('error', (err) => console.error(`Error: ${err}`))
db.on('connected', (err, res) => console.log('Connected to database'))