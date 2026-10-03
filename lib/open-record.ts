export const SELECT_RECORD = "select-record";

export function openRecord(id: string) {
  window.dispatchEvent(new CustomEvent<string>(SELECT_RECORD, { detail: id }));
}
