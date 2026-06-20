import { maxLength, required, schema,max,min, email, minLength } from "@angular/forms/signals";
import { computed, signal, Signal } from "@angular/core";
import { HttpErrorResponse, httpResource } from "@angular/common/http";
//import { toObservable, toSignal } from "@angular/core/rxjs-interop";
import { debouncSignal } from "../signal-utilities";


export interface MedItem {
  brand: string;
  name: string;
  notes: string;
  expiryDate: string;
  quantity: number;
  price: number;
  //email:string;
}

export const initialData:MedItem={
  brand:'',
  name:'',
  notes:'',
  expiryDate:'',
  quantity:0,
  price:0,
  //email:''
};

export const MedItemSchema= schema<MedItem>((rootpath)=>{
  required(rootpath.brand,{message:'Brand is required'});
  maxLength(rootpath.brand,20,{message:'Maxmimum length 20'});

  required(rootpath.name,{message:'name is required'});
  maxLength(rootpath.brand,20,{message:'Maxmimum length 20'});

  required(rootpath.expiryDate,{message:'expiryDate is required'});

  required(rootpath.quantity,{message:'quantity is required'});
  min(rootpath.quantity,0,{message:"Quantity can't be negative"});
  max(rootpath.quantity,10,{message:"Quantity can't be more than 10"});

  required(rootpath.price,{message:'price is required'});
  min(rootpath.price,0,{message:"Quantity can't be negative"});

  // required(rootpath.email,{message:'Email address is required'});
  // email(rootpath.email,{message:'Please enter a valid email address'});
  // minLength(rootpath.email,6,{message:'The email must be atleast 6 characters long'});
});


export class MedService{


  private medUrl='http://localhost:5001/api/Med';


  // Writable signal fed directly from your search box HTML input event
  searchMed=signal<string>('');

  //searchText$=toObservable(this.searchMed).pipe(
    //debounceTime(400)
  //);

  //searchText=toSignal(this.searchText$);

  // Debounced read-only signal wrapper preventing excessive server queries
  searchText=debouncSignal(this.searchMed,400);

  
  
  //private medResource=httpResource<medResponse>(()=>
  //  `${this.medUrl}?search=${this.searchMed()}`
  //);

 // private medResources=httpResource<medResponse>(()=>
  //  `${this.medUrl}?search=${this.searchText()}`
  //);


  // Modern HTTP Resource tracking search param shifts reactively
  private medResource=httpResource<medResponse>(()=>({
    url:this.medUrl,
    method:'GET',
    headers:{
      accept:'application/json'
    },
    params:{
      search: this.searchText() ?? '',
    },
  }));

  // private medResource=httpResource<MedItem>(()=>({
  //   url:this.medUrl,
  //   method:'GET',
  //   headers:{
  //     accept:'application/json'
  //   },
  //   params:{
  //     search: this.searchText() ?? '',
  //   },
  // }));
   


  // Clean computed properties exposed directly to your presentation layer 
  medicines = computed<MedItem[]>(() => this.medResource.value()?.results ?? []);
  errors = computed<HttpErrorResponse | undefined>(() => this.medResource.error() as HttpErrorResponse);
  isloading = computed<boolean>(() => this.medResource.isLoading()); // Fixed missing function parentheses ()


  // medicines=computed(()=>this.medResource.value()?.results??[] as MedItem[]);
  // errors=computed(()=>this.medResource.error() as HttpErrorResponse);
  // isloading=computed(()=>this.medResource.isLoading);


  // medicines=computed(()=>this.medResource.value() ?? [] as MedItem[]);
  // errors=computed(()=>this.medResource.error() as HttpErrorResponse);
  // isloading=computed(()=>this.medResource.isLoading);
}

export interface medResponse{
  count:number;
  next:string;
  previous:string;
  results:MedItem[];
}