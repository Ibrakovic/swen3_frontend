import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { DocumentService } from '../../services/document.service';
import { Router } from '@angular/router';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    JsonPipe
  ],
})
export class DashboardComponent {
  uploadForm: FormGroup; // Für den Upload (bereits implementiert)
  searchForm: FormGroup; // Für die Suche nach Dokumenten
  searchResult: any = null; // Ergebnisse der Suche
  searchErrorMessage: string | null = null; // Fehlermeldungen bei der Suche

  uploadSuccessMessage: string | null = null; // Erfolgsmeldung für Upload
  uploadErrorMessage: string | null = null; // Fehlermeldung für Upload

  constructor(private fb: FormBuilder, private documentService: DocumentService, private router: Router) {
    // Formular für Datei-Upload
    this.uploadForm = this.fb.group({
      file: [null, Validators.required], // Datei ist Pflichtfeld
    });

    this.searchForm = this.fb.group({
      documentId: ['', Validators.required], // Dokument-ID als Pflichtfeld
    });
  }

  logout() {
    sessionStorage.clear(); // Session-Daten löschen
    this.router.navigate(['/login']); // Zurück zur Login-Seite navigieren
  }

  onUpload() {
    if (this.uploadForm.invalid) {
      this.uploadErrorMessage = 'Please select a file to upload.';
      return;
    }

    const file = this.uploadForm.value.file;

    this.documentService.uploadDocument(file).subscribe({
      next: (response) => {
        this.uploadSuccessMessage = response;
        this.uploadErrorMessage = null;
        this.uploadForm.reset();
      },
      error: () => {
        this.uploadErrorMessage = 'Failed to upload file. Please try again.';
        this.uploadSuccessMessage = null;
      },
    });
  }

  onSearch() {
    if (this.searchForm.invalid) {
      this.searchErrorMessage = 'Please enter a valid document ID.';
      return;
    }

    const documentId = Number(this.searchForm.value.documentId);

    this.documentService.getDocumentById(documentId).subscribe({
      next: (response) => {
        if (response && response.length > 0) {
          this.searchResult = response[0]; // Nimm das erste Element des Arrays
          this.searchErrorMessage = null;
        } else {
          this.searchErrorMessage = 'No document found for the given ID.';
          this.searchResult = null;
        }
      },
      error: (error) => {
        console.error(error)
        this.searchErrorMessage = 'Document not found. Please check the ID.';
        this.searchResult = null;
      },
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement; // Typisierung erzwingen
    if (input?.files && input.files.length > 0) {
      const file = input.files[0]; // Erste Datei auswählen
      this.uploadForm.get('file')?.setValue(file); // Datei im Formular speichern
    }
  }


}
