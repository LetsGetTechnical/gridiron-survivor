import React from 'react';
import {
  FaLinkedin,
  FaXTwitter,
  FaGithub,
  FaLinkedinIn,
} from 'react-icons/fa6';

// Team Members Arrays
const TeamMembersArray = [
  {
    name: 'Shashi Lo',
    role: 'Engineering Manager',
    github: 'https://github.com/shashilo',
    linkedin: 'https://www.linkedin.com/in/shashilo/',
    twitter: 'https://x.com/shashiwhocodes',
  },
  {
    name: 'Alex Appleget',
    role: 'Software Engineer',
    github: 'https://github.com/alexappleget',
    linkedin: 'https://www.linkedin.com/in/alex-appleget/',
    twitter: 'https://x.com/alexlikescoding',
  },
  {
    name: 'Richard Choi',
    role: 'Developer Relations Engineer',
    github: 'https://github.com/choir27',
    linkedin: 'https://www.linkedin.com/in/richard-choir/',
    twitter: 'https://x.com/choir241',
  },
  {
    name: 'Ryan Furrer',
    role: 'UX Engineer',
    github: 'https://github.com/ryandotfurrer',
    linkedin: 'https://www.linkedin.com/in/ryanfurrer/',
    twitter: 'https://x.com/ryandotfurrer',
  },
  {
    name: 'Walter Furrer',
    role: 'Documentation Engineer',
    github: 'https://github.com/FurrerW',
    linkedin: 'https://www.linkedin.com/in/furrerw/',
    twitter: 'https://x.com/furrerw',
  },
  {
    name: 'Corina Murg',
    role: 'Accessibility Specialist',
    github: 'https://github.com/CorinaMurg',
    linkedin: 'https://www.linkedin.com/in/corinamurg/',
    twitter: 'https://x.com/CorinaMurg',
  },
  {
    name: 'Mai Vang',
    role: 'Documentation Engineer',
    github: 'https://github.com/vmaineng',
    linkedin: 'https://www.linkedin.com/in/mai-vang-swe/',
    twitter: 'https://x.com/MaiVangSWE',
  },
  {
    name: 'Cody Epstein',
    role: 'UX Engineer',
    github: '',
    linkedin: '',
    twitter: 'https://www.linkedin.com/in/cody-epstein/',
  },
  {
    name: 'Michael Larocca',
    role: 'Documentation Engineer',
    github: '',
    linkedin: 'https://www.linkedin.com/in/michaeljudelarocca/',
    twitter: 'https://x.com/MikeJudeLarocca',
  },
  {
    name: 'Danielle Lindblom',
    role: 'Frontend Engineer',
    github: 'https://github.com/Danielle254',
    linkedin: 'https://www.linkedin.com/in/danielle-lindblom/',
    twitter: '',
  },
];

interface TeamMemberProps {
  github?: string;
  linkedin?: string;
  name: string;
  role: string;
  twitter?: string;
}

const TeamMembers: React.FC = () => {
  const sortedTeamMembers = [...TeamMembersArray].sort((a, b) => {
    // Put Shashi Lo first
    if (a.name === 'Shashi Lo') return -1;
    if (b.name === 'Shashi Lo') return 1;

    // For the rest, sort by last name
    const lastNameA = a.name.split(' ').pop() || '';
    const lastNameB = b.name.split(' ').pop() || '';
    return lastNameA.localeCompare(lastNameB);
  });

  return (
    <div className="team-members-container m-auto py-4 grid grid-cols-1 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {sortedTeamMembers.map((member) => (
        <div
          key={member.name}
          className="flex flex-col justify-around px-2 m-auto h-28 w-48 outline outline-outline rounded duration-300 hover:outline-accent-foreground"
        >
          <div>
            <p className="font-bold">{member.name}</p>
            <p>{member.role}</p>
            <div className="flex gap-2 pt-2">
              {member.github && (
                <a
                  href={member.github}
                  target="_blank"
                  rel="noreferrer"
                  className="duration-300 hover:rotate-12 hover:scale-125"
                >
                  <FaGithub size={20} />
                </a>
              )}
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="duration-300 hover:rotate-12 hover:scale-125"
                >
                  <FaLinkedin size={20} />
                </a>
              )}
              {member.twitter && (
                <a
                  href={member.twitter}
                  target="_blank"
                  rel="noreferrer"
                  className="duration-300 hover:rotate-12 hover:scale-125"
                >
                  <FaXTwitter size={20} />
                </a>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TeamMembers;
