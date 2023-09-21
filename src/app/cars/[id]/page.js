'use client'
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import axios from "axios"
import AddCar from "../add/page"

const UpdateCar = () => {
    const [data, setData] = useState({})
    const params = useParams()
    useEffect(() => {
        axios.get(`/api/cars/${params.id}`).then(({ data, status }) => {
            if (status === 200) {
                setData(data?.data || {})
            }
        }).catch((e) => {
            setData({})
        })
    }, [])
    return (
        <AddCar data={data} />
    )

}

export default UpdateCar