import React from 'react';
import Image from 'next/image';

const SponsorsArray = [
  {
    name: 'Appwrite',
    logo: '/assets/appwriteLogo.svg',
    website: 'https://appwrite.io/',
  },
  {
    name: 'Blog Recorder',
    logo: '/assets/blogRecorderLogo.svg',
    website: 'https://blogrecorder.com/',
  },
  {
    name: 'Frontend Mentor',
    logo: '/assets/frontendMentorLogo.svg',
    website: 'https://www.frontendmentor.io/',
  },
  {
    name: 'GitKraken',
    logo: '/assets/gitkrakenLogo.svg',
    website: 'https://www.gitkraken.com/',
  },
  {
    name: 'Pastel',
    logo: '/assets/pastelLogo.svg',
    website: 'https://usepastel.com/',
  },
];

interface SponsorProps {
  name: string;
  logo: string;
  website: string;
}

export default function Sponsors() {
  const sortedSponsorsArray = [...SponsorsArray].sort((a, b) =>
    a.name.localeCompare(b.name),
  );

  return (
    <div>
      <h2 className="pt-24 pb-8 text-center sm:text-left">Sponsors</h2>
      <div className="grid grid-cols-1 gap-16 sm:grid-cols-2 sm:gap-8 md:grid-cols-3 lg:grid-cols-5">
        {sortedSponsorsArray.map((sponsor) => (
          <div key={sponsor.name} className="flex flex-col items-center">
            <a href={sponsor.website} className="group">
              <div className="relative w-32 h-32">
                <Image
                  src={sponsor.logo}
                  alt={`${sponsor.name} logo`}
                  fill
                  style={{ objectFit: 'contain' }}
                  className="transition-transform group-hover:scale-110"
                />
              </div>
              <h6 className="pt-8 pb-0 text-center">{sponsor.name}</h6>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
