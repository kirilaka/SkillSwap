import React from 'react'
import './Input.scss'
import searchIcon from './search.svg'
interface InputProps {
  placeholder?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
}
const Input: React.FC<InputProps> = ({
  placeholder = 'Искать навык',
  onChange,
  className = '',
}) => {
  return (
    <div className={`custom-input-wrapper ${className}`}>
      <img src={searchIcon} alt="Поиск" className="search-icon" />
      <input
        type="text"
        placeholder={placeholder}
        onChange={onChange}
        className="custom-input-field"
      />
    </div>
  )
}

export default Input
