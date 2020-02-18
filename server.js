const express = require('express')


const PORT = process.env.PORT || 3000
const path = require('path')

// initialize the application and create the routes
const app = express()

const router = express.Router()


// other static resources should just be served as they are

function nocache(req, res, next) {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next();
}

router.use(nocache)

router.use(
  express.static(path.resolve(__dirname, 'build'))
)


router.get('*', (req, res) => res.sendFile(path.resolve(__dirname,  'build', 'index.html')));

app.use(router)

// start the app
app.listen(PORT, error => {
  if (error) {
    return console.log('something bad happened', error)
  }

  console.log('listening on ' + PORT + '...')
})
