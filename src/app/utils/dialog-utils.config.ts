import { MatDialogConfig } from "@angular/material/dialog";

export function displayBookDialog(data?: any): MatDialogConfig {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = false;
  dialogConfig.panelClass = 'book-info-dialog';
  dialogConfig.data = data;
  return dialogConfig;
}
