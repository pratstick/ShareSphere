import { SeedControls } from "@/components/admin/SeedControls";

export default function SeedPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          ShareSphere Data Seeder
        </h1>
        <p className="text-gray-600 mb-6">
          Click the button below to create the Chandigarh neighborhood with
          sample posts and comments.
        </p>

        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">
              What will be created:
            </h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Chandigarh neighborhood</li>
              <li>• 20 sample users</li>
              <li>• 10 realistic help posts</li>
              <li>• 30+ community comments</li>
            </ul>
          </div>

          <SeedControls />

          <div className="text-xs text-gray-500 text-center">
            This will create sample data for demonstration purposes
          </div>
        </div>
      </div>
    </div>
  );
}
