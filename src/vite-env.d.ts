/// <reference types="vite/client" />

declare module '*.svg'

declare module '*.png'

declare module '*.jpg'

declare module '*.json'

declare module '*.module.css' {
  const classes: { [key: string]: string }
  export default classes
}

declare module '*.module.scss' {
  const classes: { [key: string]: string }
  export default classes
}
