import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AbmAlumnosComponent } from './abm-alumnos/abm-alumnos.component';

export interface Estudiante {
  id: number;
  nombre: string;
  apellido: string;
  fecha_registro: Date;
}

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.scss']
})
export class TablaComponent {

  estudiantes: Estudiante[] = [
    {
      id: 1,
      nombre: 'Santiago',
      apellido: 'Gonzalez',
      fecha_registro: new Date()
    },
    {
      id: 2,
      nombre: 'Alan',
      apellido: 'Olivero',
      fecha_registro: new Date()
    },
    {
      id: 3,
      nombre: 'Candelaria',
      apellido: 'Miguez',
      fecha_registro: new Date()
    },
  ];

  dataSource = new MatTableDataSource(this.estudiantes);

  displayedColumns: string[] = ['id', 'nombreCompleto', 'fecha_registro'];

  aplicarFiltros(ev: Event): void {
    const inputValue = (ev.target as HTMLInputElement)?.value;
    this.dataSource.filter = inputValue?.trim()?.toLowerCase();
  }

  constructor(private matDialog: MatDialog) {}


  abrirABMAlumnos(): void {
    const dialog = this.matDialog.open(AbmAlumnosComponent)
    dialog.afterClosed().subscribe((valor) => {
      if (valor) {
        this.dataSource.data = [
          ...this.dataSource.data,
          {
            ...valor,
            fecha_registro: new Date(),
            id: this.dataSource.data.length + 1,
          }
        ];
      }
    })
  }
}
