import { NextResponse } from 'next/server';
import { supabase } from '../../../../lib/supabase';
import { getLocalLeads, deleteLocalLead } from '../../../../lib/leads';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const localLeads = getLocalLeads();
    let supabaseLeads: any[] = [];

    if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
      try {
        const { data, error } = await supabase
          .from('contact_submissions')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(200);

        if (error) {
          console.error('Supabase fetch error:', error);
        } else if (data) {
          supabaseLeads = data;
        }
      } catch (e) {
        console.error('Supabase fetch exception:', e);
      }
    }

    // Merge and deduplicate
    const combined = [...supabaseLeads, ...localLeads];
    const seen = new Set();
    const unique = combined.filter(item => {
      const key = item.id || `${item.name}_${item.phone}_${item.created_at}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    unique.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    return NextResponse.json({ leads: unique });
  } catch (error) {
    console.error('Admin leads GET error:', error);
    return NextResponse.json({ leads: getLocalLeads() });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    if (!id) {
      return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
    }

    deleteLocalLead(id);

    if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
      try {
        const { error } = await supabase.from('contact_submissions').delete().eq('id', id);
        if (error) {
          console.error('Supabase delete error:', error);
        }
      } catch (e) {
        console.error('Supabase delete exception:', e);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}
