import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createServerClient } from "@/lib/supabase";

// ✅ Address schema for validation
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

// ✅ GET address by ID
export async function GET(req: NextRequest,{ params }: { params: { id: string } }) {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from("customer_addresses")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error) {
    return NextResponse.json({ error: `Address not found nahi mila na ${error.message}` }, { status: 404 });
  }

  if (!data){
    return NextResponse.json({error:"Data Nahi Aya"}, { status: 402})
  }

  return NextResponse.json({ success: true, data });
}

// ✅ PUT (update address by ID)
export async function PUT(req: NextRequest,{ params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const validated = addressSchema.partial().parse(body); // allow partial updates

    const supabase = createServerClient();

    const { data, error } = await supabase
      .from("customer_addresses")
      .update({ ...validated, updated_at: new Date().toISOString() })
      .eq("id", params.id)
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

// ✅ DELETE address by ID
export async function DELETE(req: NextRequest,{ params }: { params: { id: string } }) {
  const supabase = createServerClient();

  const { error } = await supabase
    .from("customer_addresses")
    .delete()
    .eq("id", params.id);

  if (error) {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
