import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          {
            role: "system",
            content: "You are a NASA Multiverse Scanner. Each time you are called, you must invent a DIFFERENT set of characters and a DIFFERENT funny question. Use global leaders, famous scientists, cartoon icons, and viral memes. Output ONLY valid JSON."
          },
          {
            role: "user",
            content: `Scan the multiverse for a random prediction.
Required JSON Format:
{
  "question": "A unique funny question about tomorrow",
  "characters": [
    {"name": "RANDOM_NAME_1", "msg": "Random funny prediction"},
    {"name": "RANDOM_NAME_2", "msg": "Random funny prediction"},
    {"name": "RANDOM_NAME_3", "msg": "Random funny prediction"},
    {"name": "RANDOM_NAME_4", "msg": "Random funny prediction"},
    {"name": "RANDOM_NAME_5", "msg": "Random funny prediction"}
  ],
  "final_result": "A crazy probability result"
}`
          }
        ],
        temperature: 0.9,
      }),
    });

    if (!response.ok) {
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limited" }), { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Payment required" }), { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
      throw new Error("AI gateway error");
    }

    const aiData = await response.json();
    let content = aiData.choices?.[0]?.message?.content || "";
    
    // Strip markdown code fences if present
    content = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    
    const parsed = JSON.parse(content);
    return new Response(JSON.stringify(parsed), { headers: { ...corsHeaders, "Content-Type": "application/json" } });

  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: "Dimension Glitch" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
