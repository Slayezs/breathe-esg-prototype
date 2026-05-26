import { useEffect, useState } from 'react'
import API from '../services/api'
import StatusBadge from '../components/StatusBadge'
import FlagBadge from '../components/FlagBadge'


function DashboardPage() {

  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('ALL')

  useEffect(() => {
    fetchRecords()
  }, [])

  const fetchRecords = async () => {

    try {
      const response = await API.get('/records/')
      setRecords(response.data)
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }


  const handleReview = async (id, action) => {

    try {
      await API.post(
        `/review/${id}/`,
        {
          action: action
        }
      )
      fetchRecords()
    } catch (error) {
      console.log(error)
    }
  }


  const handleLock = async (id) => {

    try {
      await API.post(
        `/lock/${id}/`
      )
      fetchRecords()
    } catch (error) {
      console.log(error)
    }
  }


  const filteredRecords = records.filter((record) => {

    if (filter === 'ALL') {
      return true
    }
    return record.review_status === filter
  })


  const totalRecords = records.length
  const approvedRecords = records.filter(
    r => r.review_status === 'APPROVED'
  ).length

  const rejectedRecords = records.filter(
    r => r.review_status === 'REJECTED'
  ).length

  const pendingRecords = records.filter(
    r => r.review_status === 'PENDING'
  ).length

  if (loading) {

    return (
      <div className='container mt-5'>
        <h3>Loading records...</h3>
      </div>
    )
  }


  return (

    <div className='container mt-5'>

      <h2 className='mb-4'>
        Analyst Review Dashboard
      </h2>


      <div className='row mb-4'>
        <div className='col-md-3'>
          <div className='card text-center p-3 shadow-sm'>
            <h5>Total Records</h5>
            <h3>{totalRecords}</h3>
          </div>
        </div>


        <div className='col-md-3'>
          <div className='card text-center p-3 shadow-sm'>
            <h5>Approved</h5>
            <h3>{approvedRecords}</h3>
          </div>
        </div>


        <div className='col-md-3'>
          <div className='card text-center p-3 shadow-sm'>
            <h5>Rejected</h5>
            <h3>{rejectedRecords}</h3>
          </div>
        </div>


        <div className='col-md-3'>
          <div className='card text-center p-3 shadow-sm'>
            <h5>Pending</h5>
            <h3>{pendingRecords}</h3>
          </div>
        </div>
      </div>


      <div className='mb-3'>

        <select
          className='form-select w-25'
          value={filter}
          onChange={(e) =>
            setFilter(e.target.value)
          }
        >

          <option value='ALL'>
            All Records
          </option>

          <option value='PENDING'>
            Pending
          </option>

          <option value='APPROVED'>
            Approved
          </option>

          <option value='REJECTED'>
            Rejected
          </option>

        </select>
      </div>


      <div className='table-responsive'>

        <table className='table table-bordered table-hover'>
          <thead className='table-dark'>
            <tr>
              <th>ID</th>

              <th>Source</th>

              <th>Scope</th>

              <th>Category</th>

              <th>Original</th>

              <th>Normalized</th>

              <th>Status</th>

              <th>Flags</th>

              <th>Locked</th>

              <th>Actions</th>

            </tr>
          </thead>


          <tbody>

            {filteredRecords.map((record) => (

              <tr key={record.id}>
                <td>{record.id}</td>

                <td>{record.source_type}</td>

                <td>{record.scope}</td>

                <td>{record.category}</td>

                <td>
                  {record.activity_value}
                  {' '}
                  {record.original_unit}
                </td>

                <td>
                  {record.normalized_value}
                  {' '}
                  {record.normalized_unit}
                </td>

                <td>

                  <StatusBadge
                    status={record.review_status}
                  />

                </td>

                <td>

                  <FlagBadge
                    flags={record.validation_flags}
                  />

                </td>

                <td>

                  {record.locked_for_audit ? (

                    <span className='badge bg-dark'>
                      Locked
                    </span>

                  ) : (

                    <span className='badge bg-secondary'>
                      Open
                    </span>

                  )}

                </td>

                <td>

                  {!record.locked_for_audit && (

                    <div className='d-flex gap-2'>

                      <button
                        className='btn btn-success btn-sm'
                        onClick={() =>
                          handleReview(
                            record.id,
                            'APPROVED'
                          )
                        }
                      >
                        Approve
                      </button>


                      <button
                        className='btn btn-danger btn-sm'
                        onClick={() =>
                          handleReview(
                            record.id,
                            'REJECTED'
                          )
                        }
                      >
                        Reject
                      </button>


                      <button
                        className='btn btn-dark btn-sm'
                        onClick={() =>
                          handleLock(record.id)
                        }
                      >
                        Lock
                      </button>

                    </div>

                  )}

                </td>

              </tr>

            ))}

          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DashboardPage