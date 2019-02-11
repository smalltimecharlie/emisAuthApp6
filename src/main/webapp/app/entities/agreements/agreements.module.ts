import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { EmisAuthApp6SharedModule } from 'app/shared';
import {
    AgreementsComponent,
    AgreementsDetailComponent,
    AgreementsUpdateComponent,
    AgreementsDeletePopupComponent,
    AgreementsDeleteDialogComponent,
    agreementsRoute,
    agreementsPopupRoute
} from './';

const ENTITY_STATES = [...agreementsRoute, ...agreementsPopupRoute];

@NgModule({
    imports: [EmisAuthApp6SharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        AgreementsComponent,
        AgreementsDetailComponent,
        AgreementsUpdateComponent,
        AgreementsDeleteDialogComponent,
        AgreementsDeletePopupComponent
    ],
    entryComponents: [AgreementsComponent, AgreementsUpdateComponent, AgreementsDeleteDialogComponent, AgreementsDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EmisAuthApp6AgreementsModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
