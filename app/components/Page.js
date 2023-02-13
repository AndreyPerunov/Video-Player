import React, { useEffect } from "react"

function Page(props) {
  useEffect(() => {
    document.title = `${props.title} | by Andrey Perunov`
    window.scrollTo(0, 0)
  }, [props.title])

  return <div className="wrapper">{props.children}</div>
}

export default Page
