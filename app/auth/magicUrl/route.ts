// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { NextResponse } from 'next/server';
import { account } from '@/api/config';

/**
 * Redirects the user to the origin URL.
 * @param request - The incoming request
 * @returns The response to return
 */
export async function GET(request: Request): Promise<Response> {
  const requestUrl = new URL(request.url);

  const userId = requestUrl.searchParams.get('userId');
  const secret = requestUrl.searchParams.get('secret');

  if (!userId || !secret) {
    return NextResponse.redirect(requestUrl.origin);
  }

  const session = await account.updateMagicURLSession(userId, secret);

  return NextResponse.redirect(`${requestUrl.origin}/weeklyPicks`);
}

// ask discord how to store the session
