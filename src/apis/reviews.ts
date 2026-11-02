export async function getProductReviews(id: string) {

    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${id}/reviews`, { cache: "no-store" })

    const { data } = await response.json()

    return data
}


export async function getAllReviews(limit: number) {

    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/reviews?limit=${limit}`)

    const { data } = await response.json()

    return data
}


export async function getReviewById(id: string) {

    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/reviews/${id}`, { cache: "no-store" })

    const { data } = await response.json()

    return data
}
