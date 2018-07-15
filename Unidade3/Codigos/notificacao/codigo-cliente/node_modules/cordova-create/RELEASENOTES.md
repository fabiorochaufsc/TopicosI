<!--
#
# Licensed to the Apache Software Foundation (ASF) under one
# or more contributor license agreements.  See the NOTICE file
# distributed with this work for additional information
# regarding copyright ownership.  The ASF licenses this file
# to you under the Apache License, Version 2.0 (the
# "License"); you may not use this file except in compliance
# with the License.  You may obtain a copy of the License at
#
# http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing,
# software distributed under the License is distributed on an
# "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
#  KIND, either express or implied.  See the License for the
# specific language governing permissions and limitations
# under the License.
#
-->
# Cordova-create Release Notes

### 1.1.2 (Dec 14, 2017)
* [CB-12807](https://issues.apache.org/jira/browse/CB-12807): updated error message to follow the template guide
* [CB-13674](https://issues.apache.org/jira/browse/CB-13674): updated deps
* [CB-13501](https://issues.apache.org/jira/browse/CB-13501): added support for node 8 to tests

### 1.1.1 (May 08, 2017)
* [CB-12765](https://issues.apache.org/jira/browse/CB-12765) default app `cordova-app-hello-world` is now treated like a template

### 1.1.0 (May 02, 2017)
* [CB-10681](https://issues.apache.org/jira/browse/CB-10681) templates will add `@latest` when fetching from npm when no version is specified. This will ensure an older cahced version of the template is not used
* [CB-12666](https://issues.apache.org/jira/browse/CB-12666) - Remove `node 0.x` support.
* [CB-12517](https://issues.apache.org/jira/browse/CB-12517): `package.json` `displayname` should equal `config.xml` name feild and `package.json` `name` feild should equal `config.xml` `id` feild.

### 1.0.2 (Jan 17, 2017)
* change event from `warn` to `verbose`
* Add github pull request template

### 1.0.1 (Sep 29, 2016)
* removed stripping eventlisteners

### 1.0.0 (August 23, 2016)
* [CB-11623](https://issues.apache.org/jira/browse/CB-11623) added symlinking option
* fixed jasmine custom matcher for `toExist`
* updated jasmine dep, fixed caching issue with tests
* added `travis` and `appveyor` support
* version 1.0.0 for **npm**
