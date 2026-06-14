/// <reference types="vite/client" />

declare module '*.svg?react' {
  const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}

declare module '*.svg'
declare module '*.png'
declare module '*.jpg'
declare module '*.json'
declare module '*.css'
declare module '*.scss'

declare module '*.module.css' {
  const classes: { [key: string]: string }
  export default classes
}

declare module '*.module.scss' {
  const classes: { [key: string]: string }
  export default classes
}
