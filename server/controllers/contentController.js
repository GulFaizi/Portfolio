const db = require('../utils/jsonDb');


const getCollectionName = (modelName) => {
    const map = {
        'admin': 'admin',
        'profile': 'profile',
        'skill': 'skill',
        'experience': 'experience',
        'experiencedetail': 'experienceDetail',
        'education': 'education',
        'project': 'project',
        'contactmessage': 'contactMessage'
    };
    return map[modelName.toLowerCase()];
};

exports.getAll = async (req, res) => {
    const { model } = req.params;
    const collection = getCollectionName(model);

    if (!collection) return res.status(400).json({ message: 'Invalid model' });

    try {
        const data = db.getAll(collection);

        // Special handling for nested data if needed, e.g. Experience
        if (collection === 'experience') {
            // Manually join details
            const details = db.getAll('experienceDetail');
            const dataWithDetails = data.map(exp => ({
                ...exp,
                details: details.filter(d => d.experienceId === exp.id)
            })).sort((a, b) => new Date(b.startDate) - new Date(a.startDate));

            return res.json(dataWithDetails);
        }
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getOne = async (req, res) => {
    const { model, id } = req.params;
    const collection = getCollectionName(model);

    if (!collection) return res.status(400).json({ message: 'Invalid model' });

    try {
        const item = db.getOne(collection, id);
        if (!item) return res.status(404).json({ message: 'Not found' });

        if (collection === 'experience') {
            const details = db.getAll('experienceDetail');
            item.details = details.filter(d => d.experienceId === item.id);
        }

        res.json(item);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.create = async (req, res) => {
    const { model } = req.params;
    const collection = getCollectionName(model);
    const data = req.body;

    if (!collection) return res.status(400).json({ message: 'Invalid model' });

    try {
        if (collection === 'experience') {
            const { details, ...expData } = data;
            const newExp = db.create('experience', expData);

            if (details && Array.isArray(details)) {
                for (const d of details) {
                    db.create('experienceDetail', { description: d, experienceId: newExp.id });
                }
            }

            // Return with details
            const allDetails = db.getAll('experienceDetail');
            newExp.details = allDetails.filter(d => d.experienceId === newExp.id);
            return res.json(newExp);
        }

        const newItem = db.create(collection, data);
        res.json(newItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.update = async (req, res) => {
    const { model, id } = req.params;
    const collection = getCollectionName(model);
    const data = req.body;

    if (!collection) return res.status(400).json({ message: 'Invalid model' });

    try {
        if (collection === 'experience') {
            // For simplicity in JSON DB, we might just update the main experience fields
            // Handling nested detail updates completely is complex (syncing list), 
            // but user request implies basic existing functionality.
            // If details are passed, we might need to wipe and recreate or intelligent merge.
            // For now, let's update basic fields.
            const updated = db.update('experience', id, data);
            return res.json(updated);
        }

        const updated = db.update(collection, id, data);
        if (!updated) return res.status(404).json({ message: 'Not found' });
        res.json(updated);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.delete = async (req, res) => {
    const { model, id } = req.params;
    const collection = getCollectionName(model);

    if (!collection) return res.status(400).json({ message: 'Invalid model' });

    try {
        const deleted = db.delete(collection, id);
        if (deleted) {
            if (collection === 'experience') {
                // Cascade delete details
                const details = db.getAll('experienceDetail');
                details.filter(d => d.experienceId === id).forEach(d => db.delete('experienceDetail', d.id));
            }
            res.json({ message: 'Deleted successfully' });
        } else {
            res.status(404).json({ message: 'Not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
