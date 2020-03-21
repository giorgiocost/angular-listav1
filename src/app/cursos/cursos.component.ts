import { Component, OnInit, ElementRef } from "@angular/core";
import { ApiService } from "../shared/service/api.service";
import { ICurso } from "../model/curso";

@Component({
  selector: "app-cursos",
  templateUrl: "./cursos.component.html",
  styleUrls: ["./cursos.component.css"]
})
export class CursosComponent implements OnInit {
  public cursos: ICurso[];
  public cursosReprovados: ICurso[];

  body = [];
  body2 = [];

  constructor(private apiService: ApiService, private el: ElementRef) {}

  ngOnInit() {}

  selection($event?: any) {
    if ($event.target.value !== '') {
      this.listarCursos(+$event.target.value);
      return;
    }
  }

  listSelector($event: any) {
    const curso = $event.toElement.innerText;
    this.body.push({ descricaoarea: curso });
    this.marcador($event);
  }

  marcador($event): string {
    if ($event.target.style.background === 'blue') {
      return ($event.target.style.background = 'red');
    }
    return ($event.target.style.background = 'blue');
  }

  next(array = this.body) {
    array.map(curso => {
      this.body2.push(curso);
      this.body = [];
    });
  }

  remove($event) {
    this.marcador($event);
  }

  listarCursos(id: number) {
    this.apiService.getCursos(id).subscribe(data => {
      // tslint:disable-next-line: no-shadowed-variable
      this.cursos = data.filter(data => data.idciclo === id);
      this.cursosReprovados = data.filter(resp => resp.idciclo !== id);
    });
  }
}
