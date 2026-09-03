import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase';

export async function POST(request: Request) {
  try {
    const { name, phone, message } = await request.json();

    if (!name || !phone) {
      return NextResponse.json({ error: 'Name and Phone are required' }, { status: 400 });
    }

    const { error } = await supabase
      .from('contact_submissions')
      .insert([
        { name, phone, message }
      ]);

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
