import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

const supabase = createClient();

// GET all users
export async function GET() {
  const { data, error } = await (await supabase).from('users').select('*');
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
  return NextResponse.json(data);
}

// CREATE new user
export async function POST(req: Request) {
  const body = await req.json();
  const { data, error } = await (await supabase).from('users').insert(body).single();
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
  return NextResponse.json(data);
}

// UPDATE user
export async function PUT(req: Request) {
  const body = await req.json();
  const { id, ...updates } = body;
  const { data, error } = await (await supabase).from('users').update(updates).eq('id', id).single();
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
  return NextResponse.json(data);
}

// DELETE user
export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  const { error } = await (await supabase).from('users').delete().eq('id', id);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
  return NextResponse.json({ success: true });
}
