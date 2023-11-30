import * as crypto from "crypto"
import path from "path"
import fs from "fs"
import { getWebpageContentText } from "./fetch"

async function main() {
  // make dir if not exists
  const dir = path.join(__dirname, "../output")
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
  }

  const urls = [
    "https://twitter.com/fukusta343/status/1694547984195998127",
    "https://www.instagram.com/p/C0JA5PARfyP/?utm_source=ig_web_copy_link",
    "https://www.youtube.com/watch?v=_uGPnYPKru8",
    "https://www.bosotokyo.com/",
    "https://cloud.google.com/vertex-ai/pricing?hl=ja",
    "https://platform.openai.com/docs/guides/vision",
    "https://gyosei-shiken.net/index.php?%E3%83%87%E3%82%B8%E3%82%BF%E3%83%AB%E5%85%AD%E6%B3%95%E5%85%A8%E6%9B%B8",
  ]

  // make a sha256 hash of the url
  for (const url of urls) {
    console.log(url)
    const hash = crypto.createHash("sha256")
    hash.update(url)
    const h = hash.digest("hex")
    const file = path.join(dir, `${h}.txt`)

    try {
      const content = await getWebpageContentText(url, 100000)
      fs.writeFileSync(file, content.title + "" + "\n\n" + content.text)
    } catch (e) {
      console.log("error")
      if (e instanceof Error) {
        fs.writeFileSync(file, e.toString())
      }
    }
    console.log(`Saved to ${h}`)
    console.log()
    console.log()
  }
}


main()