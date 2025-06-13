// User utility functions
const crypto = require('crypto');

// Generate salt
function generateSalt() {
    return crypto.randomBytes(16).toString('hex');
}

// Hash password with salt
function hashPassword(password, salt) {
    return crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
}

// Validate user credentials
function validateUser(user, password) {
    if (!user || !user.password || !user.salt) {
        return false;
    }
    const hashedPassword = hashPassword(password, user.salt);
    return user.password === hashedPassword;
}

// Generate API key
function generateApiKey() {
    return crypto.randomBytes(32).toString('hex');
}

// Validate API key
function validateApiKey(user, apiKey) {
    return user && user.apiKey === apiKey;
}

export {
    generateSalt,
    hashPassword,
    validateUser,
    generateApiKey,
    validateApiKey
};
