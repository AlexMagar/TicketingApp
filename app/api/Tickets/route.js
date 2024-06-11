import Ticket from "@/app/(models)/Ticket";
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

export async function GET(){
    try {
        const ticket = await Ticket.find()
        return NextResponse.json({
            ticket
        },{
            status: 200
        }
        )
    } catch (error) {
        return NextResponse.json({
            message:"Error", error
        },
        {
            status:500
        }
        )
    }
}