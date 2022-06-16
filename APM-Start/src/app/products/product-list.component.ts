import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from 'rxjs';
import { IProduct } from "./product";
import { ProductService } from './product.service';

@Component({
    selector:'pm-products',
    templateUrl:'./product-list.component.html'
})
export class ProductListComponent implements OnInit, OnDestroy{
  constructor(private productService : ProductService){
  }
    pageTitle: string = "Product List";
    imageWidth=50;
    imageMargin=2;
    showImages:boolean = false;
    errorMessage='';
    sub!: Subscription;
    private _listFilter:string = '';
    get listFilter():string{
        return this._listFilter;
    }

    set listFilter(value:string){
        this._listFilter = value;
        console.log(`In Setter ${this._listFilter}`);
        this.performFilterBy(this._listFilter);
    }
    filteredProductList: IProduct[]=[];
    productList: IProduct[] = [];

    performFilterBy(filterCriteria: string) {
        this.filteredProductList = this.productList.filter(x => x.productName.toLowerCase().includes(filterCriteria.toLowerCase()));
    }
    toggleImages():void{
        this.showImages = !this.showImages;
    }
    ngOnInit(): void {
      this.sub = this.productService.getProducts().subscribe({
        next: products => {
          this.productList = products;
          this.filteredProductList = this.productList;
        },
        error: err => this.errorMessage = err
      });
      //this.listFilter = 'Cart';
    }
    ngOnDestroy():void{
      this.sub.unsubscribe();
    }
    onRatingClicked(event:string):void{
      this.pageTitle = `Product List = ${event}`;
    }
}
