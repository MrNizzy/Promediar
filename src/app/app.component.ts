import { Component } from '@angular/core';
import { Note } from './note.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Promediar';

  notes: Note[] = [{ note: null, percent: null }];
  promedioActual: number = 0;
  notaRequerida: number = 0;
  porcentajeRestante: number = 0;
  totalPercent: number = 0;
  notaActual: number = 0;

  // función para agregar una nueva nota al array
  addNote() {
    this.notes.push({ note: null, percent: null });
  }

  // función para eliminar una nota del array
  deleteNote(index: number) {
    this.notes.splice(index, 1);
  }

  // función para calcular el promedio y actualizar la nota resultado
  calculateAverage() {
    this.notaActual = 0;
    this.totalPercent = 0;
    for (let note of this.notes) {
      if (note.note && note.percent) {
        this.notaActual += note.note * note.percent / 100;
        this.totalPercent += note.percent;
      }
    }
    this.promedioActual = this.notaActual / this.totalPercent * 100;
    if (this.totalPercent < 100) {
      this.notaRequerida = (3 - this.promedioActual * this.totalPercent / 100) / (100 - this.totalPercent) * 100;
    } else {
      this.notaRequerida = 0;
    }

    this.porcentajeRestante = 100 - this.totalPercent;
  }
}
