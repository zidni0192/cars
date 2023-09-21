
import { NextResponse } from "next/server";
import { executeQuery } from "../instance";

export async function POST(request) {
    const body = await request?.json()
    body.order_date = new Date()
    const res = await executeQuery("INSERT INTO orders(`car_id`,`pickup_date`,`dropoff_date`,`pickup_location`,`dropoff_location`,`order_date`) VALUES(?,?,?,?,?,?)", [body.car_id, body.pickup_date, body.dropoff_date, body.pickup_location, body.dropoff_location, body.order_date])
    return NextResponse.json({ message: "SUCCESS DATA" }, { status: 200 });
}

export async function GET(request) {
    const data = await executeQuery('SELECT *, DATE_FORMAT(pickup_date,"%Y-%m-%d") as pickup_date, DATE_FORMAT(order_date,"%Y-%m-%d") as order_date, DATE_FORMAT(dropoff_date,"%Y-%m-%d") as dropoff_date FROM orders LEFT JOIN cars ON orders.car_id = cars.car_id');
    return NextResponse.json({ message: data !== null ? "SUCCESS DATA" : "", data }, { status: data !== null ? 200 : "400" });
}