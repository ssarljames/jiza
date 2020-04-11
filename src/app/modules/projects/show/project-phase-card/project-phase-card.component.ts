import { Component, OnInit, Input } from '@angular/core';
import { ProjectPhase } from 'src/app/models/project-phase/project-phase';

@Component({
  selector: 'app-project-phase-card',
  templateUrl: './project-phase-card.component.html',
  styleUrls: ['./project-phase-card.component.scss']
})
export class ProjectPhaseCardComponent implements OnInit {

  @Input() phase: ProjectPhase;
  @Input() isLoaded: boolean;

  constructor() { }

  ngOnInit(): void {

  }

}
