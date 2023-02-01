const bcrypt = require('bcryptjs')

const hashPassword = (pass) => bcrypt.hashSync(pass, 10)


const compareHash = (pass, hashedPass) => bcrypt.compareSync(pass, hashedPass)


module.exports = {
    hashPassword,
    compareHash
}