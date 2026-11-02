export async function getAllProduct() {

    try {
        const response = await fetch("https://ecommerce.routemisr.com/api/v1/products")

        const { data } = await response.json()

        return data

    } catch (e) {
        return e
    }
}


export async function getSingleProducts(id: string) {

    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${id}`)

    const { data } = await response.json()

    return data
}
