module.exports = (error, request, response, next) => {
    console.error(error)
    if (error.name === 'CastError') {
      response.status(404).json({
        error: "id used is malformed"
      })
    } else {
      response.status(500).end()
    }
  }