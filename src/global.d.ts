/**
 * Created by aio on 2023/1/1 14:19
 */

// custom
declare module '@hi-ui/hiui'
declare module '@hi-ui/classic-theme'

// node
declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production'
    readonly DEPLOY_ENV: 'local' | 'test' | 'pre' | 'pro'
  }
}

// styles
declare module '*.css' {
  const classes: Readonly<Record<string, string>>
  export default classes
}

declare module '*.scss' {
  const classes: Readonly<Record<string, string>>
  export default classes
}

// assets
declare module '*.jpg' {
  const src: string
  export default src
}

declare module '*.jpeg' {
  const src: string
  export default src
}

declare module '*.png' {
  const src: string
  export default src
}

declare module '*.gif' {
  const src: string
  export default src
}

declare module '*.svg' {
  import * as React from 'react'

  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement> & { title?: string }>

  const src: string
  export default src
}

declare module '*.mp4' {
  const src: string
  export default src
}

declare module '*.webm' {
  const src: string
  export default src
}

declare module '*.ogg' {
  const src: string
  export default src
}

declare module '*.mp3' {
  const src: string
  export default src
}

declare module '*.wav' {
  const src: string
  export default src
}

declare module '*.flac' {
  const src: string
  export default src
}

declare module '*.aac' {
  const src: string
  export default src
}
