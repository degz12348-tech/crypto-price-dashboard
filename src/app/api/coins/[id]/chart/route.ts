import { NextResponse } from "next/server";

const COINGECKO_API = "https://api.coingecko.com/api/v3";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const res = await fetch(
      `${COINGECKO_API}/coins/${encodeURIComponent(id)}/market_chart?vs_currency=usd&days=7`,
      { next: { revalidate: 30 } }
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch chart data" },
        { status: res.status }
      );
    }

    const data = await res.json();

    return NextResponse.json(
      { prices: data.prices },
      {
        headers: {
          "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60",
        },
      }
    );
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
