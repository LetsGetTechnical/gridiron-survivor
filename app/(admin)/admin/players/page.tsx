// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { JSX } from 'react';

/**
 * Renders the admin page.
 * @returns {JSX.Element} - The rendered Admin Players page.
 */
const AdminPlayers = (): JSX.Element => {
  return (
    <section
      className="p-4 max-w-screen-lg"
      data-testid="admin-players-content"
    >
      <table className="w-full border border-border">
        <thead>
          <tr className="text-left text-muted-foreground">
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Position</th>
            <th className="py-2 px-4 border-b">Team</th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover:bg-muted">
            <td className="py-2 px-4 border-b">John Doe</td>
            <td className="py-2 px-4 border-b">Quarterback</td>
            <td className="py-2 px-4 border-b">Team A</td>
          </tr>
          <tr className="hover:bg-muted">
            <td className="py-2 px-4 border-b">Jane Smith</td>
            <td className="py-2 px-4 border-b">Running Back</td>
            <td className="py-2 px-4 border-b">Team B</td>
          </tr>
          <tr className="hover:bg-muted">
            <td className="py-2 px-4 border-b">Mike Johnson</td>
            <td className="py-2 px-4 border-b">Wide Receiver</td>
            <td className="py-2 px-4 border-b">Team C</td>
          </tr>
          <tr className="hover:bg-muted">
            <td className="py-2 px-4 border-b">Alice Brown</td>
            <td className="py-2 px-4 border-b">Tight End</td>
            <td className="py-2 px-4 border-b">Team D</td>
          </tr>
          <tr className="hover:bg-muted">
            <td className="py-2 px-4 border-b">Bob White</td>
            <td className="py-2 px-4 border-b">Linebacker</td>
            <td className="py-2 px-4 border-b">Team E</td>
          </tr>
          <tr className="hover:bg-muted">
            <td className="py-2 px-4 border-b">Charlie Green</td>
            <td className="py-2 px-4 border-b">Cornerback</td>
            <td className="py-2 px-4 border-b">Team F</td>
          </tr>
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-4">
        <button
          type="button"
          className="px-4 py-2 outline rounded hover:bg-muted"
        >
          Previous
        </button>
        <span>Page 1 of 10</span>
        <button
          type="button"
          className="px-4 py-2 outline rounded hover:bg-muted"
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default AdminPlayers;
