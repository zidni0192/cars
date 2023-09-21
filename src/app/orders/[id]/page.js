'use client'
import { useEffect, useState } from "react"
import AddOrder from "../add/page"
import { useParams } from "next/navigation"
import axios from "axios"

const UpdateOrder = () => {
    const [data, setData] = useState({})
    const params = useParams()
    useEffect(() => {
        axios.get(`/api/orders/${params.id}`).then(({ data, status }) => {
            if (status === 200) {
                setData(data?.data || {})
            }
        }).catch((e) => {
            setData({})
        })
    }, [])
    return (
        <AddOrder data={data} />
    )

}

export default UpdateOrder