import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API);

export async function POST(req: NextRequest) {
    try {
        const { name, email } = await req.json();

        if (!name || !email) {
            return NextResponse.json(
                { error: 'Name and email are required.' },
                { status: 400 }
            );
        }

        // Send confirmation email to the subscriber
        const { error: subscriberError } = await resend.emails.send({
            from: 'SARC Education Foundation <onboarding@resend.dev>',
            to: [email],
            subject: '🎉 Welcome to the SARC Newsletter!',
            html: `
                <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">
                    <div style="background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); padding: 40px 40px 32px; text-align: center;">
                        <img src="https://sarc.com.np/images/sarc.png" alt="SARC Logo" style="height: 60px; margin-bottom: 16px;" />
                        <h1 style="color: #ffffff; font-size: 28px; font-weight: 700; margin: 0; letter-spacing: -0.5px;">Welcome to SARC!</h1>
                        <p style="color: rgba(255,255,255,0.85); font-size: 16px; margin: 8px 0 0;">You're officially on the list.</p>
                    </div>
                    <div style="padding: 40px;">
                        <p style="font-size: 16px; color: #374151; line-height: 1.7; margin: 0 0 20px;">Hi <strong>${name}</strong>,</p>
                        <p style="font-size: 16px; color: #374151; line-height: 1.7; margin: 0 0 20px;">
                            Thank you for subscribing to the <strong>SARC Education Foundation</strong> newsletter. You'll now be the first to know about:
                        </p>
                        <ul style="padding-left: 20px; color: #374151; font-size: 15px; line-height: 2;">
                            <li>📚 Latest program announcements &amp; admission dates</li>
                            <li>🏆 Student achievements &amp; success stories</li>
                            <li>📢 Upcoming events, workshops &amp; seminars</li>
                            <li>💡 Study tips &amp; academic resources</li>
                        </ul>
                        <div style="text-align: center; margin: 36px 0;">
                            <a href="https://sarc.com.np" style="display: inline-block; background: #2563eb; color: #ffffff; font-size: 15px; font-weight: 700; padding: 14px 32px; border-radius: 50px; text-decoration: none; letter-spacing: 0.3px;">Visit SARC Website →</a>
                        </div>
                        <p style="font-size: 13px; color: #9ca3af; line-height: 1.6; margin: 0; text-align: center;">
                            You're receiving this because you subscribed at sarc.com.np.<br />
                            SARC Education Foundation, Mahendranagar, Kanchanpur, Nepal.
                        </p>
                    </div>
                </div>
            `,
        });

        if (subscriberError) {
            console.error('Resend subscriber error:', subscriberError);
            return NextResponse.json(
                { error: 'Failed to send confirmation email. Please try again.' },
                { status: 500 }
            );
        }

        // Notify the school admin
        await resend.emails.send({
            from: 'SARC Newsletter Bot <onboarding@resend.dev>',
            to: ['onboarding@resend.dev'], // Replace with actual admin email
            subject: `📬 New Newsletter Subscriber: ${name}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 24px; background: #f9fafb; border-radius: 12px;">
                    <h2 style="color: #111827; margin: 0 0 16px;">New Newsletter Subscriber</h2>
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 10px 12px; background: #ffffff; border: 1px solid #e5e7eb; font-weight: 600; color: #374151; width: 30%;">Name</td>
                            <td style="padding: 10px 12px; background: #ffffff; border: 1px solid #e5e7eb; color: #111827;">${name}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px 12px; background: #ffffff; border: 1px solid #e5e7eb; font-weight: 600; color: #374151;">Email</td>
                            <td style="padding: 10px 12px; background: #ffffff; border: 1px solid #e5e7eb; color: #111827;">${email}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px 12px; background: #ffffff; border: 1px solid #e5e7eb; font-weight: 600; color: #374151;">Time</td>
                            <td style="padding: 10px 12px; background: #ffffff; border: 1px solid #e5e7eb; color: #111827;">${new Date().toLocaleString('en-US', { timeZone: 'Asia/Kathmandu' })} (NPT)</td>
                        </tr>
                    </table>
                </div>
            `,
        });

        return NextResponse.json({ success: true, message: 'Subscribed successfully!' });

    } catch (err) {
        console.error('Newsletter route error:', err);
        return NextResponse.json(
            { error: 'An unexpected error occurred.' },
            { status: 500 }
        );
    }
}
