# Javascript to DF compiler

This is a babel plugin for compiling javascript code to a DF template
There is some special syntax, and it does not work with typescript, as it uses type annotations to specify variable scope.

Example:

```javascript
function Join(): PlayerEvent {
  const exampleVariable: Game = "hello"
}
```

```json
{
  "blocks": [{
    "id": "block",
    "block": "event",
    "args": {
      "items": []
    },
    "action": "Join"
  }, {
    "id": "block",
    "block": "set_var",
    "args": {
      "items": [{
        "item": {
          "data": {
            "name": "exampleVariable",
            "scope": "unsaved"
          },
          "id": "var"
        },
        "slot": 0
      }, {
        "item": {
          "data": {
            "name": "hello"
          },
          "id": "txt"
        },
        "slot": 1
      }]
    },
    "action": "="
  }]
}
```

If you wish to help, make a new project and run:
`git clone https://github.com/Wonkers0/DFJS.git`
`cd ./DFJS`
`npm i`
`npx babel ./sample.dfjs`

Source code is in `index.js`

If you've never used babel before, I recommend the following websites:

- https://github.com/jamiebuilds/babel-handbook/blob/master/translations/en/plugin-handbook.md - The Babel Plugin Docs
- https://astexplorer.net/ - For viewing abstract syntax trees
