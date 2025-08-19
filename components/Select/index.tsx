'use client'

import React, { useState, useRef, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'

interface SelectOption {
  value: string
  label: string
}

interface SelectProps {
  options: SelectOption[]
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  size?: 'small' | 'regular' | 'large'
}

const Select = ({
  options,
  value,
  onChange,
  placeholder = 'Select an option...',
  size = 'regular',
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState(value || '')
  const [dropdownDirection, setDropdownDirection] = useState<'down' | 'up'>(
    'down'
  )
  const selectRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Determine dropdown direction based on available space
  const determineDropdownDirection = () => {
    if (!selectRef.current) return 'down'

    const rect = selectRef.current.getBoundingClientRect()
    const windowHeight = window.innerHeight
    const dropdownHeight = Math.min(240, options.length * 40) // Estimated dropdown height
    const spaceBelow = windowHeight - rect.bottom
    const spaceAbove = rect.top

    // If there's more space above and not enough space below, open upward
    if (spaceBelow < dropdownHeight && spaceAbove > spaceBelow) {
      return 'up'
    }

    return 'down'
  }

  const handleSelect = (optionValue: string) => {
    setSelectedValue(optionValue)
    setIsOpen(false)
    if (onChange) {
      onChange(optionValue)
    }
  }

  const handleToggleDropdown = () => {
    if (!isOpen) {
      // Determine direction before opening
      const direction = determineDropdownDirection()
      setDropdownDirection(direction)
    }
    setIsOpen(!isOpen)
  }

  // Get size-specific classes
  const getSizeClasses = (size: 'small' | 'regular' | 'large') => {
    switch (size) {
      case 'small':
        return {
          button: 'px-3 py-2 ',
          dropdown: 'px-2 py-1.5 ',
          icon: 20,
        }
      case 'large':
        return {
          button: 'px-8 py-4 ',
          dropdown: 'px-4 py-3 ',
          icon: 28,
        }
      default: // regular
        return {
          button: 'px-6 py-3 ',
          dropdown: 'px-3 py-2 ',
          icon: 24,
        }
    }
  }

  const sizeClasses = getSizeClasses(size)

  const selectedOption = options.find(
    (option) => option.value === selectedValue
  )

  return (
    <div className="relative" ref={selectRef}>
      {/* Select Button */}
      <button
        type="button"
        onClick={handleToggleDropdown}
        className={`bg-dark-charcoal text-text-primary ${sizeClasses.button} rounded-lg border border-dark-charcoal hover:border-light-gray focus:outline-none focus:border-accent transition-colors duration-200 flex items-center justify-between gap-2 w-full`}
      >
        <span className="text-text-primary">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          size={sizeClasses.icon}
          className={`text-text-secondary transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Dropdown Options */}
      {isOpen && (
        <div
          className={`absolute z-10 bg-dark-charcoal border border-medium-gray rounded-lg shadow-lg max-h-60 overflow-auto w-full ${
            dropdownDirection === 'up' ? 'bottom-full mb-1' : 'top-full mt-1'
          }`}
        >
          {' '}
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleSelect(option.value)}
              className={`w-full text-left ${
                sizeClasses.dropdown
              } hover:bg-medium-gray transition-colors duration-150 first:rounded-t-lg last:rounded-b-lg ${
                selectedValue === option.value
                  ? 'bg-accent text-text-primary'
                  : 'text-text-primary'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default Select
