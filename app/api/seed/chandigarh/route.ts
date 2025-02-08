import { NextRequest, NextResponse } from "next/server";
import { seedChandgarhData, clearChandgarhData } from "@/scripts/seed-chandigarh";

export async function POST(request: NextRequest) {
  try {
    // Disable seeding in production for security
    if (process.env.NODE_ENV === 'production') {
      return NextResponse.json({ error: "Seeding disabled in production" }, { status: 403 });
    }

    // Simple authentication check - you might want to add proper auth
    const authHeader = request.headers.get("authorization");
    if (authHeader !== "Bearer admin-seed-token") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if this is a clear request
    const body = await request.json().catch(() => ({}));
    const action = body.action || "seed";

    if (action === "clear") {
      console.log("🧹 Starting clear process...");
      const result = await clearChandgarhData();
      
      if (result.success) {
        return NextResponse.json({
          success: true,
          message: "Chandigarh neighborhood data cleared successfully!"
        });
      } else {
        return NextResponse.json({
          success: false,
          error: result.error
        }, { status: 500 });
      }
    }

    console.log("🌱 Starting seed process...");
    const result = await seedChandgarhData();

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: "Chandigarh neighborhood seeded successfully!",
        data: result.data
      });
    } else {
      return NextResponse.json({
        success: false,
        error: result.error
      }, { status: 500 });
    }

  } catch (error) {
    console.error("Error in seed API:", error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Use POST method to seed data",
    instructions: "Send POST request with Authorization: Bearer admin-seed-token"
  });
}
