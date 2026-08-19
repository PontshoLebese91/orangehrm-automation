require('dotenv').config();

module.exports = {
    default: {
        require: [
            'src/hooks/**/*.ts',
            'test/steps/**/*.ts'
        ],

        requireModule: [
            'tsx/cjs'
        ],

        format: [
            'progress',
            'allure-cucumberjs/reporter'
        ],

        publishQuiet: true,

        timeout: 120000
    }
};