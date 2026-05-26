import { useState } from 'react'
import API from '../services/api'


function UploadPage() {

  const [file, setFile] = useState(null)

  const [sourceType, setSourceType] = useState('SAP')

  const [message, setMessage] = useState('')


  const handleUpload = async () => {

    if (!file) {
      alert('Please select a file')
      return
    }

    const formData = new FormData()

    formData.append('file', file)

    formData.append('source_type', sourceType)

    try {

      setMessage('Uploading...')
      const response = await API.post(
        '/upload/',
        formData
      )

      setMessage(
        `${response.data.records_created} records uploaded successfully`
      )

      setFile(null)

    } catch (error) {

      console.log(error)

      setMessage('Upload failed')
    }
  }


  return (

    <div className='container mt-5'>
      <div className='card p-4 shadow-sm'>

        <h2 className='mb-4'>
          Upload ESG Data
        </h2>


        <div className='mb-3'>

          <label className='form-label'>
            Source Type
          </label>

          <select
            className='form-select'
            value={sourceType}
            onChange={(e) =>
              setSourceType(e.target.value)
            }
          >

            <option value='SAP'>
              SAP
            </option>

            <option value='UTILITY'>
              Utility
            </option>

            <option value='TRAVEL'>
              Travel
            </option>

          </select>
        </div>


        <div className='mb-3'>

          <label className='form-label'>
            Upload CSV File
          </label>

          <input
            type='file'
            className='form-control'
            onChange={(e) =>
              setFile(e.target.files[0])
            }
          />

        </div>


        <button
          className='btn btn-primary'
          onClick={handleUpload}
        >
          Upload File
        </button>


        {message && (

          <div className='alert alert-info mt-3'>

            {message}

          </div>

        )}
      </div>
    </div>
  )
}

export default UploadPage