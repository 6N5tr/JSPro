import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ShoppingCarDetailService} from '../../services/shopping-car-detail.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-shopping-car-detail',
  templateUrl: './shopping-car-detail.component.html',
  styleUrls: ['./shopping-car-detail.component.css']
})
export class ShoppingCarDetailComponent implements OnInit {
  @Input()
  public shoppingCarHeader: number;
  @Input()
  public fathers: any[];
  @Input()
  public shoppingCarState: string;
  @Output()
  public handlerShoppingCarDetails: EventEmitter<any[]>;
  public shoppingCarDetails: any[];
  public shoppingCarDetailForm: FormGroup;
  public sons: any[];

  constructor(
    private _shoppingCarDetailService: ShoppingCarDetailService,
    private _formBuilder: FormBuilder
  ) {
    this.handlerShoppingCarDetails = new EventEmitter<any[]>();
  }

  ngOnInit() {
    this.initVariables();
    this.getShoppingCarDetails();
  }

  private initVariables(): void {
    this.shoppingCarDetails = [];
    this.initShoppingCarDetailForm();
    this.initSons();
  }

  private initShoppingCarDetailForm(): void {
    this.shoppingCarDetailForm = this._formBuilder.group({
      shoppingCarHeader: [0],
      son: [null, [Validators.required]],
      price: [0],
      quantity: [1, [Validators.required, Validators.min(1)]],
      subtotal: [0, [Validators.required]],
    });
  }

  private initSons(): void {
    this.sons = [];
    this.fathers.map(father => {
      father.sons.map(son => this.sons.push(son));
    });
  }

  public registerShoppingCarDetail(): void {
    this.shoppingCarDetailForm.get('shoppingCarHeader').setValue(this.shoppingCarHeader);
    this.setValuesShoppingCarDetail();
    this._shoppingCarDetailService.registerShoppingCarDetail(this.shoppingCarDetailForm.getRawValue())
      .subscribe(shoppingCarDetail => {
        this.shoppingCarDetails.push(shoppingCarDetail);
        this.initShoppingCarDetailForm();
        this.handlerShoppingCarDetails.emit(this.shoppingCarDetails);
      });
  }

  private setValuesShoppingCarDetail(): void {
    const son = this.sons.find(x => x.id == this.shoppingCarDetailForm.get('son').value);
    this.shoppingCarDetailForm.get('subtotal').setValue(son.price * this.shoppingCarDetailForm.get('quantity').value);
    this.shoppingCarDetailForm.get('price').setValue(son.price);
  }

  private getShoppingCarDetails(): void {
    this._shoppingCarDetailService.getShoppingCarDetails(this.shoppingCarHeader)
      .subscribe(shoppingCarDetails => this.shoppingCarDetails = shoppingCarDetails);
  }

  public deleteShoppingCarDetail(shoppingCarDetail: number, index: number): void {
    this._shoppingCarDetailService.deleteShoppingCarDetail(shoppingCarDetail)
      .subscribe(() => {
        this.shoppingCarDetails.splice(index, 1);
        this.handlerShoppingCarDetails.emit(this.shoppingCarDetails);
      });
  }
}
