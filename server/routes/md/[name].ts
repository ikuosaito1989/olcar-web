import { defineEventHandler } from 'h3'
import * as path from 'node:path'
import * as fs from 'node:fs'

export default defineEventHandler(async (event) => {
  const filePath = path.join(
    process.cwd(),
    'src',
    'assets',
    'md',
    `${event.context.params.name}.md`,
  )

  if (!(await fs.existsSync(filePath))) {
    return null
  }

  return await fs.readFileSync(filePath, { encoding: 'utf8' })
})
