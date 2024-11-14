'use client';

function generateId(length: number = 10): string {
    let id: string = '';
    const chars: string =
        'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_.*%$#@+-=<>;:';
    for (let i = 0; i < length; i++) {
        const pos = Math.floor(Math.random() * chars.length + 1);
        const char = chars[pos];
        id += char;
    }

    return id;
}

export default generateId;
