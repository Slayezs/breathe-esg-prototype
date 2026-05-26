function FlagBadge({ flags }) {

  if (!flags || flags.length === 0) {

    return (
      <span className='badge bg-success'>
        No Issues
      </span>
    )
  }

  return (

    <div>
      {flags.map((flag, index) => (

        <span
          key={index}
          className='badge bg-danger me-1'
        >

          {flag}

        </span>

      ))}

    </div>
  )
}

export default FlagBadge