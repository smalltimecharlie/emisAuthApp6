import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { EmisAuthApp6SharedModule } from 'app/shared';
import {
    ConsentComponent,
    ConsentDetailComponent,
    ConsentUpdateComponent,
    ConsentDeletePopupComponent,
    ConsentDeleteDialogComponent,
    consentRoute,
    consentPopupRoute
} from './';

const ENTITY_STATES = [...consentRoute, ...consentPopupRoute];

@NgModule({
    imports: [EmisAuthApp6SharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ConsentComponent,
        ConsentDetailComponent,
        ConsentUpdateComponent,
        ConsentDeleteDialogComponent,
        ConsentDeletePopupComponent
    ],
    entryComponents: [ConsentComponent, ConsentUpdateComponent, ConsentDeleteDialogComponent, ConsentDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EmisAuthApp6ConsentModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
