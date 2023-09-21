'use client'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import styles from './page.module.css'
import axios from 'axios'
import { useRouter } from 'next/navigation'
export default function AddCar({ data }) {
  const router = useRouter()
  const [formData, setFormData] = useState(data || {})

  const ref = useRef()
 
  useEffect(() => {
    setFormData(data || {})
  }, [data])

  const handleSubmit = useCallback((e) => {
    e.preventDefault()
    let req
    if (data?.order_id) {
      req = axios.put(`/api/cars/${data?.car_id}`, formData)
    } else {
      req = axios.post('/api/cars', formData)
    }
    req.then(() => {
      alert('Data Berhasil Disimpan')
      router.replace('/cars')
    }).catch(() => {
      alert('Data Gagal Disimpan')
    })
  }, [formData, data?.order_id])

  return (
    <form method="post" className={styles.form} onChange={(e) => {
      setFormData({ ...formData, ...{ [e.target.name]: e.target.value } })
    }} onSubmit={handleSubmit} ref={ref}>

      <div className={styles.formGroup}>
        <label htmlFor="car_name">Car Name:</label>
        <input type="text" id="car_name" name="car_name" required value={formData.car_name} />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="day_rate">Day Rate:</label>
        <input type="number" id="day_rate" name="day_rate" required value={formData.day_rate} />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="month_rate">Month Rate:</label>
        <input type="number" id="month_rate" name="month_rate" required value={formData.month_rate} />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="image">Image:</label>
        <input type="text" id="image" name="image" required value={formData.image} />
      </div>

      <div className={styles.formGroup}>
        <input type="submit" value="Submit" />
      </div>
    </form>
  )
}
