'use client'
import React, { useCallback, useEffect, useState } from 'react'
import styles from './page.module.css'
import axios from 'axios'
import Link from 'next/link'
export default function Orders() {
  const [list, setList] = useState([])
  const [refetch, setRefetch] = useState(0)
  useEffect(() => {
    axios.get('/api/orders').then(({ data, status }) => {
      if (status === 200) {
        setList(data?.data || [])
      }
    }).catch(() => {
      setList([])
    })
  }, [refetch])

  const handleDelete = useCallback((id) => {
    if (confirm('Yakin mau menghapus data?')) {
      axios.delete(`/api/orders/${id}`).then(({ data, status }) => {
        if (status === 200) {
          setRefetch(refetch + 1)
        }
      }).catch(() => {
      })
    }
  }, [refetch])
  return (
    <div className={styles.wrapper}>
      <h1>Orders</h1>
      <Link href={`/orders/add`}>
        <button type="button" className="btn-update">Order</button>
      </Link>
      <table className={styles.carRentalTable}>
        <thead>
          <tr>
            <th>Car</th>
            <th>Order Date</th>
            <th>Pickup Date</th>
            <th>Pickup Location</th>
            <th>Drop Off Date</th>
            <th>Drop Off Location</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {list?.map((item) => (
            <tr key={item.order_id}>
              <td>{item.car_name}</td>
              <td>{item.order_date}</td>
              <td>{item.pickup_date}</td>
              <td>{item.pickup_location}</td>
              <td>{item.dropoff_date}</td>
              <td>{item.dropoff_location}</td>
              <td>
                <Link href={`/orders/${item.order_id}`}>
                  <button type="button" className="btn-update">Update</button>
                </Link>
                <button type="button" className="btn-remove" onClick={() => handleDelete(item.order_id)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
