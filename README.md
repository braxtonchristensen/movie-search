# Movie Search
I decided to keep the client separate from the server mainly because, I think most of the time you
want something in front of node to load balance and having that also ship the static assets works
out well (like nginx). Also if we decided we didn't want to go that route it should be pretty easy
to serve up the static assets from node.

Since we would probably want to maintain them separately they each have a package.json in hind site
it would have been a good idea to use yarn workspaces.

## Quick Start
To set up the project the following command will install the proper dependencies for both the
client and the server.
```
yarn setup
```
To run the project
```
yarn start
```
if you have redis installed on your machine locally you can get
data caching (this is not required to run the project)
```
redis-server
```
after looking at a few items (movies/actors)
check the cache
```
redis-cli KEYS *
```

## Testing
To test the server
```
yarn test
```
To test the client
```
yarn test-client
```
For manual/visual testing of the client
```
yarn storybook
```

## The Tech
* Express - because it's unopinionated, minimalist, and fast to setup.
* Redis - data caching for MovieDetails/PersonDetails (I couldn't think of a good way to cache searches 😟)
* Typescript - because of the community.
* React - because 😍
* GraphQL - because 😍
* Storybook - for isolated component development.
* plop.js - useful to automate frequently repeated code.

## Retrospective
In all reality adding plog.js and storybooks was probably overkill for this project
but I decided to do it because there is a chance 🤞 that I will be revisiting this project.

I didn't return connections or add cursors to any of the data models (follow the relay spec)
this was mainly for times sake also might have been another overkill complexity.

Spent some extra time in infrastructure of the project when it might have been a better use of my
time to improve typings/add more unit tests.

There is a little bit of repeated code that could have probably been extracted out shared between
components.

