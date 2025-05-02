const SEEDING_ENABLED = false;

// DB IS ALREADY SEEDED AT THIS PHASE
// USE ./route.ts.back FOR DEV SEEDING

export async function GET() {
  if (!SEEDING_ENABLED) {
    return Response.json(
      { message: 'Seeding is disabled in production' },
      { status: 404 }
    );
  }
  
  // ...rest of your seeding logic...
}