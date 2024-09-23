import { getBaseURL } from './getBaseUrl';

describe('getBaseURL', () => {
  it('should return the correct base URL for production', () => {
    process.env.NEXT_PUBLIC_VERCEL_ENV = 'production';
    const result = getBaseURL();
    expect(result).toBe('https://www.gridironsurvivor.com');
  });

  it('should return the correct base URL for preview', () => {
    process.env.NEXT_PUBLIC_VERCEL_ENV = 'preview';
    process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL = 'preview.com';
    const result = getBaseURL();
    expect(result).toBe('https://preview.com');
  });

  it('should return the correct base URL for development', () => {
    process.env.NEXT_PUBLIC_VERCEL_ENV = 'development';
    const result = getBaseURL();
    expect(result).toBe('http://localhost:3000');
  });
});
