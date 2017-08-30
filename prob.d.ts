/**
 * Copyright 2016 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
export declare namespace ProbTS {
    class Prob {
        private _rng01;
        private _rng11;
        /**
         * @param {() => number} rng A function generating numbers randomly within [0, 1) with a uniform distribution
         */
        constructor(rng?: () => number);
        uniform(min?: number, max?: number): UniformDistribution;
        normal(mean?: number, sd?: number): NormalDistribution;
        exponential(lambda?: number): ExponentialDistribution;
        logNormal(mu?: number, sigma?: number): LogNormalDistribution;
        poisson(lambda?: number): PoissonDistribution;
    }
    enum DistributionType {
        Unknown = 0,
        Continuous = 1,
        Discrete = 2,
    }
    interface Distribution {
        min: number;
        max: number;
        mean: number;
        variance: number;
        type: DistributionType;
        random(): number;
    }
    class UniformDistribution implements Distribution {
        private _rng01;
        private _min;
        private _max;
        private _range;
        private _mean;
        private _variance;
        private _type;
        constructor(rng01: () => number, min: number, max: number);
        readonly min: number;
        readonly max: number;
        readonly mean: number;
        readonly variance: number;
        readonly type: DistributionType;
        random(): number;
    }
    class NormalDistribution implements Distribution {
        private _rng11;
        private _min;
        private _max;
        private _mean;
        private _sd;
        private _variance;
        private _type;
        private _y1;
        private _y2;
        constructor(rng11: () => number, mean: number, sd: number);
        readonly min: number;
        readonly max: number;
        readonly mean: number;
        readonly variance: number;
        readonly type: DistributionType;
        random(): number;
    }
    class ExponentialDistribution implements Distribution {
        private _rng01;
        private _min;
        private _max;
        private _mean;
        private _variance;
        private _type;
        constructor(rng01: () => number, lambda: number);
        readonly min: number;
        readonly max: number;
        readonly mean: number;
        readonly variance: number;
        readonly type: DistributionType;
        random(): number;
    }
    class LogNormalDistribution implements Distribution {
        private _rng11;
        private _min;
        private _max;
        private _mean;
        private _variance;
        private _type;
        private _nf;
        constructor(rng11: () => number, mu: number, sigma: number);
        readonly min: number;
        readonly max: number;
        readonly mean: number;
        readonly variance: number;
        readonly type: DistributionType;
        random(): number;
    }
    class PoissonDistribution implements Distribution {
        private _rng01;
        private _min;
        private _max;
        private _mean;
        private _variance;
        private _type;
        private _L;
        constructor(rng01: () => number, lambda: number);
        readonly min: number;
        readonly max: number;
        readonly mean: number;
        readonly variance: number;
        readonly type: DistributionType;
        random(): number;
    }
}
