import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createServerClient } from "@/lib/supabase";


const addressSchema = z.object({
  customer_id: z.string(),
  type: z.enum(["home", "work", "other"]),
  name: z.string().min(1),
  phone: z.string().min(10),
  city: z.string(),
  state: z.string(),
  pincode: z.string(),
  is_default: z.boolean(),
});


export async function GET(req:NextRequest, { params }: {params: Promise<{id:string}>} ) {
  const supabase = createServerClient(); 
  const {id} = await params

  const { data, error } = await supabase
    .from("customer_addresses") 
    .select("*")
    .eq("customer_id", id)
  if (error || !data) {
    return NextResponse.json({ error: `Address not found nahi mila na ${error?.message}` }, { status: 404 });
  }

  return NextResponse.json({ success: true, data }, { status: 200 });
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = addressSchema.partial().parse(body); // allow partial updates

    const supabase = createServerClient();

    const { data, error } = await supabase
      .from("customer_addresses")
      .update({ ...validated, updated_at: new Date().toISOString() })
      .eq("id", body.id)
      .select()
      .single();

    if (error) {
      console.error("Update error:", error);
      return NextResponse.json({ error: `Update failed: ERROR IS ${error.message}` }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues[0]?.message }, { status: 400 });
    }

    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const supabase = createServerClient();
  const body = await req.json();

  const { error } = await supabase
    .from("customer_addresses")
    .delete()
    .eq("id", body.id);

  if (error) {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = addressSchema.parse(body);

    const supabase = createServerClient();

    const { data, error } = await supabase
      .from("customer_addresses")
      .insert({
        ...validated,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error("Insert error:", error);
      return NextResponse.json({ error: "Failed to create address" }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues[0]?.message }, { status: 400 });
    }

    console.error("Server error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
