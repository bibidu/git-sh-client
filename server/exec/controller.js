const router = require('koa-router')()
const service = require('./service')

router.get('/exec', (ctx, next) => {
  ctx.body = {
    success: true,
    data: service.exec(ctx.query).split('\n').filter(Boolean),
    timestamp: Date.now(),
  }
})

module.exports = router