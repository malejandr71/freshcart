export async function getAllCategories() {

    const response = await fetch("https://ecommerce.routemisr.com/api/v1/categories")

    const { data } = await response.json()

    return data
}


export async function getSpecificCategory(id: string) {

    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/categories/${id}`)

    const { data } = await response.json()

    return data
}


export async function getSubCategoriesOnCategory(id: string) {

    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`)

    const { data } = await response.json()

    return data
}
