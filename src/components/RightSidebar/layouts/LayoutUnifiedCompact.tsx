/**
 * Compact Unified Layout for subdomains (e.g., Iconic Places, Iconic Species)
 * 
 * Same structure as LayoutUnified but without extra left indentation
 * to preserve screen real estate for nested domains.
 * 
 * Structure: Status | Resilience → Resistance + Recovery
 * Missing sections show muted text with no metric boxes below.
 */

import { Subdomain } from "types/domainTypes";
import HierarchyArrows from "../../../assets/HierarchyArrows.svg";
import SubHierarchyArrows from "../../../assets/SubHierarchyArrows.svg";
import { ResilienceSubdomain, Status } from "types/domainTypes";

interface LayoutUnifiedCompactProps {
  subdomain: Subdomain;
  parentDomainId: string;
  colorGradient: { startColor: { r: number; g: number; b: number }; endColor: { r: number; g: number; b: number } };
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

const hasMetrics = (section?: Status | ResilienceSubdomain) =>
  section && section.metrics && section.metrics.length > 0;

const LayoutUnifiedCompact: React.FC<LayoutUnifiedCompactProps> = ({
  subdomain,
  parentDomainId,
  colorGradient,
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
  const statusAvailable = hasMetrics(subdomain.status);
  const resistanceAvailable = hasMetrics(subdomain.resilience?.resistance);
  const recoveryAvailable = hasMetrics(subdomain.resilience?.recovery);

  // Compose IDs using parent domain + subdomain
  const makeId = (suffix: string) => `${parentDomainId}-${subdomain.id}-${suffix}`;

  return (
    <div id={`layout-compact-${subdomain.id}`} className="mt-1 h-[9rem]">
      {/* Hierarchy arrows for Status/Resilience split */}
      <div className="ml-2 h-5 flex-shrink-0">
        <img
          src={HierarchyArrows}
          alt="arrows-status-resilience"
          className="ml-3 h-full w-auto"
        />
      </div>

      <div className="flex max-w-[370px] flex-1 justify-between">
        {/* Status Column */}
        <div className="ml-[0.9rem] mr-3 flex flex-shrink-0 flex-col items-start">
          <div className="flex items-center">
            {statusAvailable ? (
              <>
                <button
                  id={makeId(subdomain.status!.id)}
                  onClick={() => {
                    setActiveButton(makeId(subdomain.status!.id));
                    setSelectedIndicator(`${subdomain.label} ${subdomain.status!.label}`);
                    setSelectedMetricIdObject({
                      domainId: parentDomainId,
                      metricId: subdomain.status!.id,
                      label: subdomain.status!.label,
                      description: subdomain.status!.description,
                      colorGradient,
                    });
                  }}
                  className={`mr-1 h-4 w-4 rounded-[0.2rem] border-[1px] ${
                    activeButton === makeId(subdomain.status!.id)
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
                {subdomain.status!.metrics.map((metric) => (
                  <button
                    key={makeId(metric.id)}
                    id={makeId(metric.id)}
                    onMouseEnter={() => setStatusLabel(metric.label)}
                    onMouseLeave={() => setStatusLabel(null)}
                    onClick={() => {
                      setActiveButton(makeId(metric.id));
                      setSelectedMetricIdObject({
                        domainId: parentDomainId,
                        metricId: metric.id,
                        label: `${subdomain.label} ${metric.label}`,
                        description: metric.description,
                        colorGradient,
                      });
                      setSelectedIndicator(`${subdomain.label} ${metric.label}`);
                    }}
                    className={`h-3.5 w-3.5 rounded-sm border-[1px] ${
                      activeButton === makeId(metric.id)
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
              id={makeId(subdomain.resilience?.id || "resilience")}
              onClick={() => {
                if (subdomain.resilience) {
                  setActiveButton(makeId(subdomain.resilience.id));
                  setSelectedIndicator(`${subdomain.label} ${subdomain.resilience.label}`);
                  setSelectedMetricIdObject({
                    domainId: parentDomainId,
                    metricId: subdomain.resilience.id,
                    label: subdomain.resilience.label,
                    description: subdomain.resilience.description,
                    colorGradient,
                  });
                }
              }}
              className={`mr-1 h-4 w-4 rounded-[0.2rem] border-[1px] ${
                activeButton === makeId(subdomain.resilience?.id || "")
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
                      id={makeId(subdomain.resilience!.resistance!.id)}
                      onClick={() => {
                        setActiveButton(makeId(subdomain.resilience!.resistance!.id));
                        setSelectedIndicator(`${subdomain.label} ${subdomain.resilience!.resistance!.label}`);
                        setSelectedMetricIdObject({
                          domainId: parentDomainId,
                          metricId: subdomain.resilience!.resistance!.id,
                          label: subdomain.resilience!.resistance!.label,
                          description: subdomain.resilience!.resistance!.description,
                          colorGradient,
                        });
                      }}
                      className={`mr-1 h-4 w-4 rounded-[0.2rem] border-[1px] ${
                        activeButton === makeId(subdomain.resilience!.resistance!.id)
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
                    {subdomain.resilience!.resistance!.metrics.map((metric) => (
                      <button
                        key={makeId(metric.id)}
                        id={makeId(metric.id)}
                        onMouseEnter={() => setResistanceLabel(metric.label)}
                        onMouseLeave={() => setResistanceLabel(null)}
                        onClick={() => {
                          setActiveButton(makeId(metric.id));
                          setSelectedMetricIdObject({
                            domainId: parentDomainId,
                            metricId: metric.id,
                            label: `${subdomain.label} ${metric.label}`,
                            description: metric.description,
                            colorGradient,
                          });
                          setSelectedIndicator(`${subdomain.label} ${metric.label}`);
                        }}
                        className={`h-3.5 w-3.5 rounded-sm border-[1px] ${
                          activeButton === makeId(metric.id)
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
                      id={makeId(subdomain.resilience!.recovery!.id)}
                      onClick={() => {
                        setActiveButton(makeId(subdomain.resilience!.recovery!.id));
                        setSelectedIndicator(`${subdomain.label} ${subdomain.resilience!.recovery!.label}`);
                        setSelectedMetricIdObject({
                          domainId: parentDomainId,
                          metricId: subdomain.resilience!.recovery!.id,
                          label: subdomain.resilience!.recovery!.label,
                          description: subdomain.resilience!.recovery!.description,
                          colorGradient,
                        });
                      }}
                      className={`mr-1 h-4 w-4 rounded-[0.2rem] border-[1px] ${
                        activeButton === makeId(subdomain.resilience!.recovery!.id)
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
                    {subdomain.resilience!.recovery!.metrics.map((metric) => (
                      <button
                        key={makeId(metric.id)}
                        id={makeId(metric.id)}
                        onMouseEnter={() => setRecoveryLabel(metric.label)}
                        onMouseLeave={() => setRecoveryLabel(null)}
                        onClick={() => {
                          setActiveButton(makeId(metric.id));
                          setSelectedMetricIdObject({
                            domainId: parentDomainId,
                            metricId: metric.id,
                            label: `${subdomain.label} ${metric.label}`,
                            description: metric.description,
                            colorGradient,
                          });
                          setSelectedIndicator(`${subdomain.label} ${metric.label}`);
                        }}
                        className={`h-3.5 w-3.5 rounded-sm border-[1px] ${
                          activeButton === makeId(metric.id)
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

export default LayoutUnifiedCompact;

