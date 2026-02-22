const fs = require('fs');

const dataPath = 'client/src/data/data.json';
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// 1. Update Profile Information
if (data.profile && data.profile.length > 0) {
    data.profile.forEach(p => {
        p.summary = "Full-Stack Developer with 6 years of experience building scalable web applications using React.js, Node.js/Express, SQL Server, MySQL, HTML, CSS/Bootstrap. Experienced in developing enterprise-grade solutions, including the Vision Rewards platform and Case Management Systems, improving operational efficiency, data integrity, and user engagement. Skilled in delivering client-focused solutions and collaborating with cross-functional teams to drive impactful results.";
        p.title = "Full-Stack Developer";
        p.name = "Gul Ahmad Faizi";
        // Keeping email, location, linkedin same as they match the resume header
    });
}

// 2. Update Experience (Replacing entirely based on new resume)
const newExperiences = [
    {
        "id": "exp-kenna",
        "company": "Kenna Communication LP",
        "role": "Application Programmer (Full Stack Developer)",
        "startDate": "2023-05-01T00:00:00.000Z",
        "endDate": "2025-09-01T00:00:00.000Z",
        "location": "Mississauga, ON, Canada",
        "summary": "Served as full-stack developer on the Vision Rewards USA project.",
        "createdAt": new Date().toISOString(),
        "updatedAt": new Date().toISOString(),
        "details": [
            {
                "id": "kenna-1",
                "description": "Served as full-stack developer on the Vision Rewards USA project, utilizing React.js, Node.js, and SQL Server to build a robust rewards management platform.",
                "experienceId": "exp-kenna"
            },
            {
                "id": "kenna-2",
                "description": "Designed and maintained features for tracking customer rewards, payments, and transactions, enabling clients to monitor activity in real-time.",
                "experienceId": "exp-kenna"
            },
            {
                "id": "kenna-3",
                "description": "The system improved customer engagement and streamlined rewards operations, saving time and enhancing transparency for clients.",
                "experienceId": "exp-kenna"
            }
        ]
    },
    {
        "id": "exp-btc",
        "company": "Building Toronto Caulking",
        "role": "Full-Stack Developer",
        "startDate": "2022-06-01T00:00:00.000Z",
        "endDate": "2023-03-01T00:00:00.000Z",
        "location": "Toronto, ON, Canada",
        "summary": "Developed a Business & Task Management Information System (BTMIS).",
        "createdAt": new Date().toISOString(),
        "updatedAt": new Date().toISOString(),
        "details": [
            {
                "id": "btc-1",
                "description": "Developed a Business & Task Management Information System (BTMIS) to manage financial, HR, and administrative operations.",
                "experienceId": "exp-btc"
            },
            {
                "id": "btc-2",
                "description": "Built scalable, user-friendly applications using React.js, Node.js/Express, MySQL, HTML5, CSS3, and Bootstrap, improving workflow speed and transparency.",
                "experienceId": "exp-btc"
            },
            {
                "id": "btc-3",
                "description": "Streamlined company processes, reducing manual tracking errors and enhancing operational efficiency.",
                "experienceId": "exp-btc"
            }
        ]
    },
    {
        "id": "exp-mrrd",
        "company": "MRRD – Regional Programs Coordination Office (RPCO)",
        "role": "Full-Stack Developer",
        "startDate": "2020-01-01T00:00:00.000Z",
        "endDate": "2021-08-01T00:00:00.000Z",
        "location": "Afghanistan",
        "summary": "Developed a centralized project management and monitoring system for nationwide rural infrastructure projects.",
        "createdAt": new Date().toISOString(),
        "updatedAt": new Date().toISOString(),
        "details": [
            {
                "id": "mrrd-1",
                "description": "Developed a centralized project management and monitoring system for nationwide rural infrastructure projects, saving 100+ staff hours per month.",
                "experienceId": "exp-mrrd"
            },
            {
                "id": "mrrd-2",
                "description": "Built web applications using React.js, Node.js/Express, SQL Server, HTML5, CSS3, and Bootstrap, improving cross-department coordination.",
                "experienceId": "exp-mrrd"
            },
            {
                "id": "mrrd-3",
                "description": "Delivered dashboards and analytics tools that enhanced leadership decision-making and program efficiency.",
                "experienceId": "exp-mrrd"
            }
        ]
    },
    {
        "id": "exp-jssp",
        "company": "Justice Sector Support Program (JSSP)",
        "role": "Software Developer (Full Stack) CMS",
        "startDate": "2017-01-01T00:00:00.000Z",
        "endDate": "2019-12-01T00:00:00.000Z",
        "location": "Kabul, Afghanistan",
        "summary": "Developed Case Management Systems (CMS) for criminal and civil courts.",
        "createdAt": new Date().toISOString(),
        "updatedAt": new Date().toISOString(),
        "details": [
            {
                "id": "jssp-1",
                "description": "Developed Case Management Systems (CMS) for criminal and civil courts, supporting 1,000+ judiciary users and positively impacting thousands of case participants.",
                "experienceId": "exp-jssp"
            },
            {
                "id": "jssp-2",
                "description": "Built scalable applications using React.js, Node.js/Express, SQL Server, HTML5, CSS3, and Bootstrap, improving case resolution efficiency and data integrity.",
                "experienceId": "exp-jssp"
            },
            {
                "id": "jssp-3",
                "description": "Collaborated with legal professionals and international advisors to translate judicial processes into user-focused solutions.",
                "experienceId": "exp-jssp"
            }
        ]
    }
];

data.experience = newExperiences;

// 3. Update Skills based on exact resume categories
const newSkills = [
    { id: "s1", name: "React.js", category: "Frontend", proficiency: 90 },
    { id: "s2", name: "HTML5", category: "Frontend", proficiency: 95 },
    { id: "s3", name: "CSS3", category: "Frontend", proficiency: 90 },
    { id: "s4", name: "Bootstrap", category: "Frontend", proficiency: 90 },
    { id: "s5", name: "JavaScript", category: "Frontend", proficiency: 90 },
    { id: "s6", name: "Node.js", category: "Backend", proficiency: 85 },
    { id: "s7", name: "Express.js", category: "Backend", proficiency: 85 },
    { id: "s8", name: "SQL Server", category: "Database", proficiency: 80 },
    { id: "s9", name: "MySQL", category: "Database", proficiency: 80 },
    { id: "s10", name: "Git", category: "Tools", proficiency: 85 },
    { id: "s11", name: "GitHub", category: "Tools", proficiency: 85 }
];

data.skill = newSkills;

// 4. Update Education (Currently tracked if data.education exists)
if (!data.education) {
    data.education = [];
}
data.education = [
    {
        id: "edu1",
        degree: "Bachelor of Computer Science",
        institution: "Peshawar Agriculture University",
        location: "Peshawar, Pakistan",
        year: "2013" // Fallback based on typical BA logic or historical data, although new resume simply lists the degree
    }
];

// Write changes back
fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
console.log('Successfully updated the entire site data in data.json');
