function Display({ value }) {
  // Format the display value for better readability
  const formatValue = (val) => {
    if (val === 'Error') return 'Error';
    
    // Remove trailing zeros after decimal
    let formatted = String(val);
    
    // If it's a number, format with commas for thousands
    if (!isNaN(parseFloat(val))) {
      // Split into integer and decimal parts
      const [integer, decimal] = formatted.split('.');
      
      // Add commas to integer part
      const integerWithCommas = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      
      // Recombine with decimal if it exists
      formatted = decimal ? `${integerWithCommas}.${decimal}` : integerWithCommas;
    }
    
    return formatted;
  };

  return (
    <div style={{
      backgroundColor: '#1e1e1e',
      borderRadius: '10px',
      padding: '20px',
      marginBottom: '20px',
      minHeight: '100px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      overflow: 'hidden'
    }}>
      <div style={{
        color: value === 'Error' ? '#ff6b6b' : '#fff',
        fontSize: value === 'Error' ? '2rem' : 
                  value.length > 10 ? '1.8rem' : 
                  value.length > 8 ? '2.2rem' : '2.8rem',
        fontWeight: '300',
        textAlign: 'right',
        width: '100%',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        fontFamily: "'Segoe UI', 'Roboto', sans-serif"
      }}>
        {formatValue(value)}
      </div>
    </div>
  );
}

export default Display;
