# ToDo List

The ToDo list is implemented as a simple VueJs/Typescript app and [deployed on firebase](https://todo.moritz.dev).

ToDos are saved locally as a stringified Object in the browser's local storage.
ToDos that are explicitly marked as done are not shown in the list while ToDo's that have been removed are actually deleted from the list.

## Local Setup
- Node (version >= v14.15.4) and npm are required.

- run `npm install` in src/ directory

- run `npm run serve` to start a local server and visit [http://localhost:8080/](http://localhost:8080/)
