
const dotenv = require('dotenv');


dotenv.config();

// Ensure that required environment variables are present
const requiredVariables = ['DB_NAME', 'DB_USER', 'DB_PASSWORD', 'DB_HOST'];
const missingVariables = requiredVariables.filter(variable => !process.env[variable]);

if (missingVariables.length > 0) {
    console.error(`Missing required environment variables: ${missingVariables.join(', ')}`);
    process.exit(1);
}

module.exports = dotenv;