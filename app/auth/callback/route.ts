import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  // If code is present, it means the user has completed the sign-in process
  // You can handle the sign-in process completion here
  // For example, you might want to set a cookie or session variable to indicate the user is signed in

  // URL to redirect to after sign-in process completes
  return NextResponse.redirect(requestUrl.origin);
}
