import { Component, Inject } from "@angular/core";
import { takeUntil } from 'rxjs/operators';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { LoadingService } from '../../services';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-add-country-modal',
    templateUrl: 'add-country.modal.html',
    styleUrls: ['add-country.modal.scss']
})
export class AddCountryModalComponent {
    public countryForm: FormGroup;
    unsubscribe$ = new Subject<void>()
    constructor(@Inject(MAT_DIALOG_DATA) private _data,
        private _fb: FormBuilder,
        private _loadingService: LoadingService,       
        private _dialogRef: MatDialogRef<AddCountryModalComponent>) {
    }
    ngOnInit() {
        this._initForm()
    }
    private _initForm() {
        this.countryForm = this._fb.group({
            country: [null, Validators.required]
        })
    }
    public addCountry() {
        // if (this.countryForm.valid) {
        //     this._loadingService.showLoading();
        //     this._userInfoService.addLink({
        //         "name": this.countryForm.get('name').value,
        //         "creator": this._creator
        //     }).pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
        //         this._dialogRef.close(true)
        //         this._loadingService.hideLoading()
        //     })
           
        // }
    }
    public close() {
        this._dialogRef.close()
    }
    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
 }