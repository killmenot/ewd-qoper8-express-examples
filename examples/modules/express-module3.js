/*

 ----------------------------------------------------------------------------
 | ewd-qoper8: Node.js Queue and Multi-process Manager                      |
 |                                                                          |
 | Copyright (c) 2016 M/Gateway Developments Ltd,                           |
 | Reigate, Surrey UK.                                                      |
 | All rights reserved.                                                     |
 |                                                                          |
 | http://www.mgateway.com                                                  |
 | Email: rtweed@mgateway.com                                               |
 |                                                                          |
 |                                                                          |
 | Licensed under the Apache License, Version 2.0 (the "License");          |
 | you may not use this file except in compliance with the License.         |
 | You may obtain a copy of the License at                                  |
 |                                                                          |
 |     http://www.apache.org/licenses/LICENSE-2.0                           |
 |                                                                          |
 | Unless required by applicable law or agreed to in writing, software      |
 | distributed under the License is distributed on an "AS IS" BASIS,        |
 | WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. |
 | See the License for the specific language governing permissions and      |
 |  limitations under the License.                                          |
 ----------------------------------------------------------------------------

  1 March 2016

*/

'use strict';

module.exports = function () {

  this.on('message', function (messageObj, send, finished) {
    var results;

    if (messageObj.path === '/qoper8/pass') {
      results = {
        youSent: messageObj,
        workerSent: 'hello from worker ' + process.pid,
        time: new Date().toString()
      };
      finished(results);
      return;
    }

    if (messageObj.path === '/qoper8/fail') {
      results = {
        error: 'An error occurred!',
        status: {code: 403}
      };
      finished(results);
      return;
    }

    this.emit('unknownMessage', messageObj, send, finished);
  });

};
