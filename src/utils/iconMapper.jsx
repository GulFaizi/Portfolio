import { FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaBootstrap, FaJsSquare, FaGitAlt, FaGithub } from 'react-icons/fa';
import { SiRedux, SiExpress, SiMysql, SiPostgresql } from 'react-icons/si';

const iconMap = {
    'React': <FaReact />,
    'Redux': <SiRedux />,
    'JavaScript': <FaJsSquare />,
    'Node.js': <FaNodeJs />,
    'Express.js': <SiExpress />,
    'HTML': <FaHtml5 />,
    'CSS': <FaCss3Alt />,
    'SCSS': <FaCss3Alt />, // reusing CSS icon or specific if available
    'Bootstrap': <FaBootstrap />,
    'SQL Server': <SiPostgresql />, // Temporary fallback related to import error
    'MySQL': <SiMysql />,
    'PostgreSQL': <SiPostgresql />,
    'Git': <FaGitAlt />,
    'GitHub': <FaGithub />,
};

export const getSkillIcon = (skillName) => {
    return iconMap[skillName] || null;
};
