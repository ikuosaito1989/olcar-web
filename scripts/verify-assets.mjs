/* eslint-disable no-console -- ビルド時に結果を出力するスクリプトのため */
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { extname, join } from 'node:path'

const TARGET_DIR = '.output/public'
const TARGET_EXTENSIONS = new Set(['.js', '.mjs', '.css', '.json'])

/**
 * 検査対象のファイルを再帰的に集める
 * @param dir
 */
const collect = (dir) => {
  const files = []
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...collect(path))
      continue
    }

    if (TARGET_EXTENSIONS.has(extname(entry.name))) {
      files.push(path)
    }
  }

  return files
}

/**
 * ビルド成果物が壊れていないかを検査する
 *
 * Bun ランタイムでビルドすると JS チャンクが NUL 埋めのまま出力されることがあり、
 * ブラウザで `SyntaxError: Invalid or unexpected token` になる。
 * デプロイしてから気づけないため、ビルド直後に検知して失敗させる。
 */
const main = () => {
  const files = collect(TARGET_DIR)
  const broken = files.filter((file) => {
    const { size } = statSync(file)
    if (!size) {
      return true
    }

    return readFileSync(file).every((byte) => byte === 0)
  })

  if (broken.length) {
    console.error(`ビルド成果物が壊れています (${broken.length}件):`)
    broken.forEach((file) => console.error(`  - ${file}`))
    process.exit(1)
  }

  console.log(`ビルド成果物を検証しました (${files.length}件)`)
}

main()
