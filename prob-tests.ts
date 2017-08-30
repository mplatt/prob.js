import {expect} from "chai";
import {ProbTS} from "./prob";

describe("Number generator", () => {
	const Prob = new ProbTS.Prob();

	describe("with uniform distribution", () => {
		const uniform = Prob.uniform(1, 3);

		it("has correct min/max", () => {
			assertMinMax(uniform, 1, 3);
		});

		it("has correct estimators", () => {
			assertEstimators(uniform, 2, 1 / 3);
		});

		it("generates appropriate random numbers", () => {
			assertResults(uniform);
		});
	});

	describe("with normal distribution", () => {
		const normal = Prob.normal(2, 3);

		it("has correct min/max", () => {
			assertMinMax(normal, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);
		});

		it("has correct estimators", () => {
			assertEstimators(normal, 2, 9);
		});

		it("generates appropriate random numbers", () => {
			assertResults(normal);
		});
	});

	describe("with exponential distribution", () => {
		const exponential = Prob.exponential(3 / 2);

		it("has correct min/max", () => {
			assertMinMax(exponential, 0, Number.POSITIVE_INFINITY);
		});

		it("has correct estimators", () => {
			assertEstimators(exponential, 2 / 3, 4 / 9);
		});

		it("generates appropriate random numbers", () => {
			assertResults(exponential);
		});
	});

	describe("with log-normal distribution", () => {
		const logNormal = Prob.logNormal(0, 0.5);

		it("has correct min/max", () => {
			assertMinMax(logNormal, 0, Number.POSITIVE_INFINITY);
		});

		it("has correct estimators", () => {
			const expectedMean = Math.exp(0.125);
			const expectedVariance = (Math.exp(0.25) - 1) * Math.exp(0.25);

			assertEstimators(logNormal, expectedMean, expectedVariance);
		});

		it("generates appropriate random numbers", () => {
			assertResults(logNormal);
		});
	});

	describe("with poisson distribution", () => {
		const poisson = Prob.poisson(2);

		it("has correct min/max", () => {
			assertMinMax(poisson, 0, Number.POSITIVE_INFINITY);
		});

		it("has correct estimators", () => {
			assertEstimators(poisson, 2, 2);
		});

		it("generates appropriate random numbers", () => {
			assertResults(poisson);
		});
	});

	function assertMinMax(distribution: ProbTS.Distribution, expectedMin: number, expectedMax: number) {
		expect(distribution.min).to.equal(expectedMin);
		expect(distribution.max).to.equal(expectedMax);
	}

	function assertEstimators(distribution: ProbTS.Distribution, expectedMean: number, expectedVariance: number) {
		expect(distribution.mean).to.equal(expectedMean);
		expect(distribution.variance).to.equal(expectedVariance);
	}

	function assertResults(distribution: ProbTS.Distribution) {
		const trials = 1000000;
		const meanError = 10000 / trials;
		const varianceError = 100000 / trials;

		let sum = 0;
		let sum2 = 0;

		for (let i = 0; i < trials; i++) {
			const value = distribution.random();
			sum += value;
			sum2 += value * value;

			expect(value).to.be.at.least(distribution.min);
			expect(value).to.be.below(distribution.max);
		}

		const mean = sum / trials;
		const variance = (sum2 - (sum * sum) / trials) / trials;

		expect(mean).to.be.closeTo(distribution.mean, meanError);
		expect(variance).to.be.closeTo(distribution.variance, varianceError);
	}
});

