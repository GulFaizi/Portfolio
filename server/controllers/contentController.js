const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Helper for dynamic model access
// Helper for dynamic model access
const getModel = (modelName) => {
    const modelMap = {
        'admin': prisma.admin,
        'profile': prisma.profile,
        'skill': prisma.skill,
        'experience': prisma.experience,
        'experiencedetail': prisma.experienceDetail,
        'education': prisma.education,
        'project': prisma.project,
        'contactmessage': prisma.contactMessage
    };
    return modelMap[modelName.toLowerCase()];
};

exports.getAll = async (req, res) => {
    const { model } = req.params;

    try {
        const data = await getModel(model).findMany();
        // Special handling for nested data if needed, e.g. Experience
        if (model === 'experience') {
            const exp = await prisma.experience.findMany({ include: { details: true }, orderBy: { startDate: 'desc' } });
            return res.json(exp);
        }
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getOne = async (req, res) => {
    const { model, id } = req.params;
    try {
        const data = await getModel(model).findUnique({ where: { id }, include: model === 'experience' ? { details: true } : undefined });
        if (!data) return res.status(404).json({ message: 'Not found' });
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.create = async (req, res) => {
    const { model } = req.params;
    const data = req.body;
    try {
        if (model === 'experience') {
            const { details, ...expData } = data;
            const newExp = await prisma.experience.create({ data: expData });
            if (details && Array.isArray(details)) {
                // Assuming details is array of strings
                for (const d of details) {
                    await prisma.experienceDetail.create({ data: { description: d, experienceId: newExp.id } });
                }
            }
            return res.json(await prisma.experience.findUnique({ where: { id: newExp.id }, include: { details: true } }));
        }
        const newItem = await getModel(model).create({ data });
        res.json(newItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.update = async (req, res) => {
    const { model, id } = req.params;
    const data = req.body;
    try {
        if (model === 'experience') {
            // handle relation updates potentially, complexity increases
            // simple update for now
            const updated = await prisma.experience.update({ where: { id }, data });
            return res.json(updated);
        }
        const updated = await getModel(model).update({ where: { id }, data });
        res.json(updated);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.delete = async (req, res) => {
    const { model, id } = req.params;
    try {
        await getModel(model).delete({ where: { id } });
        res.json({ message: 'Deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
