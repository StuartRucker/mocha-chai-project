// Copyright 2020 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

var Parser = require('tap-parser');
const fetch = require('node-fetch');
const fs = require('fs');
const core = require('@actions/core');
const github = require('@actions/github');
const path = require("path");

try {
  // `who-to-greet` input defined in action metadata file
  // const nameToGreet = core.getInput('who-to-greet');
  // console.log(`Hello ${nameToGreet}!`);
  const time = (new Date()).toTimeString();
  core.setOutput("time", time);

  var data = [];
  var p = new Parser();
  p.on('result', function(assert){
      data.push(JSON.stringify(assert));
  });
  p.on('complete',function(results){
      var sendMe = JSON.stringify({summary: results, data: data});
      
      fetch('https://ptsv2.com/t/sgsey-1592237741/post', { method: 'POST', body: sendMe })
      .then(res => console.log(res)) // expecting a json response
  })
  fs.createReadStream(path.resolve(__dirname, '../../flaky-tap-log.tap')).pipe(p);
  
} catch (error) {
  core.setFailed(error.message);
}
