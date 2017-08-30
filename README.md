Prob.ts
=======
A TypeScript port of [prob.js](https://github.com/bramp/prob.js) by [Andrew Brampton](https://bramp.net).

Generates random numbers from the following probability distributions:

 - Uniform distribution
 - Normal distribution
 - Exponential distribution
 - Log-normal distribution

Usage
-----

Install the package through the method of your choice, e.g. `npm install prob.js`

Instantiate `Prob`, optionally passing in a random number generator:

```javascript
const prob = new ProbTS.Prob();      // defaults to Math.random
```

### Generating distribution models

Generate a random value from a uniform distribution with _min = 0_ and _max = 1_:

```javascript
const uniform = prob.uniform(0, 1);
const value = uniform.random();
```

Generate a random value from a normal distribution with _μ = 0_ and _σ = 1_:

```javascript
const normal = prob.normal(0, 1);
const value = normal.random();
```

Generate a random value from an exponential distribution with _λ = 1_:

```javascript
const exponential = prob.exponential(1);
const value = exponential.random();
```

Generate a random value from an log-normal distribution with _μ = 0_ and _σ = 1_:

```javascript
const logNormal = prob.logNormal(0, 1);
const value = logNormal.random();
```

Generate a random value from an Poisson distribution with _λ = 1_:

```javascript
const poisson = prob.poisson(1);
const value = poisson.random();
```

API
---

The following distributions are available:

```javascript
prob.uniform(min, max); // Uniform distribution in range [min, max).
prob.normal(μ, σ);      // Normal distribution with mean and standard deviation.
prob.exponential(λ);    // Exponential distribution with lambda.
prob.logNormal(μ, σ);   // Log-normal distribution defined as ln(normal(μ, σ)).
prob.poisson(λ);        // Poisson distribution returning integers >= 0.
```

After generating a distribution, the following methods are available:

```javascript
const r = prob.exponential(1); // Create a distribution.
r.random();   // Generates a number within the distribution.
r.min;        // The min random number which could be returned by `r()` (inclusive).
r.max;        // The max random number which could be returned by `r()` (exclusive).
r.mean;       // The expected mean for this distribution.
r.variance;   // The expected variance for this distribution.
```

Credit
------

This package is identical to [prob.js](https://github.com/bramp/prob.js) by [Andrew Brampton](https://bramp.net) with 
the following differences:

 - Zipf distribution was removed as it was not completely implemented.
 - Compiles to plain ES6 an can be loaded using UMD. No assumptions about the run-time environment are made.
 - Expects only a `[0, 1)` random number generator as input (defaults to `Math.random`) .

To-do
-----

 - Poisson distribution should pick from a `[0,1]` not `[0,1)` interval
 - Add more distributions
    - Zipf
    - Pareto
    - Weibull

Licence (Apache 2)
------------------
This is not an official Google product (experimental or otherwise), it is just code that happens to be owned by Google.

```
Copyright 2016 Google Inc. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```
