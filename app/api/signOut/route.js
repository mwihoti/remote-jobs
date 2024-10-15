import { NextResponse } from 'next/server';
import { signOut } from '@workos-inc/authkit-nextjs';

export async function POST() {
  try {
    await signOut();
     return NextResponse.redirect(new URL('/'));
  } catch (error) {
    return NextResponse.json({ message: 'Error signing out' }, { status: 500 });
  }
}

export function GET() {
  return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
}
