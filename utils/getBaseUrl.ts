// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

/**
 * Returns the base URL for the application
 * @returns {string} - The base URL
 */
export const getBaseURL = (): string => {
  // Check for Vercel production environment
  if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'production') {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
  }

  // Check for Vercel preview environment
  if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview') {
    // Use VERCEL_BRANCH_URL if available, fallback to VERCEL_URL
    return `https://${
      process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL ||
      process.env.NEXT_PUBLIC_VERCEL_URL
    }`;
  }

  // Default to localhost for development
  return process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
};
