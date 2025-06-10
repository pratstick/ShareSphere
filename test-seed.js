// Simple test script to check seeding functionality
const fetch = require('node-fetch');

async function testSeed() {
  try {
    console.log('Testing seed functionality...');
    
    const response = await fetch('http://localhost:3000/api/seed/chandigarh', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer admin-seed-token',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ action: 'seed' })
    });

    const result = await response.json();
    console.log('Seed result:', result);

  } catch (error) {
    console.error('Test failed:', error.message);
  }
}

// Run test
testSeed();
