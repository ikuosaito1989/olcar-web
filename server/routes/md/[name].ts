import { defineEventHandler } from 'h3'
import * as path from 'node:path'
import { promises as fs } from 'node:fs'

export default defineEventHandler(async (event) => {
  const name = event.context.params.name
  // path traversal防止: ファイル名として許可する文字のみ受け付ける
  if (!/^[a-zA-Z0-9-_]+$/.test(name)) {
    return null
  }

  const filePath = path.join(process.cwd(), 'app', 'assets', 'md', `${name}.md`)

  try {
    await fs.access(filePath)
  }
  catch {
    return null
  }

  return await fs.readFile(filePath, { encoding: 'utf8' })
})
