import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { EmisAuthApp6SharedModule } from 'app/shared';
import {
    SignedUpUsersComponent,
    SignedUpUsersDetailComponent,
    SignedUpUsersUpdateComponent,
    SignedUpUsersDeletePopupComponent,
    SignedUpUsersDeleteDialogComponent,
    signedUpUsersRoute,
    signedUpUsersPopupRoute
} from './';

const ENTITY_STATES = [...signedUpUsersRoute, ...signedUpUsersPopupRoute];

@NgModule({
    imports: [EmisAuthApp6SharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        SignedUpUsersComponent,
        SignedUpUsersDetailComponent,
        SignedUpUsersUpdateComponent,
        SignedUpUsersDeleteDialogComponent,
        SignedUpUsersDeletePopupComponent
    ],
    entryComponents: [
        SignedUpUsersComponent,
        SignedUpUsersUpdateComponent,
        SignedUpUsersDeleteDialogComponent,
        SignedUpUsersDeletePopupComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EmisAuthApp6SignedUpUsersModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
