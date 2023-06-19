import {Component, OnInit} from '@angular/core';
import {ProductService} from 'src/app/services/product.service';
import {Product} from 'src/app/common/product';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list-grid.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

    products: Product[] = [];
    currentCategoryId: number = 1;
    currentCategoryName: string = "";
    searchMode: boolean = false;
    previousCategoryId: number = 1;

    //new properties for pagination
    thePageNumber: number = 1;
    thePageSize: number = 5;
    theTotalElements: number = 0;

    previousKeyword: string = '';

    constructor(private productService: ProductService,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.paramMap.subscribe(() => {
            this.listProducts();
        });
    }

    listProducts() {
        this.searchMode = this.route.snapshot.paramMap.has('keyword');
        if (this.searchMode) {
            this.handleSearchProducts();
        } else {
            this.handleListProducts();
        }
    }

    private handleSearchProducts() {
        const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;
        //if we a have a different keyword than previous
        //then we set the Pagenumber to 1
        if (this.previousKeyword != theKeyword) {
            this.thePageNumber = 1;
        }
        this.previousKeyword = theKeyword;

        //search products using that keyword
      this.productService.searchProductsPaginate(this.thePageNumber - 1,
          this.thePageSize,
          theKeyword).subscribe(this.processResult());
    }

    handleListProducts() {
        // check if "id" parameter is available
        const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

        if (hasCategoryId) {
            this.currentCategoryName = this.route.snapshot.paramMap.get("name")!;
            // get the "id" param string. convert string to a number using the "+" symbol
            this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
        } else {
            // not category id available ... default to category id 1
            this.currentCategoryId = 1;
            this.currentCategoryName = 'Books';
        }

        //
        // Check if we have a different category than previous
        // Note: Angular will reuse component if it is currently being viewed

        // if we have a different category id than the previous
        // then we set thePageNumber back to 1
        if (this.previousCategoryId != this.currentCategoryId) {
            this.thePageNumber = 1;
        }

        this.currentCategoryId = this.currentCategoryId
        console.log(`currentCategoryId=${this.currentCategoryId}, thePageNumber=${this.thePageNumber}`);


        // now get the products for the given category id
        this.productService.getProductListPaginate(this.thePageNumber - 1, //Pages at Spring Data Rest are 0 based so we have -1
            this.thePageSize,
            this.currentCategoryId)
            .subscribe(this.processResult());
    }

    updatePageSize(pageSize: string) {
        this.thePageSize = +pageSize;
        this.thePageNumber = 1;
        this.listProducts();
    }

    processResult() {
        return (data: any) => {
            this.products = data._embedded.products;
            this.thePageNumber = data.page.number + 1;
            this.thePageSize = data.page.size;
            this.theTotalElements = data.page.totalElements;
        }
    }
}
