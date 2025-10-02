import './Display.css'

const Display = ({ value }) => {
  return (
    <div className="display">
      <div className="display-value">{value}</div>
    </div>
  )
}

export default Display