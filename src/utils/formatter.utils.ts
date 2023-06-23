export const formatDate = (date: string | undefined) => {
    if (!date) return ``

    const toDate = new Date(date)

    return toDate.toLocaleDateString(`pt-BR`, {
        day: `2-digit`,
        month: `long`,
        year: `numeric`,
    })
}