import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const song = await request.json();

        const supabase = createRouteHandlerClient({ cookies });

        const {
            data: { session },
            error: sessionError,
        } = await supabase.auth.getSession();

        if (sessionError) {
            console.error("❌ Session Error:", sessionError);
            return NextResponse.json({ error: "Session error" }, { status: 401 });
        }

        if (!session) {
            console.error("❌ No User Session Found");
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { data, error } = await supabase
            .from("Songs")
            .insert({
                title: song.title,
                body: song.body,
                priority: song.priority,
                user_id: session.user.id,
            })
            .select()
            .single();

        if (error) {
            console.error("❌ Supabase Insert Error:", error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        console.log("✅ Data inserted successfully:", data);
        return NextResponse.json({ data }, { status: 201 });
    } catch (error) {
        console.error("❌ API Error:", error);
        return NextResponse.json({ error: "Unknown error" }, { status: 500 });
    }
}