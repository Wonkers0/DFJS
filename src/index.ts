import * as babel from "@babel/core"
import * as fs from "fs"
import * as path from "path"
import { gzip } from "pako"
import chalk from "chalk"
import ora, { oraPromise } from "ora"
import { flags } from "./util"
import { exit } from "process"

const compileFolderWithBabel = async (folder: string) => {
  console.log(
    chalk.blueBright(`
    8888888b.  8888888888 888888  .d8888b.  
    888  "Y88b 888          "88b d88P  Y88b 
    888    888 888           888 Y88b.      
    888    888 8888888       888  "Y888b.   
    888    888 888           888     "Y88b. 
    888    888 888           888       "888 
    888  .d88P 888           88P Y88b  d88P 
    8888888P"  888           888  "Y8888P"  
                          .d88P            
                        .d88P"             
                        888P"
    `)
  )

  const start = performance.now()
  // Read the input file
  const transpilePromise = Promise.all(
    fs.readdirSync(folder).map(async (file) => {
      const filePath = path.join(folder, file)
      if (!fs.lstatSync(filePath).isFile()) return
      const inputCode = fs.readFileSync(filePath, "utf-8")

      // Compile the code with Babel
      const result = await babel.transformAsync(inputCode, {
        filename: path.basename(filePath),
        sourceMaps: true,
      })

      if (!result || !result.code) {
        throw new Error("Failed to compile with Babel")
      }

      // Remove semi-colon at the end of the code and parse the babel string to an array
      const parsedArray = JSON.parse(result.code.slice(0, -1))

      return parsedArray.flatMap((thread: any) =>
        thread.map((o: any) =>
          btoa(String.fromCharCode.apply(null, [...gzip(JSON.stringify(o))]))
        )
      )
    })
  )

  oraPromise(transpilePromise, {
    text: "Transpiling code with Babel",
    successText: `Code transpiled in ${(performance.now() - start).toFixed(
      3
    )}ms`,
    failText: "Could not transpile code",
  })

  return (await transpilePromise).flat().filter(Boolean)
}

const templates = await compileFolderWithBabel("./code")
if (!flags.codeclient || flags.debug) {
  console.log(templates)
  exit(0)
}
const ws = new WebSocket("ws://localhost:31375/ws")

ws.onopen = () => ws.send("scopes write_code clear_plot")

ws.onmessage = (event) => {
  if (event.data !== "auth") return

  ws.send("clear")

  templates.forEach((template) => ws.send(`place ${template}`))

  ws.send("place go")
  setTimeout(() => ws.close(), 1000)
}
