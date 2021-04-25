import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AllegroService} from '../allegro.service';
import {Subscription} from 'rxjs';
import {AllegroResponse} from '../model/allegroresponse.model';

@Component({
  selector: 'app-test',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AllegroAuthComponent implements OnInit, OnDestroy {

  private allegroSub: Subscription;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private testService: AllegroService) { }

  ngOnInit(): void {
    const code = this.route.snapshot.queryParamMap.get('code');
    this.allegroSub = this.testService.getToken(code).subscribe(
      responseData => {
        const res: AllegroResponse = responseData;
        this.router.navigate(['/dashboard']);
      }
    );
  }

  ngOnDestroy(): void {
    this.allegroSub.unsubscribe();
  }
}
