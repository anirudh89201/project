export const sanitizeText = (text) => {
    // Remove phone numbers (formats like +91 9876543210, 987-654-3210, (987) 654-3210)
    text = text.replace(/(\+?\d{1,3}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}/g, "[PHONE]");

    // Remove email addresses
    text = text.replace(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g, "[EMAIL]");

    // Remove LinkedIn URLs
    text = text.replace(/https?:\/\/(www\.)?linkedin\.com\/[^\s]+/gi, "[LINKEDIN]");

    // Remove GitHub URLs
    text = text.replace(/https?:\/\/(www\.)?github\.com\/[^\s]+/gi, "[GITHUB]");

    // Remove other URLs (optional)
    text = text.replace(/https?:\/\/[^\s]+/gi, "[URL]");

    return text;
}
