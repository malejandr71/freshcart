export async function getAllSubCategories() {

    // the API returns max 50 per page => get all pages
    const response = await fetch("https://ecommerce.routemisr.com/api/v1/subcategories?limit=50")

    const { data, metadata } = await response.json()

    let all = data

    for (let page = 2; page <= metadata.numberOfPages; page++) {
        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/subcategories?limit=50&page=${page}`)
        const next = await res.json()
        all = [...all, ...next.data]
    }

    return all
}


export async function getSpecificSubCategory(id: string) {

    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/subcategories/${id}`)

    const { data } = await response.json()

    return data
}
