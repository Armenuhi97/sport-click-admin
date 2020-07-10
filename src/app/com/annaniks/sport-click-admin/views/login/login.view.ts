import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { takeUntil, finalize } from 'rxjs/operators';
import { LoginService } from '../../services/login.service';
import { LoadingService } from '../../services/loading.service';
import { CookieService } from 'ngx-cookie-service';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login-view',
    templateUrl: 'login.view.html',
    styleUrls: ['login.view.scss']
})

export class LoginViewComponent implements OnInit, OnDestroy {
    public errorMessage: string;
    public loginForm: FormGroup;
    private _unsubscribe$ = new Subject<void>();
    constructor(private _fb: FormBuilder,
        private _loadingService:LoadingService,
        private _cookieService:CookieService,
        private _router:Router,
        private _loginService:LoginService) { }

    ngOnInit() {
        this._initForm()
    }
    private _initForm() {
        this.loginForm = this._fb.group({
            email: [null, [Validators.required, Validators.email, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}$/)]],
            password: [null, Validators.required]
        })
    }
    public login(): void {
        this.errorMessage = ''
        this._loadingService.showLoading();
        const formValue = this.loginForm.value;
        const sendingData = {
            username: formValue.email,
            password: formValue.password
        };
        this._loginService.login(sendingData)
            .pipe(
                takeUntil(this._unsubscribe$),
                finalize(() => this._loadingService.hideLoading())
            )
            .subscribe((data: any) => {
                this._cookieService.set('accessToken', data.access, null, '/');
                this._cookieService.set('refreshToken', data.refresh, null, '/');
                this._router.navigate(['/'])
            },
                (error) => {
                    if (error.status === 401 || error.status === 404) {
                        this.errorMessage = 'Неправильный email или пароль';
                    }
                });

    }

    ngOnDestroy() {
        this._unsubscribe$.next();
        this._unsubscribe$.complete();
    }
}