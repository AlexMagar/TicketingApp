import Ticket from "../(models)/Ticket";
import { NextResponse } from "next/server";

export async function POST(req, res){
    try {
        const body = await req.json()
        const ticketData = body.formData
        await Ticket.create(ticketData)

        return NextResponse.json({message: "Ticket Created"}, {status: 201})
    } catch (error) {
        return (
            res.json({
                message: error.message,
                status: 500
            })
        )
    }
}