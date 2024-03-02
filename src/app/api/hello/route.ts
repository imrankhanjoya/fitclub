export async function GET() {
    const res = {1:1,2:2,3:3}
    const data = await res
   
    return Response.json({ data })
  }
  