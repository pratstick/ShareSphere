"use client";

export default function SeedPage() {
  const handleAction = async (action: 'seed' | 'clear') => {
    try {
      const response = await fetch('/api/seed/chandigarh', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer admin-seed-token',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ action })
      });

      const result = await response.json();
      
      if (result.success) {
        if (action === 'seed') {
          alert('✅ Chandigarh neighborhood seeded successfully!\n\nYou can now visit /neighborhood/chandigarh to see the sample posts!');
        } else {
          alert('🧹 Chandigarh neighborhood data cleared successfully!');
        }
      } else {
        alert(`❌ ${action === 'seed' ? 'Seeding' : 'Clearing'} failed: ` + result.error);
      }
    } catch (error) {
      alert('💥 Error: ' + error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          ShareSphere Data Seeder
        </h1>
        <p className="text-gray-600 mb-6">
          Click the button below to create the Chandigarh neighborhood with sample posts and comments.
        </p>
        
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">What will be created:</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Chandigarh neighborhood</li>
              <li>• 20 sample users</li>
              <li>• 10 realistic help posts</li>
              <li>• 30+ community comments</li>
            </ul>
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={() => handleAction('seed')}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
            >
              🌱 Seed Data
            </button>
            
            <button
              onClick={() => handleAction('clear')}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
            >
              🧹 Clear Data
            </button>
          </div>
          
          <div className="text-xs text-gray-500 text-center">
            This will create sample data for demonstration purposes
          </div>
        </div>
      </div>
    </div>
  );
}
