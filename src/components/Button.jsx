import './Button.css'

const Button = ({ label, type, onClick, span = 1, rowSpan = 1 }) => {
  const style = {
    gridColumn: span > 1 ? `span ${span}` : 'auto',
    gridRow: rowSpan > 1 ? `span ${rowSpan}` : 'auto'
  }

  return (
    <button
      className={`calculator-button ${type}`}
      onClick={onClick}
      style={style}
    >
      {label}
    </button>
  )
}

export default Button