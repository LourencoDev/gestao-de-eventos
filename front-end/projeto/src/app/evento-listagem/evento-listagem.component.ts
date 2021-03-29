import { EventoService } from '../services/evento.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-evento-listagem',
  templateUrl: './evento-listagem.component.html',
  styleUrls: ['./evento-listagem.component.css']
})
export class EventoListagemComponent implements OnInit {

  constructor(private eventoService: EventoService) { }

  eventos = [];

  ngOnInit(): void {
    this.eventoService.getEventos().subscribe(result => {
      this.eventos = result["eventos"];
    }, (error) => {
      console.log(error);
    });
  }

}
