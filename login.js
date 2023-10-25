// Einbindung von bcrypt
const bcrypt = require('bcrypt');

// Konstanten
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

// Asynchrone Funktionen
async function hashAndStorePasswordAsync(password) {
    try {
        const hash = await bcrypt.hash(password, saltRounds);
        console.log("Asynchronous Hash:", hash);
        return hash;
    } catch (err) {
        console.error("Error hashing password:", err);
    }
}

async function comparePasswordsAsync(plaintextPassword, hash) {
    try {
        const match = await bcrypt.compare(plaintextPassword, hash);
        console.log("Passwords Match:", match);
        return match;
    } catch (err) {
        console.error("Error comparing passwords:", err);
    }
}

// Synchronisierte Funktionen
function hashAndStorePasswordSync(password) {
    const hash = bcrypt.hashSync(password, saltRounds);
    console.log("Synchronous Hash:", hash);
    return hash;
}

function comparePasswordsSync(plaintextPassword, hash) {
    const match = bcrypt.compareSync(plaintextPassword, hash);
    console.log("Passwords Match (Sync):", match);
    return match;
}

// Test
(async () => {
    const asyncHash = await hashAndStorePasswordAsync(myPlaintextPassword);
    await comparePasswordsAsync(myPlaintextPassword, asyncHash);
    await comparePasswordsAsync(someOtherPlaintextPassword, asyncHash);

    const syncHash = hashAndStorePasswordSync(myPlaintextPassword);
    comparePasswordsSync(myPlaintextPassword, syncHash);
    comparePasswordsSync(someOtherPlaintextPassword, syncHash);
})();
