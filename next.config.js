// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

/* eslint-disable @typescript-eslint/explicit-function-return-type */

module.exports = {
  /**
   * Redirects the root path to the login page.
   * @returns {Array} The redirect configuration.
   */
  async redirects() {
    return [
      {
        source: '/',
        destination: '/login',
        permanent: true,
      },
    ]
  },
  images: {
    domains: ['a.espncdn.com'],
  },
}