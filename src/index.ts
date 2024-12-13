import * as babel from "@babel/core"
import * as fs from "fs"
import * as path from "path"
import { gzip } from "pako"
import chalk from "chalk"
import ora, { oraPromise } from "ora"

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
        sourceMaps: true, // Generate source maps
      })

      if (!result || !result.code) {
        throw new Error("Failed to compile with Babel")
      }

      const sanitizedCode = result.code.slice(1, -2)
      return btoa(String.fromCharCode.apply(null, [...gzip(sanitizedCode)]))
    })
  )

  oraPromise(transpilePromise, {
    text: "Transpiling code with Babel",
    successText: `Code transpiled in ${(performance.now() - start).toFixed(
      3
    )}ms`,
  })

  return (await transpilePromise).filter(Boolean)
}

console.log(await compileFolderWithBabel("./code"))
