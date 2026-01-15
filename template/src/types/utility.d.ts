type ScalingMetrics = {
  horizontalScale: (size: number) => number;
  verticalScale: (size: number) => number;
  moderateScale: (size: number, factor?: number) => number;
  wp: (widthPercent: number | string) => number;
  hp: (heightPercent: number | string) => number;
  scaleSize: (size: number, factor?: number) => number;
  isLandscape: () => boolean;
};

interface MesureCoordinates {
  x: number;
  y: number;
  w: number;
  h: number;
  pageX: number;
  pageY: number;
}
