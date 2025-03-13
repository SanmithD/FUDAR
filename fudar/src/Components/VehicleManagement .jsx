import axios from 'axios'
import { useEffect, useState } from 'react'

const VehicleManagement = () => {
  const [vehicles, setVehicles] = useState([])
  const [drivers, setDrivers] = useState([])
  const [selectedVehicle, setSelectedVehicle] = useState(null)
  const [formData, setFormData] = useState({
    vehicleType: '',
    vehicleNumber: '',
    driverId: ''
  })
  const [files, setFiles] = useState({
    vehicleImage: null,
    emissionTest: null,
    vehicleRC: null,
    vehicleInsurance: null
  })
  const [viewMode, setViewMode] = useState('list') // list, form, details
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchVehicles()
    fetchDrivers()
  }, [])

  const fetchVehicles = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/vehicle/all')
      setVehicles(res.data.vehicles)
    } catch (err) {
      setError('Failed to fetch vehicles')
    }
  }

  const fetchDrivers = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/driver/getAllDriver')
      setDrivers(res.data.details)
    } catch (err) {
      console.error('Failed to fetch drivers:', err)
    }
  }

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e) => {
    setFiles({ ...files, [e.target.name]: e.target.files[0] })
  }

  const handleCreateUpdate = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    const formDataToSend = new FormData()
    Object.entries(formData).forEach(([key, value]) => {
      if (value) formDataToSend.append(key, value)
    })
    
    Object.entries(files).forEach(([key, file]) => {
      if (file) formDataToSend.append(key, file)
    })

    try {
      if (selectedVehicle) {
        await axios.put(
          `http://localhost:8080/api/vehicle/${selectedVehicle._id}`,
          formDataToSend,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        )
        setSuccess('Vehicle updated successfully')
      } else {
        await axios.post(
          'http://localhost:8080/api/vehicle/create',
          formDataToSend,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        )
        setSuccess('Vehicle created successfully')
      }
      resetState()
      fetchVehicles()
    } catch (err) {
      setError(err.response?.data?.message || 'Operation failed')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Delete this vehicle?')) {
      try {
        await axios.delete(`http://localhost:8080/api/vehicle/${id}`)
        setSuccess('Vehicle deleted successfully')
        fetchVehicles()
      } catch (err) {
        setError('Failed to delete vehicle')
      }
    }
  }

  const handleAssignDriver = async (vehicleId, driverId) => {
    try {
      await axios.post('http://localhost:8080/api/vehicle/assign', { vehicleId, driverId })
      setSuccess('Driver assigned successfully')
      fetchVehicles()
    } catch (err) {
      setError('Failed to assign driver')
    }
  }

  const handleUnassignDriver = async (vehicleId) => {
    try {
      await axios.post('http://localhost:8080/api/vehicle/unassign', { vehicleId })
      setSuccess('Driver unassigned successfully')
      fetchVehicles()
    } catch (err) {
      setError('Failed to unassign driver')
    }
  }

  const resetState = () => {
    setFormData({ vehicleType: '', vehicleNumber: '', driverId: '' })
    setFiles({ vehicleImage: null, emissionTest: null, vehicleRC: null, vehicleInsurance: null })
    setSelectedVehicle(null)
    setViewMode('list')
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '20px', color: '#333' }}>Vehicle Management</h1>

      {error && (
        <div style={{ backgroundColor: '#ffebee', color: '#b71c1c', padding: '10px', marginBottom: '20px', borderRadius: '4px' }}>
          {error}
        </div>
      )}

      {success && (
        <div style={{ backgroundColor: '#e8f5e9', color: '#2e7d32', padding: '10px', marginBottom: '20px', borderRadius: '4px' }}>
          {success}
        </div>
      )}

      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <button
          onClick={() => setViewMode('list')}
          style={{
            padding: '8px 16px',
            backgroundColor: viewMode === 'list' ? '#2196f3' : '#eee',
            color: viewMode === 'list' ? 'white' : '#333',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          View All
        </button>
        <button
          onClick={() => setViewMode('form')}
          style={{
            padding: '8px 16px',
            backgroundColor: viewMode === 'form' ? '#4caf50' : '#eee',
            color: viewMode === 'form' ? 'white' : '#333',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {selectedVehicle ? 'Edit Vehicle' : 'Add New'}
        </button>
      </div>

      {viewMode === 'list' && (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f5f5f5' }}>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Type</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Number</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Assigned Driver</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map(vehicle => (
                <tr key={vehicle._id} style={{ borderBottom: '1px solid #ddd' }}>
                  <td style={{ padding: '12px' }}>{vehicle.vehicleType}</td>
                  <td style={{ padding: '12px' }}>{vehicle.vehicleNumber}</td>
                  <td style={{ padding: '12px' }}>
                    {vehicle.userId 
                      ? drivers.find(d => d.userId === vehicle.userId)?.driverName 
                      : 'Unassigned'}
                  </td>
                  <td style={{ padding: '12px', display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => {
                        setSelectedVehicle(vehicle)
                        setViewMode('details')
                      }}
                      style={{
                        padding: '6px 12px',
                        backgroundColor: '#2196f3',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      View
                    </button>
                    <button
                      onClick={() => {
                        setSelectedVehicle(vehicle)
                        setViewMode('form')
                      }}
                      style={{
                        padding: '6px 12px',
                        backgroundColor: '#ffc107',
                        color: 'black',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(vehicle._id)}
                      style={{
                        padding: '6px 12px',
                        backgroundColor: '#f44336',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {viewMode === 'form' && (
        <form onSubmit={handleCreateUpdate} style={{ backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '8px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginBottom: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Vehicle Type</label>
              <input
                type="text"
                name="vehicleType"
                value={formData.vehicleType}
                onChange={handleInputChange}
                required
                style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Vehicle Number</label>
              <input
                type="text"
                name="vehicleNumber"
                value={formData.vehicleNumber}
                onChange={handleInputChange}
                required
                style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Vehicle Image</label>
              <input
                type="file"
                name="vehicleImage"
                onChange={handleFileChange}
                style={{ width: '100%' }}
                required={!selectedVehicle}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Emission Test</label>
              <input
                type="file"
                name="emissionTest"
                onChange={handleFileChange}
                style={{ width: '100%' }}
                required={!selectedVehicle}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Vehicle RC</label>
              <input
                type="file"
                name="vehicleRC"
                onChange={handleFileChange}
                style={{ width: '100%' }}
                required={!selectedVehicle}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Vehicle Insurance</label>
              <input
                type="file"
                name="vehicleInsurance"
                onChange={handleFileChange}
                style={{ width: '100%' }}
                required={!selectedVehicle}
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: '10px 20px',
                backgroundColor: '#4caf50',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              {loading ? 'Processing...' : selectedVehicle ? 'Update Vehicle' : 'Create Vehicle'}
            </button>
            <button
              type="button"
              onClick={resetState}
              style={{
                padding: '10px 20px',
                backgroundColor: '#f44336',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {viewMode === 'details' && selectedVehicle && (
        <div style={{ backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '8px' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>Vehicle Details</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginBottom: '20px' }}>
            <div>
              <p style={{ fontWeight: '500' }}>Type: {selectedVehicle.vehicleType}</p>
              <p style={{ fontWeight: '500' }}>Number: {selectedVehicle.vehicleNumber}</p>
              <p style={{ fontWeight: '500' }}>
                Assigned Driver: {selectedVehicle.userId 
                  ? drivers.find(d => d.userId === selectedVehicle.userId)?.driverName 
                  : 'None'}
              </p>
            </div>
            
            <div>
              <h3 style={{ fontWeight: '500', marginBottom: '10px' }}>Documents:</h3>
              <p>vehicle Image: <img src={selectedVehicle.vehicleImage} alt={selectedVehicle.vehicleImage} height="200px" width="250px" /> </p>
              <p>Emission Test: <img src={selectedVehicle.emissionTest} alt={selectedVehicle.emissionTest} height="200px" width="250px" /> </p>
              <p>Vehicle RC : <img src={selectedVehicle.vehicleRC} alt={selectedVehicle.vehicleRC} height="200px" width="250px" /> </p>
              <p>Insurance: <img src={selectedVehicle.vehicleInsurance} alt={selectedVehicle.vehicleInsurance} height="200px" width="250px" /> </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
            <select
              value={formData.driverId}
              onChange={(e) => handleAssignDriver(selectedVehicle._id, e.target.value)}
              style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
            >
              <option value="">Select Driver</option>
              {drivers.map(driver => (
                <option key={driver._id} value={driver._id}>
                  {driver.driverName}
                </option>
              ))}
            </select>
            <button
              onClick={() => handleUnassignDriver(selectedVehicle._id)}
              style={{
                padding: '8px 16px',
                backgroundColor: '#f44336',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Unassign Driver
            </button>
          </div>

          <button
            onClick={() => setViewMode('list')}
            style={{
              padding: '8px 16px',
              backgroundColor: '#2196f3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Back to List
          </button>
        </div>
      )}
    </div>
  )
}

export default VehicleManagement