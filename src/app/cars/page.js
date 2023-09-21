'use client'
import React, { useCallback, useEffect, useState } from 'react'
import styles from './page.module.css'
import axios from 'axios'
import Link from 'next/link'
export default function Cars() {
  const [list, setList] = useState([])
  const [refetch, setRefetch] = useState(0)
  useEffect(() => {
    axios.get('/api/cars').then(({ data, status }) => {
      if (status === 200) {
        setList(data?.data || [])
      }
    }).catch(() => {
      setList([])
    })
  }, [refetch])

  const handleDelete = useCallback((id) => {
    if (confirm('Yakin mau menghapus data?')) {
      axios.delete(`/api/cars/${id}`).then(({ data, status }) => {
        if (status === 200) {
          setRefetch(refetch + 1)
        }
      }).catch(() => {
      })
    }
  }, [refetch])
  return (
    <div className={styles.wrapper}>
      <h1>Cars</h1>
      <Link href={`/cars/add`}>
        <button type="button" className="btn-update">Add Car</button>
      </Link>
      <table className={styles.carRentalTable}>
        <thead>
          <tr>
            <th>Car Name</th>
            <th>Day Rate</th>
            <th>Month Rate</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {list?.map((item) => (
            <tr key={item.car_id}>
              <td>{item.car_name}</td>
              <td>{item.day_rate}</td>
              <td>{item.month_rate}</td>
              <td>{item.image ? <img src={item.image} alt={item.car_name} /> : ""}</td>
              <td>
                <Link href={`/cars/${item.car_id}`}>
                  <button type="button" className="btn-update">Update</button>
                </Link>
                <button type="button" className="btn-remove" onClick={() => handleDelete(item.car_id)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
