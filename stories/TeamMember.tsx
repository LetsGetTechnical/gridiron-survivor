import React from 'react';

const TeamMembers = [
  {
    name: 'Ryan Furrer',
    role: 'UX Engineer',
    github: 'github.com',
    linkedin: 'linkedin.com',
  },
  {
    name: 'Walter Furrer',
    role: 'Documentation Engineer',
    github: 'github.com',
    linkedin: 'linkedin.com',
  },
  {
    name: 'Walter Furrer',
    role: 'Documentation Engineer',
    github: 'github.com',
    linkedin: 'linkedin.com',
  },
  {
    name: 'Walter Furrer',
    role: 'Documentation Engineer',
    github: 'github.com',
    linkedin: 'linkedin.com',
  },
  {
    name: 'Walter Furrer',
    role: 'Documentation Engineer',
    github: 'github.com',
    linkedin: 'linkedin.com',
  },
  {
    name: 'Walter Furrer',
    role: 'Documentation Engineer',
    github: 'github.com',
    linkedin: 'linkedin.com',
  },
];

interface TeamMemberProps {
  github: string;
  linkedin: string;
  name: string;
  role: string;
}

const TeamMember: React.FC = () => {
  return (
    <div className="flex flex-wrap gap-4 py-12">
      {TeamMembers.map((member) => (
        <div
          className="team-member flex flex-col border border-border rounded w-[13rem] h-[10-rem] p-2"
          key={member.name}
        >
          <div className="flex flex-col">
            <p className="font-bold">{member.name}</p>
            <p>{member.role}</p>
            <a
              href={member.github}
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              GitHub
            </a>
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              LinkedIn
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TeamMember;
