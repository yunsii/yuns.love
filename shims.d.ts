declare module 'katex/dist/katex.css'

declare module '*.module.css' {
  const classes: Record<string, string>
  export default classes
}
