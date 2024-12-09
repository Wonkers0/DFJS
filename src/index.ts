import * as babel from "@babel/core"
import * as fs from "fs"
import * as path from "path"
import { gzip } from "pako"

const compileFolderWithBabel = async (folder: string) => {
  // Read the input file
  return (
    await Promise.all(
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
  ).filter(Boolean)
}

console.log(await compileFolderWithBabel("./code"))
