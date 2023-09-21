
import { NextResponse } from "next/server";
import { executeQuery } from "../../instance";

export async function GET(request, { params }) {
    const data = await executeQuery('SELECT * FROM cars where order_id= ?', [params.id || "w"])
    return NextResponse.json({ message: "DATA DITEMUKAN", data: data?.[0] || {} }, { status: 200 });
}

export async function PUT(request, { params }) {
    const body = await request.json()
    await executeQuery('UPDATE cars SET ? where car_id=?', [body, params.id])
    return NextResponse.json({ message: "UPDATE DATA" }, { status: 200 });
}

export async function DELETE(request, { params }) {
    await executeQuery('DELETE FROM cars where car_id=?', [params.id])
    return NextResponse.json({ message: "DATA BERHASIL DI DELETE" }, { status: 200 });
}
