const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');

async function main() {
    console.log('Seeding database...');

    // 1. Admin User
    const hashedPassword = await bcrypt.hash('admin123', 10); // Default password
    await prisma.admin.upsert({
        where: { username: 'admin' },
        update: {},
        create: {
            username: 'admin',
            password: hashedPassword,
        },
    });
    console.log('Admin created');

    // 2. Profile
    await prisma.profile.create({
        data: {
            name: 'Gul Ahmad Faizi',
            title: 'Full Stack Developer',
            summary: 'A full stack developer with 9+ years of experience using CSS, HTML, JavaScript, React, Redux, MySQL, Node, SQL Server, and Express. Developed sophisticated applications such as the Vision Rewards System for BASF, delivering real-time tracking of customer rewards, payments, and transactions.',
            location: 'Ottawa, ON, Canada',
            email: 'gulahmadfaizi1987@gmail.com',
            linkedin: 'https://www.linkedin.com/in/gul-ahmad-faizi/',
        },
    });
    console.log('Profile created');

    // 3. Skills
    const skills = [
        { name: 'React', category: 'Frontend', proficiency: 90 },
        { name: 'Redux', category: 'Frontend', proficiency: 85 },
        { name: 'JavaScript', category: 'Frontend', proficiency: 90 },
        { name: 'Node.js', category: 'Backend', proficiency: 85 },
        { name: 'Express.js', category: 'Backend', proficiency: 85 },
        { name: 'HTML', category: 'Frontend', proficiency: 95 },
        { name: 'CSS', category: 'Frontend', proficiency: 90 },
        { name: 'Bootstrap', category: 'Frontend', proficiency: 90 },
        { name: 'SQL Server', category: 'Database', proficiency: 80 },
        { name: 'MySQL', category: 'Database', proficiency: 80 },
        { name: 'Git', category: 'Tools', proficiency: 85 },
        { name: 'GitHub', category: 'Tools', proficiency: 85 },
    ];

    for (const skill of skills) {
        await prisma.skill.create({ data: skill });
    }
    console.log('Skills created');

    // 4. Experience
    const experiences = [
        {
            company: 'Kenna Communication LP',
            role: 'Application Programmer (Full Stack Developer)',
            location: 'Mississauga, ON, Canada',
            startDate: new Date('2023-05-01'),
            endDate: new Date('2025-09-01'),
            summary: 'Served as a full-stack developer on the Vision Rewards USA project.',
            details: [
                'Built a robust rewards management platform using React.js, Node.js, and SQL Server.',
                'Designed and maintained features for tracking customer rewards, processing payments, and managing financial transactions.',
                'Enabled clients to monitor activity in real-time dashboards.',
                'Improved customer engagement and streamlined rewards operations.',
                'Saved significant time and enhanced transparency for enterprise clients.',
            ],
        },
        {
            company: 'MRRD/RPCO',
            role: 'Full Stack Developer',
            location: 'Afghanistan',
            startDate: new Date('2021-01-01'),
            endDate: new Date('2021-08-01'),
            summary: 'Architected and implemented RPCO software using React.js, Node.js, and SQL Server.',
            details: [
                'Centralized project management into a single dashboard.',
                'Enabled seamless oversight of projects, workflows, and resources.',
                'Resulted in 100+ hours saved per month and thousands of dollars in cost reductions.',
                'Provided clear, actionable insights into project status, improving decision-making.',
            ],
        },
        {
            company: 'Barikab Durani Construction Company (BDCC)',
            role: 'Software Engineer',
            location: 'Kabul, Afghanistan',
            startDate: new Date('2019-06-01'),
            endDate: new Date('2020-12-01'),
            summary: 'Created BDMIS, a comprehensive system for financial, HR, and admin tasks.',
            details: [
                'Built using HTML, CSS, Bootstrap, React.js, Node.js, Express.js, SQL Server.',
                'Introduced automation that increased workflow speed by 50%.',
                'Improved accuracy and transparency.',
                'Enhanced daily operational efficiency.',
            ],
        },
        {
            company: 'TETRA TECH JSSP',
            role: 'Software Developer',
            location: 'Kabul, Afghanistan',
            startDate: new Date('2017-11-01'),
            endDate: new Date('2019-04-01'),
            summary: 'Engineered a Case Management System (CMS) for Afghanistan’s judiciary.',
            details: [
                'Tracked civil cases and managed documents from initiation to resolution.',
                'Ensured secure and efficient handling of sensitive judicial data.',
                'Supported high-volume court operations with improved performance and reliability.',
            ],
        },
        {
            company: 'JSSP U.S. State/INL',
            role: 'Database Specialist and Programmer',
            location: 'Kabul, Afghanistan',
            startDate: new Date('2015-04-01'),
            endDate: new Date('2017-11-01'),
            summary: 'Developed a criminal-focused Case Management System (CMS).',
            details: [
                'Facilitated end-to-end tracking of criminal cases and related documents.',
                'Improved case resolution times, data integrity, and system reliability.',
            ],
        },
    ];

    for (const exp of experiences) {
        const { details, ...expData } = exp;
        const createdExp = await prisma.experience.create({ data: expData });

        for (const desc of details) {
            await prisma.experienceDetail.create({
                data: {
                    description: desc,
                    experienceId: createdExp.id,
                },
            });
        }
    }
    console.log('Experience created');

    // 5. Education
    const education = [
        {
            institution: 'Peshawar Agriculture University',
            degree: 'Bachelor of Computer Science',
            location: 'Peshawar, Pakistan',
            startDate: null, // Year only provided
            endDate: new Date('2013-01-01'), // Assume completion date
        },
        {
            institution: 'Comdex Institute',
            degree: 'Web Development (HTML, CSS, JavaScript, JQuery)',
            location: 'Peshawar, Pakistan',
            startDate: null,
            endDate: new Date('2011-01-01'),
        },
        {
            institution: 'EraSoft Institute',
            degree: 'Oracle 10g Developer',
            location: 'Peshawar, Pakistan',
            startDate: null,
            endDate: new Date('2012-01-01'),
        },
    ];

    for (const edu of education) {
        await prisma.education.create({ data: edu });
    }
    console.log('Education created');

    // 6. Projects
    const projects = [
        {
            title: 'Vision Rewards System',
            description: 'A robust rewards management platform for BASF. It tracks customer rewards, processes payments, and manages financial transactions in real-time.',
            technologies: 'React, Node.js, SQL Server',
            link: 'https://example.com/vision-rewards',
            repoLink: 'https://github.com/gulfaizi/vision-rewards',
            imageUrl: 'https://via.placeholder.com/600x400'
        },
        {
            title: 'RPCO Dashboard',
            description: 'Centralized project management dashboard for MRRD/RPCO. Enabled seamless oversight of projects, workflows, and resources, saving 100+ hours per month.',
            technologies: 'React, Node.js, Express, SQL Server',
            link: 'https://example.com/rpco',
            repoLink: 'https://github.com/gulfaizi/rpco-dashboard',
            imageUrl: 'https://via.placeholder.com/600x400'
        },
        {
            title: 'BDMIS System',
            description: 'Comprehensive system for financial, HR, and administrative tasks for BDCC. Increased workflow speed by 50% through automation.',
            technologies: 'React, Node.js, Express, SQL Server',
            link: 'https://example.com/bdmis',
            repoLink: 'https://github.com/gulfaizi/bdmis',
            imageUrl: 'https://via.placeholder.com/600x400'
        },
        {
            title: 'Judiciary CMS',
            description: 'Case Management System for Afghanistan’s judiciary to track civil cases and manage documents securely.',
            technologies: 'React, Node.js, Express, SQL Server',
            link: 'https://example.com/cms',
            repoLink: 'https://github.com/gulfaizi/judiciary-cms',
            imageUrl: 'https://via.placeholder.com/600x400'
        }
    ];

    for (const project of projects) {
        await prisma.project.create({ data: project });
    }
    console.log('Projects created');

    console.log('Seeding finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
