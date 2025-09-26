import { Sun } from "lucide-react";
import { UnitsDropdown } from "./units-dropdown";

interface WeatherHeaderProps {
  title: string;
  units: "metric" | "imperial";
  onUnitsChange: (units: "metric" | "imperial") => void;
}

export function WeatherHeader({
  title,
  units,
  onUnitsChange,
}: WeatherHeaderProps) {
  console.log("WeatherHeader rendered with units:", units);

  return (
    <header className="flex items-center justify-between w-full mb-8">
      <div className="flex items-center gap-2">
        <Sun className="h-6 w-6 text-yellow-400 fill-lime-400" />
        <h1 className="text-white text-lg font-medium">{title}</h1>
      </div>
      <UnitsDropdown units={units} onUnitsChange={onUnitsChange} />
    </header>
  );
}
