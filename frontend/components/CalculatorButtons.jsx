function CalculatorButtons({ onButtonClick }) {
  // Calculator button layout
  const buttons = [
    // Row 1
    [
      { value: 'C', label: 'C', type: 'clear' },
      { value: '/', label: '÷', type: 'operator' },
      { value: '*', label: '×', type: 'operator' },
      { value: '-', label: '-', type: 'operator' }
    ],
    // Row 2
    [
      { value: '7', label: '7', type: 'number' },
      { value: '8', label: '8', type: 'number' },
      { value: '9', label: '9', type: 'number' },
      { value: '+', label: '+', type: 'operator', span: 1 }
    ],
    // Row 3
    [
      { value: '4', label: '4', type: 'number' },
      { value: '5', label: '5', type: 'number' },
      { value: '6', label: '6', type: 'number' }
    ],
    // Row 4
    [
      { value: '1', label: '1', type: 'number' },
      { value: '2', label: '2', type: 'number' },
      { value: '3', label: '3', type: 'number' },
      { value: '=', label: '=', type: 'equals', span: 1, rowSpan: 2 }
    ],
    // Row 5
    [
      { value: '0', label: '0', type: 'number', span: 2 },
      { value: '.', label: '.', type: 'decimal' }
    ]
  ];

  // Handle button click
  const handleClick = (value) => {
    onButtonClick(value);
  };

  // Get button style based on type
  const getButtonStyle = (type) => {
    const baseStyle = {
      border: 'none',
      borderRadius: '10px',
      fontSize: '1.5rem',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      outline: 'none',
      height: '70px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    };

    switch (type) {
      case 'clear':
        return {
          ...baseStyle,
          backgroundColor: '#ff6b6b',
          color: 'white',
          ':hover': { backgroundColor: '#ff5252' }
        };
      case 'operator':
        return {
          ...baseStyle,
          backgroundColor: '#4ecdc4',
          color: 'white',
          ':hover': { backgroundColor: '#26a69a' }
        };
      case 'equals':
        return {
          ...baseStyle,
          backgroundColor: '#1a73e8',
          color: 'white',
          ':hover': { backgroundColor: '#0d47a1' }
        };
      case 'number':
      case 'decimal':
      default:
        return {
          ...baseStyle,
          backgroundColor: 'white',
          color: '#333',
          ':hover': { backgroundColor: '#f0f0f0' }
        };
    }
  };

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gridTemplateRows: 'repeat(5, 1fr)',
      gap: '15px',
      marginTop: '20px'
    }}>
      {buttons.flat().map((button, index) => {
        const style = getButtonStyle(button.type);
        
        // Handle column span
        const gridColumn = button.span ? `span ${button.span}` : 'span 1';
        const gridRow = button.rowSpan ? `span ${button.rowSpan}` : 'span 1';

        return (
          <button
            key={index}
            onClick={() => handleClick(button.value)}
            style={{
              ...style,
              gridColumn,
              gridRow,
              ':hover': style[':hover']
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.transform = 'scale(0.95)';
              e.currentTarget.style.opacity = '0.9';
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.opacity = '1';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.opacity = '1';
            }}
            type="button"
          >
            {button.label}
          </button>
        );
      })}
    </div>
  );
}

export default CalculatorButtons;
