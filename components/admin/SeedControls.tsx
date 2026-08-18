"use client";

export function SeedControls() {
  const handleAction = async (action: "seed" | "clear") => {
    try {
      const response = await fetch("/api/seed/chandigarh", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      const result = await response.json();

      if (result.success) {
        alert(
          action === "seed"
            ? "✅ Chandigarh neighborhood seeded successfully!"
            : "🧹 Chandigarh neighborhood data cleared successfully!",
        );
        return;
      }

      alert(
        `❌ ${action === "seed" ? "Seeding" : "Clearing"} failed: ${result.error}`,
      );
    } catch (error) {
      alert(`💥 Error: ${error}`);
    }
  };

  return (
    <div className="flex space-x-3">
      <button
        onClick={() => handleAction("seed")}
        className="flex-1 rounded-lg bg-blue-600 px-4 py-3 font-medium text-white transition-colors hover:bg-blue-700"
      >
        🌱 Seed Data
      </button>
      <button
        onClick={() => handleAction("clear")}
        className="flex-1 rounded-lg bg-red-600 px-4 py-3 font-medium text-white transition-colors hover:bg-red-700"
      >
        🧹 Clear Data
      </button>
    </div>
  );
}
