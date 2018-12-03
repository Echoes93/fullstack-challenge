# Full-Stack code challenge for Pipedrive
[![Build Status](https://travis-ci.com/Echoes93/fullstack-challenge.svg?branch=master)](https://travis-ci.com/Echoes93/fullstack-challenge)

Application demo is available at [echoes93.com](https://echoes93.com), with API server at [api.echoes93.com](https://api.echoes93.com). Please, take in note that imported data is stored in memory, which is limited to 480MB. Uploading 10MB file is just enough to send API service down with *out of memory* exception. It will be restarted after by docker-compose restart policy. I've tried 1GB instance, but for some reason, behaviour differs there, and instead of sending down service which exceeds memory consumption - it just hangs all connections at 95% mem usage. No idea yet, why does this happen, since both instances are created with the exact same boot script.


## Requirements
 - Any docker-compose v3 compatible version of docker.
 - Node 8+ for local non-docker installation.

## Disclaimer
This is a poor-man's take on simulating development-production pipeline, involving microservices and docker containers behind reverse-proxy. Also, I wanted to avoid unnecessary overengineering, like staging or build servers, load balancers, orchestration frameworks and other DevOps dedicated stuff. Whole application is hosted on cheapest and most trusted VPS service I know - Lightsail AWS, with 500MB RAM, 1vCPU, Ubuntu and for $3,5 of 30-days uptime. If you know better options (key resource is RAM) and, optionally, including 3rd level domain name + TLS, like Heroku does - please, inform me. 😅 

Usually I consider using Heroku, because it is just fine for hosting demo apps, but in this particular case I wanted to use VPS + docker-compose. Heroku container service didn't fit my case, because it is for hosting just 1 container, without docker-compose. I also could go with "docker in docker" approach to enable my docker-compose on Heroku services, but I doubt that this would work well on free dynos.

Main goal was to enable easy, fast and often deployment, preserving as much resources as its possible. React is definitely an overkill, but I wanted to show an example of using React or any other modern spa framework/library as separate API consuming microservice.

## CI/CD
First considered option was to use [Jenkins](https://jenkins.io/), but the smallest docker image is ~170MB in size, and my 500MB RAM VPS ran out of memory during just Jenkins setup (plugin installation stage). The logical solution is to use external CI service, where [Travis](https://travis-ci.com/) shines in free tier. 

Given that it is monorepo, I also wanted to separate client and server build jobs, with 2 ways coming to mind:
 - Determine by watching changes in specific subfolders, server or client respectively;
 - Determine by commit message, which clearly indicates which job to run;

First approach requires introduction of external build script with rather complex logic, whereas second approach has built-in support in form of [Travis conditions](https://docs.travis-ci.com/user/conditions-v1), particulary `commit_message` variable.

The second option was chosen. When commit message contains `FE` (case sensitive) it sets `ROOT_FOLDER` environment variable to "client" folder, which is used in further build and test pipeline. For `BE` it sets and uses "server" folder. For commit messages containing both `BE` and `FE` it will run two separate jobs respectively.

```
jobs:
  include:
  - name: Client Pipeline
    if: commit_message ~= /\bFE\b/ 
    env: ROOT_FOLDER=client IMAGE_REPO=echoes93/csv-client
  - name: Server Pipeline
    if: commit_message ~= /\bBE\b/ 
    env: ROOT_FOLDER=server IMAGE_REPO=echoes93/csv-server
```

If testing stage succeeds (exit code 0) - Travis will run docker build command and push image to public docker hub repository. It also could be private repository anywhere, but wheren't necessary in my case.


My goal was to create minimal settings installation for production server. In fact it only requires docker-compose v3 compatible docker, and empty "acme.json" file with non-sudo read/write access for TLS support. Production docker-compose file has 4 services, including: 

 - [Traefik](https://traefik.io/) - reverse proxy;
 - [Watchtower](https://github.com/v2tec/watchtower) - watches original images and performs hot image swap, if one updated;
 - [echoes93/client](https://hub.docker.com/r/echoes93/csv-client/) - static server for client;
 - [echoes93/server](https://hub.docker.com/r/echoes93/csv-server/) - API server;

### Weak points
Given that API server holds data at runtime, rather than in external db or on disk - such hot image swap would destroy all imported data.

## Backend
This is a basic [Express](https://expressjs.com/) server, with only 2 exposed routes:
 - POST "/search", accepts { query: string, limit: number } body. Default values are: { query: "", limit: 20 };
 - POST "/import", accepts Content-Type: "multipart/form-data" with boundary. File must have ".csv" extension;

Incoming file is parsed as buffer stream, with the result that each row maped to Array of Strings. Thus, result of parsing 10MB file will take ~200MB of memory, and boxing those arrays into objects would take even more. Given that, I decided to stay with string arrays.

Data is stored in state container which is created via ES5 style `StateContainer` constructor function. I am not a big fan of constructor functions and `new` keyword in particular, but this is the only built-in straight solution (apart from classes, which are the same thing with even more overhead) for performing runtime complex types checks. 

There is also an option of implementing StateContainer as module level object with exposed access methods to it via `module.exports`, though this will couple it to runtime and will not allow creation of multiple containers, leading to poor testability of codebase.

Considering that StateContainer is only limited to ram, there is a necessity of enabling Stream-like interaction with it, to avoid memory leaks and long-execution blocking. This is done via [Highland.js](https://github.com/caolan/highland), which allows to lazily traverse through state collection, with the ability to pause, resume and abort this process. Thus it takes only N (set by limit) entries, filtered by given query, and returns results as soon as `take` stage is fulfilled. And since it is async operation - result is wrapped in promise.

```
search = (query = "", limit = 20) => 
  H(state)
    .filter(applyFilter(query))
    .take(limit)
    .collect()
    .toPromise(Promise);
```

### Weak points
As data comes into parsing stage as buffer stream - it is possible to parse any type of file, even not csv. There is a kind of guard on import route, which checks if file extension matches .csv, but it still lets any file with renamed extension to ".csv" to come in and be parsed. Parser would interpret buffer values as utf-8 codepoints, and will assemble same structure as for valid data - Array of Strings, whereas those strings would not make any sense and will remain as nonsense trash in StateContainer. The possible solution is to intruduce kind of lexer stage, which will analize raw data, and filter out those which goes out of valid codepoints bounds. Though, it still will let in any other text data, such xml or txt. 

## Front-end
Uses [React 16](https://reactjs.org/) as view library, [Redux](https://redux.js.org/) for data management and [Redux-Observable](https://redux-observable.js.org/) for async operations. I am an apologist of stateless functional components, which are more predictable, easier to test and allows to create any kind of complex views. In case of necessity of component lifecycle hooks - there are number of solutions for functional components, like: 
 - [Recompose](https://github.com/acdlite/recompose);
 - [React Hooks](https://reactjs.org/docs/hooks-intro.html); 
 
Latter is part of official React distribution now and obsoletes other libraries. Functional components are also more handy when it comes to decomposing components to more 'atomic' kinds. Also, performance-wise, in combination with `connect` from [react-redux](https://github.com/reduxjs/react-redux), at the moment, they are very same as Reacts [PureComponent](https://reactjs.org/docs/react-api.html#reactpurecomponent), and React dev team promises 30-40% performance boost for functional components in further React releases.

### Weak points
I've used [React Autosuggest](https://github.com/moroshko/react-autosuggest) library for form-completion, and it seems broken in case, when user tries to navigate through suggestions list using arrow keys. There are number of open issues on github, though, it is most likely due to managing form value in state store, rather than in local state, and as soon as its value changes - suggestions in state store and library managed inner state become desynchronized. Though this bug isn't 100% reproducible, and I haven't figured exact case yet. 
