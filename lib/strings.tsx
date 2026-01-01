import { Fragment, type JSX } from "react"

export const nl2br = (text : string) : JSX.Element => (<>
  {text.split("\n").map((line, i) => (
    <Fragment key={i}>{line}{i < text.split("\n").length - 1 && <br />}</Fragment>
  ))}
</>);