export const post = async (url:string, param?:any)  => {
    const request = await fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(param),
        credentials: "include"
    })
    const response = await request.json()
    return response;
}

export const get = async (url: string, param?:any) => {
    const request = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(param),
        credentials: "include"
    })
    const response = await request.json()
    return response;
}