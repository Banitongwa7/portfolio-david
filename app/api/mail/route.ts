
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";


export async function GET() {
    return NextResponse.json({ message: "Hello World" });
}


export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        if (!body.fullName || !body.email || !body.message) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }
    
        const transport = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            },
        });

    
        const mailData = {
            from: process.env.EMAIL,
            to: process.env.EMAIL,
            subject: `Message from ${body.fullName}`,
            text: `Name: ${body.fullName}\nEmail: ${body.email}\nMessage: ${body.message}`,
        };

     
        await transport.sendMail(mailData);

        return NextResponse.json({ success: true, message: "Email sent successfully" });
    } catch (error: { [key: string]: string }) {
        console.error("Email sending error:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}