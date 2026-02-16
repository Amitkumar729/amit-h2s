
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export class SecurityError extends Error {
    constructor(message, code) {
        super(message);
        this.name = "SecurityError";
        this.code = code;
    }
}

export const validateImage = (file) => {
    if (!file) {
        throw new SecurityError("No file provided.", "NO_FILE");
    }

    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
        throw new SecurityError(`Invalid file type: ${file.type}. Only JPEG, PNG, and WebP are allowed.`, "INVALID_MIME");
    }

    if (file.size > MAX_FILE_SIZE) {
        throw new SecurityError(`File too large. Max size is 5MB.`, "FILE_TOO_LARGE");
    }

    // Advanced: could add magic number checking here but File API is limited in browser without external libs
    return true;
};

export const sanitizeString = (str) => {
    if (!str) return "";
    // Basic prevention of script injection if we were to render this raw
    return str.replace(/[<>]/g, "");
};
