const jwt = require('jsonwebtoken');
const fs = require('fs');

// Ein Token erstellen
function createToken() {
    const payload = { user: 'Max', role: 'admin' };
    const secret = 'Admin123'; // Nur für Demonstration, verwenden Sie in der Produktion einen sichereren Schlüssel!
    const options = { expiresIn: '1h' };
    
    const token = jwt.sign(payload, secret, options);
    
    console.log('Erstelltes Token:', token);
    return token;
}

// Ein Token überprüfen
function verifyToken(token) {
    const secret = 'shhhhh';

    try {
        const decoded = jwt.verify(token, secret);
        console.log('Überprüftes Token:', decoded);
    } catch (err) {
        console.error('Fehler beim Überprüfen des Tokens:', err.message);
    }
}

// Beispielaufrufe
const token = createToken();
verifyToken(token);
