var mongoose = require('mongoose');

class database {
    constructor() {
        this._connect()
    }
    async _connect() {
        try {
            await mongoose.connect(`mongodb://127.0.0.1:27017/StudentDB`)
            console.log(`database connection successfull`)
        } catch (error) {
            console.error('Database connection error: ' + error);
        }
    }
}

module.exports = new database()