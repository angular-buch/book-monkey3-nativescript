import { confirm } from 'tns-core-modules/ui/dialogs';

export function confirmDialog(msg: string) {
  return confirm({
    message: msg,
    okButtonText: 'Ja',
    cancelButtonText: 'Nein'
  });
}
