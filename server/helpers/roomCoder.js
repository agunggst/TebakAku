const faker = require('faker')

module.exports = (n) => {
    let code = ''
    for (let i = 0; i < n; i++) {
        code += faker.random.alphaNumeric()
    }
    return code
}