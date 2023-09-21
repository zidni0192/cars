'use client'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import styles from './page.module.css'
import axios from 'axios'
import { useRouter } from 'next/navigation'
export default function AddOrder({ data }) {
  const router = useRouter()
  const [formData, setFormData] = useState(data || {})

  const [cars, setCars] = useState([])
  const ref = useRef()
  useEffect(() => {
    axios.get('/api/cars').then(({ data, status }) => {
      if (status === 200) {
        setCars(data?.data || [])
      }
    }).catch(() => {
      setCars([])
    })
  }, [])

  useEffect(() => {
    setFormData(data || {})
  }, [data])

  const handleSubmit = useCallback((e) => {
    e.preventDefault()
    let req
    if (data?.order_id) {
      req = axios.put(`/api/orders/${data?.order_id}`, formData)
    } else {
      req = axios.post('/api/orders', formData)
    }
    req.then(() => {
      alert('Data Berhasil Disimpan')
      router.replace('/orders')
    }).catch(() => {
      alert('Data Gagal Disimpan')
    })
  }, [formData, data?.order_id])

  return (
    <form method="post" className={styles.form} onChange={(e) => {
      setFormData({ ...formData, ...{ [e.target.name]: e.target.value } })
    }} onSubmit={handleSubmit} ref={ref}>
      <div className={styles.formGroup}>
        <label htmlFor="car">Car:</label>
        <select id="car" name="car_id" required value={formData.car_id}>
          <option value="">Choose Car</option>
          {cars?.map((item) => (
            <option value={item.car_id}>{item.car_name}</option>
          ))}
        </select>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="pickup_date">Pickup Date:</label>
        <input type="date" id="pickup_date" name="pickup_date" required value={formData.pickup_date} />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="pickup_location">Pickup Location:</label>
        <input type="text" id="pickup_location" name="pickup_location" required value={formData.pickup_location} />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="dropoff_date">Drop Off Date:</label>
        <input type="date" id="dropoff_date" name="dropoff_date" required value={formData.dropoff_date} />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="dropoff_location">Drop Off Location:</label>
        <input type="text" id="dropoff_location" name="dropoff_location" required value={formData.dropoff_location} />
      </div>

      <div className={styles.formGroup}>
        <input type="submit" value="Submit" />
      </div>
    </form>
  )
}
