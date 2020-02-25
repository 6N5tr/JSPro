import {Component} from '@angular/core';
import {UserService} from './services/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FatherService} from './services/father.service';
import {forkJoin} from 'rxjs';
import {ShoppingCarHeaderService} from './services/shopping-car-header.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public user: any;
  public fathers: any[];
  public fatherForm: FormGroup;
  public shoppingCarHeaderForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _userService: UserService,
    private _fatherService: FatherService,
    private _shoppingCarHeaderService: ShoppingCarHeaderService
  ) {
    this.initVariables();
    this.loadData();
  }

  private initVariables(): void {
    this.user = null;
    this.fathers = [];
    this.fatherForm = this._formBuilder.group({
      name: ['', [Validators.required]],
    });
    this.shoppingCarHeaderForm = this._formBuilder.group({
      state: ['', [Validators.required]],
      date: ['', [Validators.required]],
      total: [0.0, [Validators.required, Validators.min(0)]],
      address: ['', [Validators.required]],
      user: [null, [Validators.required]]
    });
  }

  private loadData(): void {
    const requests = [
      this._fatherService.getFathers()
    ];
    forkJoin(requests).subscribe((results: any[]) => {
      this.fathers = results[0];
    });
  }

  public getUser(username: string, role: string): void {
    this._userService.getUser(username, role).subscribe((result: any[]) => {
      if (result.length) {
        this.user = result[0];
        return;
      }
      this._userService.registerUser({
        username,
        role
      }).subscribe(user => this.user = user);
    });
  }

  public registerFather(): void {
    this._fatherService.registerFather(this.fatherForm.getRawValue())
      .subscribe(father => {
        this.fathers.push(father);
        this.fatherForm.reset();
      });
  }

  public registerShoppingCarHeader(state: string): void {
    this.shoppingCarHeaderForm.get('date').setValue(new Date());
    this.shoppingCarHeaderForm.get('state').setValue(state);
    this.shoppingCarHeaderForm.get('total').setValue(0);
    this.shoppingCarHeaderForm.get('user').setValue(this.user.id);
    if (this.shoppingCarHeaderForm.invalid) {
      return;
    }
    this._shoppingCarHeaderService.registerShoppingCarHeader(this.shoppingCarHeaderForm.getRawValue())
      .subscribe(shoppingCarHeader => {
        this.user.shoppingCarHeaders.push(shoppingCarHeader);
        this.shoppingCarHeaderForm.reset();
      });
  }

  public deleteFather(father: number, index: number): void {
    this._fatherService.deleteFather(father).subscribe(() => this.fathers.splice(index, 1));
  }

  public deleteShoppingCarHeader(shoppingCarHeaderId: number, index: number): void {
    this._shoppingCarHeaderService.deleteShoppingCarHeader(shoppingCarHeaderId)
      .subscribe(() => this.user.shoppingCarHeaders.splice(index, 1));
  }

  public purchaseShoppingCar(shoppingCarHeader: any, index: number): void {
    const body = {
      total: shoppingCarHeader.total,
      date: shoppingCarHeader.date,
      state: 'SHOPPING',
      address: shoppingCarHeader.address
    };
    this._shoppingCarHeaderService.updateShoppingCarHeader(body, shoppingCarHeader.id)
      .subscribe(result => this.user.shoppingCarHeaders[index] = result);
  }

  public changeShoppingCarDetails(details: any[], shoppingCarHeader: any, index: number): void {
    const body = {
      total: 0,
      date: shoppingCarHeader.date,
      state: shoppingCarHeader.state,
      address: shoppingCarHeader.address
    };
    details.map(detail => body.total += detail.subtotal);
    this._shoppingCarHeaderService.updateShoppingCarHeader(body, shoppingCarHeader.id)
      .subscribe(result => this.user.shoppingCarHeaders[index] = result);
  }

}
