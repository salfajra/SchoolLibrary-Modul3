const express = require('express')
const app = express();

/** define port of server */
const PORT = 8000

/** load library cors */
const cors = require(`cors`)

/** open CORS policy */
app.use(cors())

/** define all routes */
const memberRoute = require('../school_library/routes/member.route')
const bookRoute = require('../school_library/routes/book.route')
const adminRoute = require('../school_library/routes/admin.route')

const md5 = require(`md5`) 
let password = md5(`password`)
/** result: 5f4dcc3b5aa765d61d8327deb882cf99 */


/** define prefix for each route */
app.use(`/book`, bookRoute)
app.use(`/member`, memberRoute)
app.use(`/admin`, adminRoute)

/** route to access uploaded file */ 
app.use(express.static(__dirname))

/** run server based on defined port */
app.listen(PORT, () => {
    console.log(`Server of School's Library runs on port
${PORT}`)
})

