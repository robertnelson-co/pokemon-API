const router = require('express').Router()
const { databaseSeed } = require('../services/pokemon.service')

router.get('/data/seed', async (req, res) => {
    try {
        await databaseSeed()
        res.json({ message: 'complete '})
    } catch (error) {
        console.log('error:', error)
        res.status(500).json({ message: 'error saving pokemon'})
    }
})


module.exports = router
