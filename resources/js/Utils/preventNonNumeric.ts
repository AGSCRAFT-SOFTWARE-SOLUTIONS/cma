import { KeyboardEvent } from "react";

export default (e: KeyboardEvent) => {
    const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'];
    if (!allowedKeys.includes(e.key) && !/\d/.test(e.key)) {
        e.preventDefault();
    }
}
