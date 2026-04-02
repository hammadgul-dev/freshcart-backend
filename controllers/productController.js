import fetch from "node-fetch"

async function getProducts(req, resp) {
    try {
        let apiResp = await fetch(process.env.PRODUCT_API)

        if (!apiResp.ok)
            return resp.status(500).json({ message: [] })

        let apiData = await apiResp.json()
        return resp.status(200).json(apiData)
    }
    catch (e) {
        resp.status(500).json({ message: "Failed To Fetch Product" })
    }
}

export { getProducts }