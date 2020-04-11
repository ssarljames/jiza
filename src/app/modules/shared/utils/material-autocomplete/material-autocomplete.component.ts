import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';


export interface MaterialAutoCompleteOption {
  value: any;
  label: string;
}

export interface MaterialAutocompleteFetchOption {
  url: string;
  payload?: any;
  mapResult(result: any): MaterialAutoCompleteOption[];
}

@Component({
  selector: 'app-material-autocomplete',
  templateUrl: './material-autocomplete.component.html',
  styleUrls: ['./material-autocomplete.component.scss']
})
export class MaterialAutocompleteComponent implements OnInit {

  @Input() control: FormControl;
  @Input() label: string;
  @Input() class: string;
  @Input() placeholder: string;
  @Input() icon: string;
  @Input() source: MaterialAutoCompleteOption[];
  @Input() fetch: MaterialAutocompleteFetchOption;

  selected; string;

  options: MaterialAutoCompleteOption[] = [];

  search: FormControl;

  constructor(private http: HttpClient) {
    this.search = new FormControl('');

  }

  ngOnInit(): void {

    if(this.source)
      this.options = this.source;

    this.placeholder = this.placeholder ? this.placeholder : this.label ;
    this.label = this.label ? this.label : this.placeholder ;

    if(this.fetch){
      this.search.valueChanges.subscribe( value => {

        this.http.get(this.fetch.url, {
          params: {
            ...this.fetch.payload,
            q: value
          }
        }).subscribe( response => {
          this.options = this.fetch.mapResult(response);
        });

      })
    }
    else{
      this.search.valueChanges.subscribe( (value: string) => {
        this.options = this.source.filter( o => o.label.toLowerCase().indexOf(value.toLowerCase()) > -1);
      })
    }

  }

  select(e: MatAutocompleteSelectedEvent): void{
    this.selected = e.option.viewValue;
    this.control.setValue(e.option.value);
  }


  clearValue(): void{
    this.selected = '';
    this.search.setValue('');
    this.control.setValue(null);
  }


}
