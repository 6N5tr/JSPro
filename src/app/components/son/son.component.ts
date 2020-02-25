import {Component, Input, OnInit} from '@angular/core';
import {SonService} from '../../services/son.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-son',
  templateUrl: './son.component.html',
  styleUrls: ['./son.component.css']
})
export class SonComponent implements OnInit {
  @Input()
  public sons: any[];
  @Input()
  public father: number;
  public sonForm: FormGroup;

  constructor(
    private _sonService: SonService,
    private _formBuilder: FormBuilder
  ) {
    this.sons = [];
  }

  ngOnInit() {
    this.initVariables();
  }

  private initVariables(): void {
    this.initSonForm();
  }

  private initSonForm(): void {
    this.sonForm = this._formBuilder.group({
      father: [this.father, [Validators.required]],
      name: ['', [Validators.required]],
      price: [1, [Validators.required, Validators.min(0)]]
    });
  }

  public registerSon(): void {
    this._sonService.registerSon(this.sonForm.getRawValue())
      .subscribe(son => {
        this.sons.push(son);
        this.initSonForm();
      });
  }

  public deleteSon(son: number, index: number): void {
    this._sonService.deleteFather(son)
      .subscribe(() => this.sons.splice(index, 1));
  }

}
