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


export async function getProductsPage(page: string) {

    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/products?limit=20&page=${page}`)

    const { data, metadata } = await response.json()

    return { data, metadata }
}


export async function searchProducts(keyword: string) {

    const response = await fetch("https://ecommerce.routemisr.com/api/v1/products?limit=1000")

    const { data } = await response.json()

    return data.filter(function (product: { title: string }) {
        return product.title.toLowerCase().includes(keyword.toLowerCase())
    })
}


export async function getProductsByCategory(id: string) {

    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/products?category[in]=${id}`)

    const { data } = await response.json()

    return data
}


export async function getProductsBySubCategory(id: string) {

    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/products?subcategory=${id}`)

    const { data } = await response.json()

    return data
}


export async function getProductsByBrand(id: string) {

    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/products?brand=${id}`)

    const { data } = await response.json()

    return data
}
