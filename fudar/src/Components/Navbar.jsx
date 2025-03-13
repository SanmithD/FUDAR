import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={{
      backgroundColor: '#333',
      padding: '1rem',
      marginBottom: '2rem',
    }}>
      <ul style={{
        listStyle: 'none',
        display: 'flex',
        gap: '2rem',
        margin: 0,
        padding: 0,
      }}>
        <li>
          <NavLink
            to="/"
            end
            style={({ isActive }) => ({
              color: isActive ? '#fff' : '#fff',
              textDecoration: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              backgroundColor: isActive ? '#4CAF50' : '#333',
              transition: 'background-color 0.3s',
            })}
            className={({ isActive }) => isActive ? "active" : ""}
          >
            Driver Management
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/staffVehicle"
            style={({ isActive }) => ({
              color: isActive ? '#fff' : '#fff',
              textDecoration: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              backgroundColor: isActive ? '#4CAF50' : '#333',
              transition: 'background-color 0.3s',
            })}
          >
            Vehicle List
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/driverList"
            style={({ isActive }) => ({
              color: isActive ? '#fff' : '#fff',
              textDecoration: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              backgroundColor: isActive ? '#4CAF50' : '#333',
              transition: 'background-color 0.3s',
            })}
          >
            Drivers List
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/bookingList"
            style={({ isActive }) => ({
              color: isActive ? '#fff' : '#fff',
              textDecoration: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              backgroundColor: isActive ? '#4CAF50' : '#333',
              transition: 'background-color 0.3s',
            })}
          >
            Booking List
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/createVehicle"
            style={({ isActive }) => ({
              color: isActive ? '#fff' : '#fff',
              textDecoration: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              backgroundColor: isActive ? '#4CAF50' : '#333',
              transition: 'background-color 0.3s',
            })}
          >
            Create Vehicle
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/create-booking"
            style={({ isActive }) => ({
              color: isActive ? '#fff' : '#fff',
              textDecoration: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              backgroundColor: isActive ? '#4CAF50' : '#333',
              transition: 'background-color 0.3',
            })}
          >
            Create Booking
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/vehicleManage"
            style={({ isActive }) => ({
              color: isActive ? '#fff' : '#fff',
              textDecoration: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              backgroundColor: isActive ? '#4CAF50' : '#333',
              transition: 'background-color 0.3',
            })}
          >
            Driver Vehicle
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar