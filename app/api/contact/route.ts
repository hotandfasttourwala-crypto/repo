import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase';
import { saveLocalLead } from '../../../lib/leads';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = typeof body?.name === 'string' ? body.name.trim() : '';
    const phone = typeof body?.phone === 'string' ? body.phone.trim() : '';
    const message = typeof body?.message === 'string' ? body.message.trim() : '';

    if (!name || !phone) {
      return NextResponse.json({ error: 'Name and Phone are required' }, { status: 400 });
    }

    let insertedLead: any = null;

    // 1. If Supabase is available, insert lead directly into Supabase
    if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
      try {
        const { data, error } = await supabase
          .from('contact_submissions')
          .insert([
            { name, phone, message: message || '' }
          ])
          .select();

        if (error) {
          console.error("Supabase insert error:", error);
        } else if (data && data[0]) {
          insertedLead = data[0];
        }
      } catch (err) {
        console.warn("Supabase background insert exception:", err);
      }
    }

    // 2. Always backup locally as fallback
    const fallbackLead = insertedLead || {
      id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `lead_${Date.now()}`,
      name,
      phone,
      message,
      created_at: new Date().toISOString(),
      status: 'pending'
    };
    saveLocalLead(fallbackLead);

    return NextResponse.json({ success: true, lead: fallbackLead });
  } catch (error: any) {
    console.error("Contact submission error:", error);
    return NextResponse.json({ error: error?.message || 'Failed to submit request' }, { status: 500 });
  }
}
