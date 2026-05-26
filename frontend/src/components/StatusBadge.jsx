function StatusBadge({ status }) {

  let badgeClass = 'secondary'

  if (status === 'APPROVED') {
    badgeClass = 'success'
  }

  else if (status === 'REJECTED') {
    badgeClass = 'danger'
  }

  else if (status === 'PENDING') {
    badgeClass = 'warning'
  }

  return (

    <span className={`badge bg-${badgeClass}`}>

      {status}

    </span>
  )
}

export default StatusBadge