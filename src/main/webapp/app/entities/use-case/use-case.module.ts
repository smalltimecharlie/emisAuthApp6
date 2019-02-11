import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { EmisAuthApp6SharedModule } from 'app/shared';
import {
    UseCaseComponent,
    UseCaseDetailComponent,
    UseCaseUpdateComponent,
    UseCaseDeletePopupComponent,
    UseCaseDeleteDialogComponent,
    useCaseRoute,
    useCasePopupRoute
} from './';

const ENTITY_STATES = [...useCaseRoute, ...useCasePopupRoute];

@NgModule({
    imports: [EmisAuthApp6SharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        UseCaseComponent,
        UseCaseDetailComponent,
        UseCaseUpdateComponent,
        UseCaseDeleteDialogComponent,
        UseCaseDeletePopupComponent
    ],
    entryComponents: [UseCaseComponent, UseCaseUpdateComponent, UseCaseDeleteDialogComponent, UseCaseDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EmisAuthApp6UseCaseModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
