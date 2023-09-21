
import { NextResponse } from "next/server";
import { executeQuery } from "../../instance";

export async function GET(request, { params }) {
    const data = await executeQuery('SELECT *, DATE_FORMAT(pickup_date,"%Y-%m-%d") as pickup_date, DATE_FORMAT(order_date,"%Y-%m-%d") as order_date, DATE_FORMAT(dropoff_date,"%Y-%m-%d") as dropoff_date FROM orders where order_id= ?', [params.id || "w"])
    return NextResponse.json({ message: "DATA DITEMUKAN", data: data?.[0] || {} }, { status: 200 });
}

export async function PUT(request, { params }) {
    const body = await request.json()
    await executeQuery('UPDATE orders SET ? where order_id=?', [body, params.id])
    return NextResponse.json({ message: "UPDATE DATA" }, { status: 200 });
}

export async function DELETE(request, { params }) {
    await executeQuery('DELETE FROM orders where order_id=?', [params.id])
    return NextResponse.json({ message: "DATA BERHASIL DI DELETE" }, { status: 200 });
}
