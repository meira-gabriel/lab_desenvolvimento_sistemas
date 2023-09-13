interface HeadProps {
    title: string
}

export default function Head({title}: HeadProps) {
    document.title = `Me serve | ${title}`
    return null
}