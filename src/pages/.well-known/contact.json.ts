import type { APIRoute } from "astro";
import { contact } from "../../lib/contact";

export const prerender = true;

export const GET: APIRoute = () =>
  new Response(JSON.stringify(contact, null, 2) + "\n", {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
      "Access-Control-Allow-Origin": "*",
    },
  });
