import { Component } from '@angular/core';
import { FileService } from '../services/FileService';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent {
  selectedFile: File | null = null;
  fileError: string | null = null;

  constructor(private fileService: FileService) {}

  // Methode zum Verarbeiten von Dateiänderungen
  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.fileError = null;

      // Prüfen, ob die Datei größer als 1 MB ist
      if (this.selectedFile.size > 1048576) {
        this.fileError = 'Die Datei darf nicht größer als 1 MB sein.';
        this.selectedFile = null;
      }
    }
  }

  // Methode zum Hochladen der Datei
  uploadFile(): void {
    if (!this.selectedFile) return;

    this.fileService.upload(this.selectedFile).subscribe({
      next: (response) => console.log('Datei erfolgreich hochgeladen', response),
      error: (error) => console.error('Fehler beim Hochladen der Datei', error)
    });
  }
}
