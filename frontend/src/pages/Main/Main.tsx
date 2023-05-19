import { Link } from "react-router-dom"
import { Button } from "antd"

export default function Main() {
  return (
    <div>
      <h1>Main page</h1>
      <Link to="/login">
        <Button>Login page</Button>
      </Link>
    </div>
  )
}
