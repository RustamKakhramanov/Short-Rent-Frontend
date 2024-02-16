import { NextResponse } from 'next/server'
import InviteCodeHelper from './helpers/invite-code';
import type { NextFetchEvent, NextRequest } from 'next/server';

export default function middleware(req: NextRequest, ev: NextFetchEvent) {
    const code = req.nextUrl.searchParams.get('invite');
    const response = NextResponse.next()

    if (code) {
        InviteCodeHelper.set('invite', code)
    }

    return response;
}

export const config = {
    matcher: '/:path',
}