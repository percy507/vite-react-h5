# 搭个 h5 项目的脚手架

### 构建命令

```bash
pnpm i                # 装依赖
pnpm dev              # 本地开发
pnpm build:dev        # 开发服务器生产环境打包
pnpm build:test       # 测试服务器生产环境打包
pnpm build:prod       # 生产服务器生产环境打包
pnpm preview          # 本地打包并预览打包后的页面
```

### h5

- h5 页面与大屏不同，大屏需要基于设计稿的宽高动态适配屏幕，而 h5 只需要适配屏幕的宽度
- css 中的 px 自动转 rem，jsx 中的 px 需要使用 `toAdaptedPx` 包裹
