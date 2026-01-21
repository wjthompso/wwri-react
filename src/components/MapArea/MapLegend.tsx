import { Rgb } from "types/rgb";
import getColor from "utils/getColor";

const MapLegend: React.FC<{
  label: string;
  startColor: Rgb;
  endColor: Rgb;
}> = ({ label, startColor, endColor }) => {
  const legendColors = Array.from({ length: 10 }, (_, i) =>
    getColor(startColor, endColor, (10 - i) / 10),
  );

  return (
    <div className="absolute bottom-10 right-1 z-20 flex w-[9rem] flex-col rounded-lg bg-white px-2 py-4 shadow-lg">
      <h2 className="mb-2 text-center text-base font-bold leading-5">
        {label}
      </h2>
      <div className="flex columns-2 flex-row justify-center align-middle">
        <div className="relative flex flex-col justify-between">
          {legendColors.map((color, index) => (
            <div
              key={index}
              className="min-h-7 w-7"
              style={{ backgroundColor: color }}
            ></div>
          ))}
          <div className="absolute left-7 ml-1 flex h-full w-full flex-col justify-between">
            <span className="mt-[-0.3rem] text-sm">100</span>
            <span className="mb-[0rem] text-sm">50</span>
            <span className="mb-[-0.3rem] text-sm">0</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapLegend;
