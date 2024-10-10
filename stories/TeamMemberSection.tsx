// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import React from 'react';
import TeamMemberInfo from './TeamMemberInfo';

export type TeamMember = {
  name: string;
  role: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
};

export const TeamMembersArray: TeamMember[] = [
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
    name: 'Cody Epstein',
    role: 'UX Engineer',
    github: 'https://github.com/kepsteen/',
    linkedin: 'https://www.linkedin.com/in/cody-epstein/',
    twitter: '',
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
    name: 'Michael Larocca',
    role: 'Documentation Engineer',
    github: 'https://github.com/MichaelLarocca',
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
  {
    name: 'Dominick Monaco',
    role: 'Frontend Engineer',
    github: 'https://github.com/HoldUpFjord',
    linkedin: 'https://www.linkedin.com/in/dominick-j-monaco/',
    twitter: 'https://x.com/DominickJMonaco',
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
];

/**
 * Creates the Team Member section of the Storybook Welcome Page
 * @returns the Team Member section
 */
const TeamMemberSection = (): React.ReactElement => {
  return (
    <section className="team-member-section">
      <h2 className="pt-24 pb-8 text-center sm:text-left">Meet the Team</h2>
      <div className="team-members-container m-auto grid grid-cols-1 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {TeamMembersArray.map((member) => (
          <div
            key={member.name}
            className="team-member-card flex flex-col justify-around px-2 m-auto h-32 w-48 outline outline-outline rounded duration-300 hover:outline-accent-foreground"
          >
            <TeamMemberInfo
              name={member.name}
              role={member.role}
              github={member.github}
              linkedin={member.linkedin}
              twitter={member.twitter}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeamMemberSection;
