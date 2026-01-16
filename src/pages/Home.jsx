import React from 'react'
import Button from "../components/common/Button"
function Home() {
  return (
    <>
      <Button onClick={() => alert("Clicked!")}>Click Me</Button>
<Button variant="secondary" disabled={true}>Disabled</Button>
<Button variant="outline" onClick={() => console.log("Hello")}>Outline</Button>
    
    </>
  )
}

export default Home