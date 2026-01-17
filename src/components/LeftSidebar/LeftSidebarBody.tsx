import { DomainScores } from "utils/domainScoreColors";
import GraphReport from "../../assets/GraphReport.svg";
import CircularProgressBar from "./CircularProgressBar";
import FlowerChart from "./FlowerChart";

interface LeftSidebarBodyProps {
  overallResilienceScore: number | null;
  domainScores: DomainScores | null;
}

export function LeftSidebarBody({
  overallResilienceScore,
  domainScores,
}: LeftSidebarBodyProps) {
  let overallResilienceScoreFormatted: number;
  if (overallResilienceScore && overallResilienceScore < 1) {
    overallResilienceScoreFormatted = overallResilienceScore * 100;
  } else if (overallResilienceScore) {
    overallResilienceScoreFormatted = overallResilienceScore;
  } else {
    overallResilienceScoreFormatted = 0;
  }

  return (
    <div
      id="left-sidebar-body"
      className="flex w-full flex-1 flex-col px-leftSidebarXAxis"
    >
      <h3 className="pb-2 pt-3 font-BeVietnamPro text-xs text-leftSidebarNotifier">
        The following information pertains to the selected region
      </h3>
      <h1 className="font-BeVietnamePro text-sm font-bold text-leftSidebarOverallResilience">
        OVERALL SCORE
      </h1>
      <CircularProgressBar percentage={overallResilienceScoreFormatted} />
      <h1 className="font-BeVietnamePro pb-2 text-sm font-bold text-leftSidebarOverallResilience">
        INDIVIDUAL DOMAIN SCORES
      </h1>
      <div className="mb-1 w-[200px]">
        <FlowerChart domainScores={domainScores} />
      </div>
      <button className="mt-2 flex w-full flex-row items-center rounded-md border-[1px] border-black p-1">
        <img
          src={GraphReport}
          alt="Graph Report"
          className="ml-2 mr-2 h-5 w-5"
        />
        <h1 className="font-BeVietnamPro font-bold">VIEW REPORT</h1>
      </button>
    </div>
  );
}
