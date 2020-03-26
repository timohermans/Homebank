import { fireEvent } from "@testing-library/react";

export function selectFile(element, file) {
    fireEvent.change(element, { target: { files: [file] } });
}