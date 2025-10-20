const express = require('express')
const { quotes, getRandomQuote } = require('./quotes')

function createApp () {
  const app = express()

  app.use(express.json())

  app.get('/', (req, res) => {
    res.json({
      status: 'ok',
      message: 'Welcome to the Random Quotes API',
      endpoints: {
        random: '/quotes/random',
        all: '/quotes',
        byId: '/quotes/:id'
      }
    })
  })

  app.get('/quotes', (req, res) => {
    res.json({
      count: quotes.length,
      data: quotes
    })
  })

  app.get('/quotes/random', (req, res) => {
    res.json(getRandomQuote())
  })

  app.get('/quotes/:id', (req, res) => {
    const id = Number(req.params.id)
    const quote = quotes.find(entry => entry.id === id)

    if (!quote) {
      return res.status(404).json({
        error: `Quote with id ${id} not found`
      })
    }

    return res.json(quote)
  })

  return app
}

module.exports = { createApp }