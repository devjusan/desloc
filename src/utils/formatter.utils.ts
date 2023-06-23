export const formatDate = (date: string) => {
    const toDate = new Date(date)

    return toDate.toLocaleDateString(`pt-BR`, {
        day: `2-digit`,
        month: `long`,
        year: `numeric`,
    })
}