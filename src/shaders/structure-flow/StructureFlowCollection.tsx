import { lazy, Suspense } from "react";

// Unused shader component type placeholders
type DotMatrixBackgroundProps = any;
type EmeraldHorizonBackgroundProps = any;
type NeuformBatchEffectProps = any;
type NeuformCraftEffectProps = any;
type NeuformIsolatedEffectProps = any;
type OrbitalSphereBackgroundProps = any;
type StructureFlowBackgroundProps = any;

export const STRUCTURE_FLOW_VARIANTS = [
  "structure-flow",
  "emerald-horizon",
  "orbital-sphere",
  "dot-matrix",
  "expanse-field",
  "logic-core",
  "dimensional-field",
  "data-field",
  "topology-field",
  "nebula",
  "fluid-field",
  "ember-storm",
  "flux-vortex",
] as const;

export type StructureFlowVariant = (typeof STRUCTURE_FLOW_VARIANTS)[number];

type StructureVariantProps = StructureFlowBackgroundProps & { variant?: "structure-flow" };
type EmeraldVariantProps = EmeraldHorizonBackgroundProps & { variant: "emerald-horizon" };
type OrbitalVariantProps = OrbitalSphereBackgroundProps & { variant: "orbital-sphere" };
type DotMatrixVariantProps = DotMatrixBackgroundProps & { variant: "dot-matrix" };
type IsolatedVariantProps = NeuformIsolatedEffectProps & {
  variant: "expanse-field" | "logic-core" | "dimensional-field" | "data-field" | "topology-field";
};
type CraftVariantProps = NeuformCraftEffectProps & {
  variant: "nebula" | "fluid-field" | "ember-storm";
};
type FluxVariantProps = NeuformBatchEffectProps & { variant: "flux-vortex" };

export type StructureFlowCollectionProps =
  | StructureVariantProps
  | EmeraldVariantProps
  | OrbitalVariantProps
  | DotMatrixVariantProps
  | IsolatedVariantProps
  | CraftVariantProps
  | FluxVariantProps;

const StructureVariant = lazy(() =>
  import("./StructureFlowBackground").then((module) => ({ default: module.StructureFlowBackground })),
);

const FALLBACK = <div className="threeui-background" style={{ background: "#050607" }} />;

export function StructureFlowCollection(props: StructureFlowCollectionProps) {
  const { variant: _variant, ...variantProps } = props;
  return <Suspense fallback={FALLBACK}><StructureVariant {...variantProps} /></Suspense>;
}
