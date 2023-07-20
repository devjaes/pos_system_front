import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const page_str = request.nextUrl.searchParams.get("page");
  const limit_str = request.nextUrl.searchParams.get("limit");

  const page = page_str ? parseInt(page_str, 10) : 1;
  const limit = limit_str ? parseInt(limit_str, 10) : 10;
  const skip = (page - 1) * limit;

  const invoice = request.body;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: invoice,
    duplex: 'half',
  };

  const response = await fetch("https://invoice-generator.com", options);
  if (!response.ok) {
    console.log("No se pudo crear el PDF.");
    return;
  }
 

  let json_response = {
    status: "success",
    data: response,
  };

  return (response);
}

