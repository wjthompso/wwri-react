/**
 * Unified Layout for ALL domains
 * 
 * Structure: Status | Resilience → Resistance + Recovery
 * 
 * Missing sections show muted text with no metric boxes below.
 * - Infrastructure, Communities: Missing Status
 * - Air Quality, Water: Missing Recovery
 */

import { Domain, ResilienceSubdomain, Status } from "types/domainTypes";
import HierarchyArrows from "../../../assets/HierarchyArrows.svg";
import SubHierarchyArrows from "../../../assets/SubHierarchyArrows.svg";

interface LayoutUnifiedProps {
  domain: Domain;
  activeButton: string | null;
  setActiveButton: (id: string) => void;
  setSelectedIndicator: (label: string) => void;
  setSelectedMetricIdObject: (obj: any) => void;
  statusLabel: string | null;
  setStatusLabel: (label: string | null) => void;
  resistanceLabel: string | null;
  setResistanceLabel: (label: string | null) => void;
  recoveryLabel: string | null;
  setRecoveryLabel: (label: string | null) => void;
}

/** Check if a section has available metrics */
const hasMetrics = (section?: Status | ResilienceSubdomain) =>
  section && section.metrics && section.metrics.length > 0;

const LayoutUnified: React.FC<LayoutUnifiedProps> = ({
  domain,
  activeButton,
  setActiveButton,
  setSelectedIndicator,
  setSelectedMetricIdObject,
  statusLabel,
  setStatusLabel,
  resistanceLabel,
  setResistanceLabel,
  recoveryLabel,
  setRecoveryLabel,
}) => {
  const statusAvailable = hasMetrics(domain.status);
  const resistanceAvailable = hasMetrics(domain.resilience?.resistance);
  const recoveryAvailable = hasMetrics(domain.resilience?.recovery);

  return (
    <div id={`layout-unified-${domain.id}`} className="ml-[0.95rem] mt-1 h-[9.5rem]">
      {/* Hierarchy arrows for Status/Resilience split */}
      <div className="ml-2 h-5 flex-shrink-0">
        <img
          src={HierarchyArrows}
          alt="arrows-status-resilience"
          className="ml-3 h-full w-auto"
        />
      </div>

      <div className="flex max-w-[390px] flex-1 justify-between">
        {/* Status Column */}
        <div className="ml-[0.9rem] mr-3 flex flex-shrink-0 flex-col items-start">
          <div className="flex items-center">
            {statusAvailable ? (
              <>
                <button
                  id={`${domain.id}-${domain.status!.id}`}
                  onClick={() => {
                    setActiveButton(`${domain.id}-${domain.status!.id}`);
                    setSelectedIndicator(`${domain.label} ${domain.status!.label}`);
                    setSelectedMetricIdObject({
                      domainId: domain.id,
                      metricId: domain.status!.id,
                      label: domain.status!.label,
                      description: domain.status!.description,
                      colorGradient: domain.colorGradient,
                    });
                  }}
                  className={`mr-1 h-4 w-4 rounded-[0.2rem] border-[1px] ${
                    activeButton === `${domain.id}-${domain.status!.id}`
                      ? "border-metricSelectorBoxesBorderDefault bg-selectedMetricBGColorDefault"
                      : "border-metricSelectorBoxesBorderDefault bg-metricSelectorBoxesDefault"
                  }`}
                />
                <span>Status</span>
              </>
            ) : (
              <>
                <div className="mr-1 h-4 w-4 rounded-[0.2rem] border-[1px] border-gray-300 bg-gray-200" />
                <span className="text-gray-400">Status</span>
              </>
            )}
          </div>
          {statusAvailable ? (
            <>
              <div className="ml-[1.14rem] grid grid-cols-5 gap-x-1 gap-y-1">
                {domain.status!.metrics.map((metric) => (
                  <button
                    key={`${domain.id}-${metric.id}`}
                    id={`${domain.id}-${metric.id}`}
                    onMouseEnter={() => setStatusLabel(metric.label)}
                    onMouseLeave={() => setStatusLabel(null)}
                    onClick={() => {
                      setActiveButton(`${domain.id}-${metric.id}`);
                      setSelectedMetricIdObject({
                        domainId: domain.id,
                        metricId: metric.id,
                        label: `${domain.label} ${metric.label}`,
                        description: metric.description,
                        colorGradient: domain.colorGradient,
                      });
                      setSelectedIndicator(`${domain.label} ${metric.label}`);
                    }}
                    className={`h-3.5 w-3.5 rounded-sm border-[1px] ${
                      activeButton === `${domain.id}-${metric.id}`
                        ? "border-metricSelectorBoxesBorderDefault bg-selectedMetricBGColorDefault"
                        : "border-metricSelectorBoxesBorderDefault bg-metricSelectorBoxesDefault"
                    }`}
                  />
                ))}
              </div>
              <span className="ml-[1.125rem] mt-1 block h-8 max-w-[6rem] font-BeVietnamPro text-xs text-selectedMetricTextLabel">
                {statusLabel || "\u00A0"}
              </span>
            </>
          ) : (
            <span className="ml-[1.125rem] mt-1 block h-8 max-w-[6rem]">{"\u00A0"}</span>
          )}
        </div>

        {/* Resilience Column */}
        <div className="ml-2 flex w-[60%] flex-shrink-0 flex-col items-center">
          <div className="ml-[4.4rem] flex items-center self-start">
            <button
              id={`${domain.id}-${domain.resilience?.id || "resilience"}`}
              onClick={() => {
                if (domain.resilience) {
                  setActiveButton(`${domain.id}-${domain.resilience.id}`);
                  setSelectedIndicator(`${domain.label} ${domain.resilience.label}`);
                  setSelectedMetricIdObject({
                    domainId: domain.id,
                    metricId: domain.resilience.id,
                    label: domain.resilience.label,
                    description: domain.resilience.description,
                    colorGradient: domain.colorGradient,
                  });
                }
              }}
              className={`mr-1 h-4 w-4 rounded-[0.2rem] border-[1px] ${
                activeButton === `${domain.id}-${domain.resilience?.id}`
                  ? "border-metricSelectorBoxesBorderDefault bg-selectedMetricBGColorDefault"
                  : "border-metricSelectorBoxesBorderDefault bg-metricSelectorBoxesDefault"
              }`}
            />
            <span>Resilience</span>
          </div>

          {/* Sub-hierarchy arrows for Resistance/Recovery */}
          <div className="ml-[0.6rem] h-5 flex-shrink-0 self-start">
            <img
              src={SubHierarchyArrows}
              alt="arrows-resistance-recovery"
              className="h-full w-auto"
            />
          </div>

          <div className="flex w-full flex-row justify-between">
            {/* Resistance */}
            <div className="ml-1 flex w-[45%] flex-shrink-0 flex-col items-start">
              <div className="flex items-center">
                {resistanceAvailable ? (
                  <>
                    <button
                      id={`${domain.id}-${domain.resilience!.resistance!.id}`}
                      onClick={() => {
                        setActiveButton(`${domain.id}-${domain.resilience!.resistance!.id}`);
                        setSelectedIndicator(`${domain.label} ${domain.resilience!.resistance!.label}`);
                        setSelectedMetricIdObject({
                          domainId: domain.id,
                          metricId: domain.resilience!.resistance!.id,
                          label: domain.resilience!.resistance!.label,
                          description: domain.resilience!.resistance!.description,
                          colorGradient: domain.colorGradient,
                        });
                      }}
                      className={`mr-1 h-4 w-4 rounded-[0.2rem] border-[1px] ${
                        activeButton === `${domain.id}-${domain.resilience!.resistance!.id}`
                          ? "border-metricSelectorBoxesBorderDefault bg-selectedMetricBGColorDefault"
                          : "border-metricSelectorBoxesBorderDefault bg-metricSelectorBoxesDefault"
                      }`}
                    />
                    <span>Resistance</span>
                  </>
                ) : (
                  <>
                    <div className="mr-1 h-4 w-4 rounded-[0.2rem] border-[1px] border-gray-300 bg-gray-200" />
                    <span className="text-gray-400">Resistance</span>
                  </>
                )}
              </div>
              {resistanceAvailable ? (
                <>
                  <div className="ml-[1.14rem] grid grid-cols-5 gap-x-1 gap-y-1">
                    {domain.resilience!.resistance!.metrics.map((metric) => (
                      <button
                        key={`${domain.id}-${metric.id}`}
                        id={`${domain.id}-${metric.id}`}
                        onMouseEnter={() => setResistanceLabel(metric.label)}
                        onMouseLeave={() => setResistanceLabel(null)}
                        onClick={() => {
                          setActiveButton(`${domain.id}-${metric.id}`);
                          setSelectedMetricIdObject({
                            domainId: domain.id,
                            metricId: metric.id,
                            label: `${domain.label} ${metric.label}`,
                            description: metric.description,
                            colorGradient: domain.colorGradient,
                          });
                          setSelectedIndicator(`${domain.label} ${metric.label}`);
                        }}
                        className={`h-3.5 w-3.5 rounded-sm border-[1px] ${
                          activeButton === `${domain.id}-${metric.id}`
                            ? "border-metricSelectorBoxesBorderDefault bg-selectedMetricBGColorDefault"
                            : "border-metricSelectorBoxesBorderDefault bg-metricSelectorBoxesDefault"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-[1.125rem] mt-1 block h-8 font-BeVietnamPro text-xs text-selectedMetricTextLabel">
                    {resistanceLabel || "\u00A0"}
                  </span>
                </>
              ) : (
                <span className="ml-[1.125rem] mt-1 block h-8">{"\u00A0"}</span>
              )}
            </div>

            {/* Recovery */}
            <div className="ml-[1.3rem] flex min-w-[50%] flex-col items-start">
              <div className="flex items-center">
                {recoveryAvailable ? (
                  <>
                    <button
                      id={`${domain.id}-${domain.resilience!.recovery!.id}`}
                      onClick={() => {
                        setActiveButton(`${domain.id}-${domain.resilience!.recovery!.id}`);
                        setSelectedIndicator(`${domain.label} ${domain.resilience!.recovery!.label}`);
                        setSelectedMetricIdObject({
                          domainId: domain.id,
                          metricId: domain.resilience!.recovery!.id,
                          label: domain.resilience!.recovery!.label,
                          description: domain.resilience!.recovery!.description,
                          colorGradient: domain.colorGradient,
                        });
                      }}
                      className={`mr-1 h-4 w-4 rounded-[0.2rem] border-[1px] ${
                        activeButton === `${domain.id}-${domain.resilience!.recovery!.id}`
                          ? "border-metricSelectorBoxesBorderDefault bg-selectedMetricBGColorDefault"
                          : "border-metricSelectorBoxesBorderDefault bg-metricSelectorBoxesDefault"
                      }`}
                    />
                    <span>Recovery</span>
                  </>
                ) : (
              <>
                <div className="mr-1 h-4 w-4 rounded-[0.2rem] border-[1px] border-gray-300 bg-gray-200" />
                <span className="text-gray-400">Recovery</span>
              </>
                )}
              </div>
              {recoveryAvailable ? (
                <>
                  <div className="ml-[1.14rem] grid grid-cols-5 gap-x-1 gap-y-1">
                    {domain.resilience!.recovery!.metrics.map((metric) => (
                      <button
                        key={`${domain.id}-${metric.id}`}
                        id={`${domain.id}-${metric.id}`}
                        onMouseEnter={() => setRecoveryLabel(metric.label)}
                        onMouseLeave={() => setRecoveryLabel(null)}
                        onClick={() => {
                          setActiveButton(`${domain.id}-${metric.id}`);
                          setSelectedMetricIdObject({
                            domainId: domain.id,
                            metricId: metric.id,
                            label: `${domain.label} ${metric.label}`,
                            description: metric.description,
                            colorGradient: domain.colorGradient,
                          });
                          setSelectedIndicator(`${domain.label} ${metric.label}`);
                        }}
                        className={`h-3.5 w-3.5 rounded-sm border-[1px] ${
                          activeButton === `${domain.id}-${metric.id}`
                            ? "border-metricSelectorBoxesBorderDefault bg-selectedMetricBGColorDefault"
                            : "border-metricSelectorBoxesBorderDefault bg-metricSelectorBoxesDefault"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-[1.125rem] mt-1 block h-8 font-BeVietnamPro text-xs text-selectedMetricTextLabel">
                    {recoveryLabel || "\u00A0"}
                  </span>
                </>
              ) : (
                <span className="ml-[1.125rem] mt-1 block h-8">{"\u00A0"}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayoutUnified;

