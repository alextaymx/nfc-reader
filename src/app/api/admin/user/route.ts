import { adminAuthClient } from '@/utils/supabase/adminClient';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const body = await req.json();
  const { id } = body;

  if (id) {
    const { data, error } = await adminAuthClient.getUserById(id);
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json(data);
  } else {
    const { data, error } = await adminAuthClient.listUsers();
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json(data);
  }
}

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password, name } = body;
  const { data, error } = await adminAuthClient.createUser({
    email,
    password,
    user_metadata: { name, full_name: name },
  });
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
  return NextResponse.json(data);
}

export async function PUT(req: Request) {
  const body = await req.json();
  const { id, email, name, password } = body;

  const { data: user, error } = await adminAuthClient.updateUserById(
    id,
    { email, password, user_metadata: { name, full_name: name } },
  );
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
  return NextResponse.json(user);
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) {
    return NextResponse.json({ error: 'id is required' }, { status: 400 });
  }
  const { error } = await adminAuthClient.deleteUser(
    id,
  );
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
  return NextResponse.json({ success: true });
}
