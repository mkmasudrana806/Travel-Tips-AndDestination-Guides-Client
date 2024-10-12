import { trends } from "@/constant";
import { TrendingUp } from "lucide-react";

export default function TravelTrends() {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <TrendingUp className="mr-2" />
        Travel Trends
      </h2>
      <ul className="space-y-4">
        {trends.map((trend) => (
          <li key={trend.id} className="border-b pb-2 last:border-b-0">
            <h3 className="font-semibold">{trend.title}</h3>
            <p className="text-sm text-gray-600">{trend.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
