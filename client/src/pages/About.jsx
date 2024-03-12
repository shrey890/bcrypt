import { useParams } from "react-router-dom"

const About = () => {
  const {aboutId} = useParams()
  return (
    <div>About:{aboutId}</div>
  )
}

export default About