import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { EmisAuthApp6SharedModule } from 'app/shared';
import {
    CognitoRegistrationsComponent,
    CognitoRegistrationsDetailComponent,
    CognitoRegistrationsUpdateComponent,
    CognitoRegistrationsDeletePopupComponent,
    CognitoRegistrationsDeleteDialogComponent,
    cognitoRegistrationsRoute,
    cognitoRegistrationsPopupRoute
} from './';

const ENTITY_STATES = [...cognitoRegistrationsRoute, ...cognitoRegistrationsPopupRoute];

@NgModule({
    imports: [EmisAuthApp6SharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        CognitoRegistrationsComponent,
        CognitoRegistrationsDetailComponent,
        CognitoRegistrationsUpdateComponent,
        CognitoRegistrationsDeleteDialogComponent,
        CognitoRegistrationsDeletePopupComponent
    ],
    entryComponents: [
        CognitoRegistrationsComponent,
        CognitoRegistrationsUpdateComponent,
        CognitoRegistrationsDeleteDialogComponent,
        CognitoRegistrationsDeletePopupComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EmisAuthApp6CognitoRegistrationsModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
