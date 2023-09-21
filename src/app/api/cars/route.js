
import { NextResponse } from "next/server";
import { executeQuery } from "../instance";

export async function POST(request) {
    const body = await request?.json()
    body.order_date = new Date()
    const res = await executeQuery("INSERT INTO cars(`car_name`,`day_rate`,`month_rate`,`image`) VALUES(?,?,?,?)", [body.car_name, body.day_rate, body.month_rate, body.image])
    return NextResponse.json({ message: "SUCCESS DATA" }, { status: 200 });
}

export async function GET(request) {
    const data = await executeQuery('SELECT * FROM cars');
    return NextResponse.json({ message: data !== null ? "SUCCESS DATA" : "", data }, { status: data !== null ? 200 : "400" });
}