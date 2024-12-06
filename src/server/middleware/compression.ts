import compression from 'compression'
import { defineEventHandler } from 'h3'

export default defineEventHandler((event) => {
  const res = event.node.res
  const req = event.node.req

  // @note text/htmlのみ圧縮適用する
  if (req.headers['accept']?.includes('text/html')) {
    res.setHeader('Cache-Control', 'public, max-age=900')
    compression()(req, res, () => {})
  }
})
