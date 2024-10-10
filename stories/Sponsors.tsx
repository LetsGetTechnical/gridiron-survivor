// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import React from 'react';
import Image from 'next/image';

type Sponsor = {
  name: string;
  logoPath: string;
  website: string;
};

const SponsorsArray: Sponsor[] = [
  {
    name: 'Appwrite',
    logoPath: '/assets/appwriteLogo.svg',
    website: 'https://appwrite.io/',
  },
  {
    name: 'Blog Recorder',
    logoPath: '/assets/blogRecorderLogo.svg',
    website: 'https://blogrecorder.com/',
  },
  {
    name: 'Frontend Mentor',
    logoPath: '/assets/frontendMentorLogo.svg',
    website: 'https://www.frontendmentor.io/',
  },
  {
    name: 'GitKraken',
    logoPath: '/assets/gitkrakenLogo.svg',
    website: 'https://www.gitkraken.com/',
  },
  {
    name: 'Pastel',
    logoPath: '/assets/pastelLogo.svg',
    website: 'https://usepastel.com/',
  },
];

/**
 * Creates the Sponsors section of the Storybook Welcome page.
 * @returns the Sponsors section
 */
const Sponsors = (): React.ReactElement => {
  return (
    <section className="sponsors-section">
      <h2 className="pt-24 pb-8 text-center sm:text-left">Sponsors</h2>
      <div className="sponsor-container grid grid-cols-1 gap-16 sm:grid-cols-2 sm:gap-8 md:grid-cols-3 lg:grid-cols-5">
        {SponsorsArray.map((sponsor) => (
          <div
            key={sponsor.name}
            className="sponsor-card flex flex-col items-center"
          >
            <a href={sponsor.website}>
              <div className="sponsor-logo-container relative w-32 h-32">
                <Image
                  src={sponsor.logoPath}
                  alt={`${sponsor.name} logo`}
                  fill
                  style={{ objectFit: 'contain' }}
                  className="transition-transform group-hover:scale-110"
                />
              </div>
              <h3 className="pt-8 pb-0 text-lg text-center">{sponsor.name}</h3>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Sponsors;
