import { writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import MassTools from 'mass-tools';
import { xyToXYObject } from 'ml-spectra-processing';

const { IsotopicDistribution, getBestPeaks } = MassTools;

const __dirname = dirname(fileURLToPath(import.meta.url));

const mf = 'HCys100OH';
const fwhm = 0.01;

const result = {};

// Generale a profile spectrum
const isotopicDistributionProfile = new IsotopicDistribution(mf, {
  fwhm,
  maxLines: 1e5,
});
result.profile = xyToXYObject(
  isotopicDistributionProfile.getGaussian({
    maxLength: 1e8,
    maxValue: 100,
  }),
);

// Get the best peaks
const isotopicDistribution = new IsotopicDistribution(mf, { fwhm: 0 });

const peaks = isotopicDistribution.getPeaks({ maxValue: 100 });
result.centroid = peaks.map((peak) => ({ x: peak.x, y: peak.y }));

result.bestPeaks = getBestPeaks(peaks).map((peak) => ({
  x: peak.x,
  y: peak.y,
  label: peak.label,
  shortLabel: peak.shortLabel,
}));

writeFileSync(join(__dirname, `${mf}_${fwhm}.json`), JSON.stringify(result));
