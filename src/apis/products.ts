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


// filter => "category[in]=id" | "brand=id" | "subcategory=id" | "page=2"
export async function getProductsByFilter(filter: string) {

    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/products?${filter}`)

    const data = await response.json()

    return data
}
