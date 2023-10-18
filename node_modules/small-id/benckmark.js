#!/usr/bin/env node
'use strict';

const Benchmark = require('benchmark').Benchmark;
const Suite = Benchmark.Suite;

const suite = new Suite();

const idgen = require('idgen');
const uniqueId = require('unique-id');
const uniqueString = require('unique-string');

const smallId = require('./');

Benchmark.options.minSamples = 100;

suite.add('idgen(9)', () => {
  idgen(9);
});

suite.add('uniqueId(9)', () => {
  uniqueId(9);
});

suite.add('uniqueString(9)', () => {
  uniqueString(9);
});

suite.add('smallId()', () => {
  smallId();
});

suite.on('cycle', (event) => {
  console.log(String(event.target));
});

suite.run({
  queued: true,
  async: true
});