const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '../data.json');

// Ensure DB exists
if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify({
        admin: [],
        profile: [],
        skill: [],
        experience: [],
        education: [],
        project: [],
        contactMessage: [],
        experienceDetail: []
    }, null, 2));
}

const readDb = () => {
    try {
        const data = fs.readFileSync(DB_PATH, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading DB:', error);
        return {};
    }
};

const writeDb = (data) => {
    try {
        fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Error writing DB:', error);
    }
};

const generateId = () => {
    return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
};

// Generic CRUD helpers
const db = {
    getAll: (collection) => {
        const data = readDb();
        return data[collection] || [];
    },
    getOne: (collection, id) => {
        const data = readDb();
        const list = data[collection] || [];
        return list.find(item => item.id === id);
    },
    find: (collection, predicate) => {
        const data = readDb();
        const list = data[collection] || [];
        return list.find(predicate);
    },
    create: (collection, item) => {
        const data = readDb();
        if (!data[collection]) data[collection] = [];

        const newItem = { id: generateId(), ...item };
        // Handle timestamps
        if (['profile', 'experience', 'project', 'contactMessage'].includes(collection)) {
            newItem.createdAt = new Date().toISOString();
        }
        if (['profile', 'experience', 'project'].includes(collection)) {
            newItem.updatedAt = new Date().toISOString();
        }

        data[collection].push(newItem);
        writeDb(data);
        return newItem;
    },
    update: (collection, id, updates) => {
        const data = readDb();
        if (!data[collection]) return null;

        const index = data[collection].findIndex(item => item.id === id);
        if (index === -1) return null;

        const updatedItem = { ...data[collection][index], ...updates };
        if (['profile', 'experience', 'project'].includes(collection)) {
            updatedItem.updatedAt = new Date().toISOString();
        }

        data[collection][index] = updatedItem;
        writeDb(data);
        return updatedItem;
    },
    delete: (collection, id) => {
        const data = readDb();
        if (!data[collection]) return false;

        const initialLength = data[collection].length;
        data[collection] = data[collection].filter(item => item.id !== id);

        if (data[collection].length !== initialLength) {
            writeDb(data);
            return true;
        }
        return false;
    }
};

module.exports = db;
