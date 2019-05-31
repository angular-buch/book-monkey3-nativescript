export function confirmDialog(msg: string) {
  return new Promise((resolve, reject) => {
    return confirm(msg) ? resolve(true) : reject(false);
  });
}
