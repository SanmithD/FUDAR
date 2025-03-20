import axios from 'axios';
import React, { useEffect } from 'react';

function DriverSalary() {
    const getSalary = async() =>{
        try {
            const response = await axios.get('https://fudar-dqqd.onrender.com/api/user/getOwnSalary',{
                headers:{
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            console.log( "Driver salary", response.data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        getSalary();
    },[]);
  return (
    <div>DriverSalary</div>
  )
}

export default DriverSalary