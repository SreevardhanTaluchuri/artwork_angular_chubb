import {
  ChangeDetectorRef,
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { ArtWork } from 'src/app/interfaces/art';
import { ArtService } from 'src/app/services/art.ts.service';

@Component({
  selector: 'app-art-work',
  templateUrl: './art-work.component.html',
  styleUrls: ['./art-work.component.css'],
})
export class ArtWorkComponent {
  
}
