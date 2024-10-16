// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import React from 'react';
import { FaLinkedin, FaXTwitter, FaGithub } from 'react-icons/fa6';
import { TeamMember } from './TeamMemberSection';

/**
 * Renders social media links for a team member.
 * @param {TeamMember} props - The properties of a team member.
 * @param [props.github] - The GitHub profile URL of the team member.
 * @param [props.linkedin] - The LinkedIn profile URL of the team member.
 * @param [props.twitter] - The Twitter profile URL of the team member.
 * @returns {React.ReactElement} A React element containing social media links.
 */
const TeamMemberInfo = ({
  name,
  role,
  github,
  linkedin,
  twitter,
}: TeamMember): React.ReactElement => {
  return (
    <>
      <div className="team-members-name-role-container">
        <h3 className="p-0 text-foreground text-lg">{name}</h3>
        <p className="text-muted-foreground">{role}</p>
      </div>
      <div className="team-members-social-container flex gap-2 pt-2">
        {github && (
          <a
            href={github}
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground duration-300 hover:rotate-12 hover:scale-125 hover:text-foreground hover:duration-300"
          >
            <FaGithub size={20} />
          </a>
        )}
        {linkedin && (
          <a
            href={linkedin}
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground duration-300 hover:rotate-12 hover:scale-125 hover:text-foreground hover:duration-300"
          >
            <FaLinkedin size={20} />
          </a>
        )}
        {twitter && (
          <a
            href={twitter}
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground duration-300 hover:rotate-12 hover:scale-125 hover:text-foreground hover:duration-300"
          >
            <FaXTwitter size={20} />
          </a>
        )}
      </div>
    </>
  );
};

export default TeamMemberInfo;
