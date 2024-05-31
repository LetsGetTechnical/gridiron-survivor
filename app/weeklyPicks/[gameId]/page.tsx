import React from 'react';
import { IGameGroup } from '@/api/IapiFunctions';

export default async function page({
  params,
}: {
  params: { gameId: IGameGroup['currentGameId'] };
}) {
  return (
    <div>
      <h1>Weekly Picks</h1>
      <p>Game ID: {params.gameId}</p>
    </div>
  );
}
