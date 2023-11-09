import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
export const config = {
  matcher: "/",
};

export const middleware = async (req: NextRequest) => {
  return NextResponse.next();
};
