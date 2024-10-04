import React from 'react';
import Image from 'next/image';

const sponsorsArray = [
  {
    name: 'Appwrite',
    logo: '/stories/assets/appwriteLogo.svg',
    website: '#',
  },
  {
    name: 'Blog Recorder',
    logoPath: '/assets/blogRecorderLogo.svg',
    website: '#',
  },
  {
    name: 'Frontend Mentor',
    logoPath: './assets/frontendMentorLogo.svg',
    website: '#',
  },
  {
    name: 'GitKraken',
    logoPath: './assets/gitkrakenLogo.svg',
    website: '#',
  },
  {
    name: 'Pastel',
    logoPath: './assets/pastelLogo.svg',
    website: '#',
  },
].sort((a, b) => a.name.localeCompare(b.name));

interface SponsorProps {
  name: string;
  logoPath: string;
  website: string;
}

const Sponsor = ({ name, logoPath, website }) => (
  <a
    href={website}
    target="_blank"
    rel="noreferrer"
    className="flex flex-col items-center p-4 m-2 hover:shadow-lg transition-shadow duration-300"
  >
    <Image
      src={logoPath}
      alt={`${name} logo`}
      width={100}
      height={100}
      objectFit="contain"
    />
    <h6 className="mt-2 text-center font-semibold">{name}</h6>
  </a>
);

const Sponsors = () => (
  <div className="sponsors-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {sponsorsArray.map((sponsor) => (
      <Sponsor
        key={sponsor.name}
        name={sponsor.name}
        logo={sponsor.logo}
        website={sponsor.website}
      />
    ))}
  </div>
);

export default Sponsors;
