(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
    var ProbTS;
    (function (ProbTS) {
        class Prob {
            /**
             * @param {() => number} rng A function generating numbers randomly within [0, 1) with a uniform distribution
             */
            constructor(rng = Math.random) {
                this._rng01 = rng;
                this._rng11 = () => {
                    // inspired by https://github.com/ckknight/random-js/blob/master/lib/random.js#L50
                    return ((rng() * 0x100000000) | 0) / 0x100000000 * 2;
                };
            }
            uniform(min = 0, max = 1) {
                return new UniformDistribution(this._rng01, min, max);
            }
            normal(mean = 0, sd = 1) {
                return new NormalDistribution(this._rng11, mean, sd);
            }
            exponential(lambda = 1) {
                return new ExponentialDistribution(this._rng01, lambda);
            }
            logNormal(mu = 0, sigma = 1) {
                return new LogNormalDistribution(this._rng11, mu, sigma);
            }
            poisson(lambda = 1) {
                return new PoissonDistribution(this._rng01, lambda);
            }
        }
        ProbTS.Prob = Prob;
        let DistributionType;
        (function (DistributionType) {
            DistributionType[DistributionType["Unknown"] = 0] = "Unknown";
            DistributionType[DistributionType["Continuous"] = 1] = "Continuous";
            DistributionType[DistributionType["Discrete"] = 2] = "Discrete";
        })(DistributionType = ProbTS.DistributionType || (ProbTS.DistributionType = {}));
        class UniformDistribution {
            constructor(rng01, min, max) {
                this._rng01 = rng01;
                this._min = min;
                this._max = max;
                this._range = (max - min);
                this._mean = min + this._range / 2;
                this._variance = ((max - min) * (max - min)) / 12;
                this._type = DistributionType.Continuous;
            }
            get min() {
                return this._min;
            }
            get max() {
                return this._max;
            }
            get mean() {
                return this._mean;
            }
            get variance() {
                return this._variance;
            }
            get type() {
                return this._type;
            }
            random() {
                return this._min + this._rng01() * this._range;
            }
        }
        ProbTS.UniformDistribution = UniformDistribution;
        class NormalDistribution {
            constructor(rng11, mean, sd) {
                this._rng11 = rng11;
                this._min = Number.NEGATIVE_INFINITY;
                this._max = Number.POSITIVE_INFINITY;
                this._mean = mean;
                this._sd = sd;
                this._variance = sd * sd;
                this._type = DistributionType.Continuous;
                this._y1 = null;
                this._y2 = null;
            }
            get min() {
                return this._min;
            }
            get max() {
                return this._max;
            }
            get mean() {
                return this._mean;
            }
            get variance() {
                return this._variance;
            }
            get type() {
                return this._type;
            }
            random() {
                let x1;
                let x2;
                let w;
                if (this._y2 !== null) {
                    this._y1 = this._y2;
                    this._y2 = null;
                    return this._y1 * this._sd + this._mean;
                }
                do {
                    x1 = this._rng11();
                    x2 = this._rng11();
                    w = x1 * x1 + x2 * x2;
                } while (w >= 1.0 || w === 0.0);
                w = Math.sqrt((-2.0 * Math.log(w)) / w);
                this._y1 = x1 * w;
                this._y2 = x2 * w;
                return this._y1 * this._sd + this._mean;
            }
        }
        ProbTS.NormalDistribution = NormalDistribution;
        class ExponentialDistribution {
            constructor(rng01, lambda) {
                this._rng01 = rng01;
                this._min = 0;
                this._max = Number.POSITIVE_INFINITY;
                this._mean = 1 / lambda;
                this._variance = Math.pow(lambda, -2);
                this._type = DistributionType.Continuous;
            }
            get min() {
                return this._min;
            }
            get max() {
                return this._max;
            }
            get mean() {
                return this._mean;
            }
            get variance() {
                return this._variance;
            }
            get type() {
                return this._type;
            }
            random() {
                return -1 * Math.log(this._rng01()) * this._mean;
            }
        }
        ProbTS.ExponentialDistribution = ExponentialDistribution;
        class LogNormalDistribution {
            constructor(rng11, mu, sigma) {
                this._rng11 = rng11;
                this._min = 0;
                this._max = Number.POSITIVE_INFINITY;
                this._mean = Math.exp(mu + ((sigma * sigma) / 2));
                this._variance = (Math.exp(sigma * sigma) - 1) * Math.exp(2 * mu + sigma * sigma);
                this._type = DistributionType.Continuous;
                this._nf = new NormalDistribution(rng11, mu, sigma);
            }
            get min() {
                return this._min;
            }
            get max() {
                return this._max;
            }
            get mean() {
                return this._mean;
            }
            get variance() {
                return this._variance;
            }
            get type() {
                return this._type;
            }
            random() {
                return Math.exp(this._nf.random());
            }
        }
        ProbTS.LogNormalDistribution = LogNormalDistribution;
        class PoissonDistribution {
            constructor(rng01, lambda) {
                this._rng01 = rng01;
                this._min = 0;
                this._max = Number.POSITIVE_INFINITY;
                this._mean = lambda;
                this._variance = lambda;
                this._type = DistributionType.Discrete;
                // Knuth's algorithm
                this._L = Math.exp(-lambda);
            }
            get min() {
                return this._min;
            }
            get max() {
                return this._max;
            }
            get mean() {
                return this._mean;
            }
            get variance() {
                return this._variance;
            }
            get type() {
                return this._type;
            }
            random() {
                let k = 0;
                let p = 1;
                while (true) {
                    // FIXME This should be [0,1] not [0,1)
                    p = p * this._rng01();
                    if (p <= this._L) {
                        break;
                    }
                    k++;
                }
                return k;
            }
        }
        ProbTS.PoissonDistribution = PoissonDistribution;
    })(ProbTS = exports.ProbTS || (exports.ProbTS = {}));
});
