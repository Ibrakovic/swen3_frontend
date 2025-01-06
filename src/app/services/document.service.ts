import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  private baseUrl = 'http://localhost:8081/document'; // Basis-URL des Upload-Endpunkts

  constructor(private http: HttpClient) {}

  // Datei hochladen (POST /document/upload/file)
  uploadDocument(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file); // Datei hinzufügen

    // POST-Anfrage an den Endpunkt
    return this.http.post(`${this.baseUrl}/upload/file`, formData);
  }

  // Dokument nach ID suchen (GET /documents/{documentId})
  getDocumentById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/get/details`, {
      params: { id: id.toString() }, // Query-Parameter "id" anhängen
    });
  }
}
