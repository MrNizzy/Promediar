import { Component } from '@angular/core';
import { Note } from './note.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Promediar';

  // UI
  isViewModal: boolean = false;

  // Variables
  notes: Note[] = [{ note: null, percent: null }];
  acumulado: number = 0;
  notaRequerida: number = 0;
  porcentajeRestante: number = 0;
  porcentajeTotal: number = 0;
  acumuladoActual: number = 0;

  // Configuración
  notaMinima: number = 0;
  notaMaxima: number = 5;
  notaAprobatoria: number = 3;
  notaObjetivo: number = 3;

  notaMinimaTemp: number = 0;
  notaMaximaTemp: number = 5;
  notaAprobatoriaTemp: number = 3;
  notaObjetivoTemp: number = 3;

  changeViewModal() {
    this.isViewModal = !this.isViewModal;
  }

  handleClick(event: MouseEvent) {
    if (!(event.target as HTMLElement).closest('#card-modal')) {
      this.changeViewModal();
    }
  }

  // función para agregar una nueva nota al array
  addNote() {
    this.notes.push({ note: null, percent: null });
  }

  // función para eliminar una nota del array
  deleteNote(index: number) {
    this.notes.splice(index, 1);
  }

  calculateAverage(note: number | null) {
    if (note !== null && note >= this.notaMinima && note <= this.notaMaxima) {
      this.acumuladoActual = 0;
      this.porcentajeTotal = 0;
      for (let note of this.notes) {
        if (note.note && note.percent) {
          this.acumuladoActual += (note.note * note.percent) / 100;
          this.porcentajeTotal += note.percent;
        }
      }
      this.acumulado = (this.acumuladoActual / this.porcentajeTotal) * 100;
      if (this.porcentajeTotal < 100) {
        this.notaRequerida =
          ((this.notaAprobatoria - (this.acumulado * this.porcentajeTotal) / 100) /
            (100 - this.porcentajeTotal)) *
          100;
      } else {
        this.notaRequerida = 0;
      }

      this.porcentajeRestante = 100 - this.porcentajeTotal;
    }
  }

  isNaN(id: any) {
    return isNaN(id);
  }

  resetValues() {
    this.notaMinima = 0;
    this.notaMaxima = 5;
    this.notaAprobatoria = 3;
    this.notaObjetivo = 3;
    this.notaMinimaTemp = 0;
    this.notaMaximaTemp = 5;
    this.notaAprobatoriaTemp = 3;
    this.notaObjetivoTemp = 3;
  }

  saveValues() {
    this.notaMinima = this.notaMinimaTemp;
    this.notaMaxima = this.notaMaximaTemp;
    this.notaAprobatoria = this.notaAprobatoriaTemp;
    this.notaObjetivo = this.notaObjetivoTemp;
  }
}
