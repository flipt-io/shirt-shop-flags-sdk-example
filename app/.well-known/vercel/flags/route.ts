import { type ApiData, mergeProviderData, verifyAccess } from "flags";
import { getProviderData } from "flags/next";
import { NextResponse, type NextRequest } from "next/server";
import * as flags from "../../../../flags";
import { getProviderData as getFliptProviderData } from "@flipt-io/vercel-adapter";

export const runtime = "edge";
export const dynamic = "force-dynamic"; // defaults to auto

export async function GET(request: NextRequest) {
  const access = await verifyAccess(request.headers.get("Authorization"));
  if (!access) return NextResponse.json(null, { status: 401 });

  // Merge the provider data from Flags in Code and the Flipt API
  const providerData = await mergeProviderData([
    // Data declared from Flags in Code
    getProviderData(flags),
    // metadata from Flipt API
    getFliptProviderData(),
  ]);

  return NextResponse.json<ApiData>(providerData);
}
