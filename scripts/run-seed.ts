#!/usr/bin/env tsx

import { seedChandgarhData } from './seed-chandigarh';

async function main() {
  console.log("🚀 Starting ShareSphere Chandigarh data seeding...\n");
  
  const result = await seedChandgarhData();
  
  if (result.success) {
    console.log("\n🎉 Seeding completed successfully!");
    console.log("You can now visit /neighborhood/chandigarh to see the sample posts!");
  } else {
    console.error("\n❌ Seeding failed:", result.error);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error("💥 Unexpected error:", error);
  process.exit(1);
});
