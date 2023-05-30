const fs = require("fs")
const babel = require("@babel/core")

const filename = "sample.dfjs" // Specify the input JavaScript file
const outputFilename = "output.json" // Specify the output JSON file

// Read the input JavaScript file
const inputCode = fs.readFileSync(filename, "utf8")

// Parse the JavaScript code to generate the AST
const ast = babel.parseSync(inputCode, {
  sourceType: "module",
  plugins: ["@babel/plugin-syntax-typescript"], // Add any necessary plugins for your code
})

// Convert the AST to JSON
const astJson = JSON.stringify(ast, null, 2)

// Write the AST JSON to a file
fs.writeFileSync(outputFilename, astJson, "utf8")

console.log(`AST written to ${outputFilename}`)
