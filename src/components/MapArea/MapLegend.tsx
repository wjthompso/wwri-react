import { Rgb } from "types/rgb";
import getColor from "utils/getColor";

interface MapLegendProps {
  label: string;
  startColor: Rgb;
  endColor: Rgb;
  /** Minimum value to display on legend (default: 0) */
  minValue?: number;
  /** Maximum value to display on legend (default: 100) */
  maxValue?: number;
}

const MapLegend: React.FC<MapLegendProps> = ({
  label,
  startColor,
  endColor,
  minValue = 0,
  maxValue = 100,
}) => {
  // Generate 10 color steps from 1.0 (max) down to 0.0 (min/start color)
  const legendColors = Array.from({ length: 10 }, (_, i) =>
    getColor(startColor, endColor, (9 - i) / 9),
  );

  // Calculate middle value
  const midValue = Math.round((minValue + maxValue) / 2);

  return (
    <div
      id="map-legend"
      className="absolute min-w-[138px] bottom-10 right-1 z-20 flex flex-col rounded-lg bg-white px-3 py-3 shadow-lg"
    >
      <h2 className="mb-2 text-center text-base font-bold leading-5">
        {label}
      </h2>
      <div className="ml-4 flex flex-row justify-center">
        <div className="flex flex-row gap-1">
          <div className="flex flex-col justify-between border border-gray-200">
            {legendColors.map((color, index) => (
              <div
                key={index}
                className="min-h-7 w-16"
                style={{ backgroundColor: color }}
              ></div>
            ))}
          </div>
          <div className="flex flex-col justify-between">
            <span className="mt-[-0.3rem] text-sm">{maxValue}</span>
            <span className="mb-[0rem] text-sm">{midValue}</span>
            <span className="mb-[-0.3rem] text-sm">{minValue}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapLegend;
