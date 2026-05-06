import { describe, it, expect } from 'vitest'

describe('VitePress Config', () => {
  it('should have correct site title', async () => {
    const config = await import('../.vitepress/config.ts')
    expect(config.default.title).toBe('Playerify')
  })

  it('should have navigation links', async () => {
    const config = await import('../.vitepress/config.ts')
    expect(config.default.themeConfig.nav).toBeDefined()
    expect(config.default.themeConfig.nav.length).toBeGreaterThan(0)
  })
})