![DFJS](https://github.com/user-attachments/assets/b51d2dd9-07c5-4d5d-b311-c61e16b23216)

# Javascript to DF compiler

This is a babel plugin for compiling javascript code to a DF template.

There is some special syntax, as it uses type annotations to specify variable scope.

To use, make a new project and run:

```sh
git clone https://github.com/Wonkers0/DFJS.git
cd ./DFJS
bun i
mkdir code
touch ./code/main.dfjs
# Write your code in main.dfjs...
bun transpile
```

Example:

```javascript
function Join(): PlayerEvent {
  const exampleVariable: Game = "hello"
}
```

```json
{
  "blocks": [
    {
      "id": "block",
      "block": "event",
      "args": {
        "items": []
      },
      "action": "Join"
    },
    {
      "id": "block",
      "block": "set_var",
      "args": {
        "items": [
          {
            "item": {
              "data": {
                "name": "exampleVariable",
                "scope": "unsaved"
              },
              "id": "var"
            },
            "slot": 0
          },
          {
            "item": {
              "data": {
                "name": "hello"
              },
              "id": "txt"
            },
            "slot": 1
          }
        ]
      },
      "action": "="
    }
  ]
}
```

## Contributing

Source code is in the `src` directory

Make sure you use the `--debug` flag:

```sh
bun transpile --debug
```

If you've never used babel before, I recommend the following websites:

- https://github.com/jamiebuilds/babel-handbook/blob/master/translations/en/plugin-handbook.md - The Babel Plugin Docs
- https://astexplorer.net/ - For viewing abstract syntax trees
