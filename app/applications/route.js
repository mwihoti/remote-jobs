import { NextResponse } from "next/server";
import prisma from "../../lib/prisma";
import { workosWithAuthetUser as getUser } from "../../lib/auth";

export async function POST(request) {
    const user = await getUser(request);
    const { jobId } = await request.json();

    const application = await prisma.application.create({
        data: {
            job: { connect: { id: jobId }},
            user: { connect: { id: user.id }}
        }
    });
    return NextResponse.json(application);
 }