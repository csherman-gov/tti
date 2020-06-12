import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "app/home/home.component";
import { ResultComponent } from "app/result/result.component";
import { GlossaryEditorComponent } from "app/glossary/editor.component";
import { SurveyPrimaryComponent } from "app/survey/primary.component";
import { SurveyResolver } from "app/survey/survey-resolver.service";
import { SurveyEditorComponent } from "app/survey/editor.component";
import { TermsViewComponent } from "app/home/terms.component";
import { UserStatusComponent } from "app/home/status.component";
import { UserStatusResolver } from "app/home/status-resolver.service";

import { HrtHomePageComponent } from "app/hrt-home-page/hrt-home-page.component";
import { HrtProgressPageComponent } from "app/hrt-progress-page/hrt-progress-page.component";
import { HrtComplainantPageComponent } from "app/hrt-complainant-page/hrt-complainant-page.component";
import { HrtAreaAndGroundsOfDiscriminationComponent } from "app/hrt-area-and-grounds-of-discrimination/hrt-area-and-grounds-of-discrimination.component";
import { HrtDetailsOfTheDiscriminationPageComponent } from "./hrt-details-of-the-discrimination-page/hrt-details-of-the-discrimination-page.component";
import { HrtComplaintFileInTimePageComponent } from "./hrt-complaint-file-in-time-page/hrt-complaint-file-in-time-page.component";
import { HrtRepresentativePageComponent } from "app/hrt-representative-page/hrt-representative-page.component";
import { HrtRespondentsPageComponent } from "app/hrt-respondents-page/hrt-respondents-page.component";
import { HrtLateComplaintsPageComponent } from "./hrt-late-complaints-page/hrt-late-complaints-page.component";
import { HrtOtherRelatedProceedingsPageComponent } from "./hrt-other-related-proceedings-page/hrt-other-related-proceedings-page.component";
import { HrtRemediesPageComponent } from "./hrt-remedies-page/hrt-remedies-page.component";
import { HrtSettlementMeetingPageComponent } from "./hrt-settlement-meeting-page/hrt-settlement-meeting-page.component";
import { HrtReviewPageComponent } from "./hrt-review-page/hrt-review-page.component";
import { HrtThankYouPageComponent } from "./hrt-thank-you-page/hrt-thank-you-page.component";
import { HrtOtherProceedingsPageComponent } from "./hrt-other-proceedings-page/hrt-other-proceedings-page.component";
import { HrtMediationPageComponent } from "./hrt-mediation-page/hrt-mediation-page.component";
import { HrtStatisticalInformationPageComponent } from "./hrt-statistical-information-page/hrt-statistical-information-page.component";
import { HrtGroupHomePageComponent } from "./hrt-group-home-page/hrt-group-home-page.component";
import { HrtGroupProgressPageComponent } from "./hrt-group-progress-page/hrt-group-progress-page.component";
import { HrtGroupRepresentativeComponent } from "./hrt-group-representative/hrt-group-representative.component";
import { HrtGroupRepSutabilityPageComponent } from "./hrt-group-rep-sutability-page/hrt-group-rep-sutability-page.component";
import { HrtGroupComplaintSutabilityPageComponent } from "./hrt-group-complaint-sutability-page/hrt-group-complaint-sutability-page.component";
import { HrtGroupRespondentContactInformationPageComponent } from "./hrt-group-respondent-contact-information-page/hrt-group-respondent-contact-information-page.component";
import { HrtGroupAreaAndDiscriminationPageComponent } from "./hrt-group-area-and-discrimination-page/hrt-group-area-and-discrimination-page.component";
import { HrtGroupDetailsOfDiscriminationPageComponent } from "./hrt-group-details-of-discrimination-page/hrt-group-details-of-discrimination-page.component";
import { HrtGroupTimeLimitPageComponent } from "./hrt-group-time-limit-page/hrt-group-time-limit-page.component";
import { HrtGroupOtherProceedingsPageComponent } from "./hrt-group-other-proceedings-page/hrt-group-other-proceedings-page.component";
import { HrtGroupRemediesPageComponent } from "./hrt-group-remedies-page/hrt-group-remedies-page.component";
import { HrtGroupMediationPageComponent } from "./hrt-group-mediation-page/hrt-group-mediation-page.component";
import { HrtGroupStatisticalInformationPageComponent } from "./hrt-group-statistical-information-page/hrt-group-statistical-information-page.component";
import { HrtGroupReviewPageComponent } from "./hrt-group-review-page/hrt-group-review-page.component";
import { HrtRetaliationHomePageComponent } from "./hrt-retaliation-home-page/hrt-retaliation-home-page.component";
import { HrtRetaliationProgressPageComponent } from "./hrt-retaliation-progress-page/hrt-retaliation-progress-page.component";
import { HrtRetaliationPartyInfoPageComponent } from "./hrt-retaliation-party-info-page/hrt-retaliation-party-info-page.component";
import { HrtRetaliationRoleInComplaintPageComponent } from "./hrt-retaliation-role-in-complaint-page/hrt-retaliation-role-in-complaint-page.component";
import { HrtRetaliationDetailsOfTheRetaliationPageComponent } from "./hrt-retaliation-details-of-the-retaliation-page/hrt-retaliation-details-of-the-retaliation-page.component";

import { HrtRetaliationFileInTimePageComponent } from "./hrt-retaliation-file-in-time-page/hrt-retaliation-file-in-time-page.component";
import { HrtRetaliationOtherProceedingsPageComponent } from "./hrt-retaliation-other-proceedings-page/hrt-retaliation-other-proceedings-page.component";
import { HrtRetaliationRemediesPageComponent } from "./hrt-retaliation-remedies-page/hrt-retaliation-remedies-page.component";
import { HrtRetaliationMediationPageComponent } from "./hrt-retaliation-mediation-page/hrt-retaliation-mediation-page.component";
import { HrtRetaliationStatisticalInformationPageComponent } from "./hrt-retaliation-statistical-information-page/hrt-retaliation-statistical-information-page.component";
import { HrtRetaliationThankYouPageComponent } from './hrt-retaliation-thank-you-page/hrt-retaliation-thank-you-page.component';
import { HrtRetaliationReviewPageComponent } from './hrt-retaliation-review-page/hrt-retaliation-review-page.component';
import { HrtIndigenousPageComponent } from './hrt-indigenous-page/hrt-indigenous-page.component';
import { HrtGroupIndigenousPageComponent } from './hrt-group-indigenous-page/hrt-group-indigenous-page.component';
import { HrtRetaliationIndigenousPageComponent } from './hrt-retaliation-indigenous-page/hrt-retaliation-indigenous-page.component';

const routes: Routes = [
  {
    path: "",
    // children: []
    redirectTo: "hrt",
    // component: HrtHomePageComponent, // This is the original line here, replaced with HRT path below to make FPO pages inaccessible.
    // component: HrtHomePageComponent,
    // data: {
    //   breadcrumb: 'HRT',
    //   survey_path: 'asset/survey_hrt'
    // }
  },
  {
    path: "hrt",
    component: HrtHomePageComponent,
    // data: {
    //   breadcrumb: 'HRT',
    //   survey_path: 'asset/survey_hrt'HrtComplainantPageComponent
    // }
  },
  {
    path: "hrt/complainant",
    component: HrtComplainantPageComponent,
    // data: {
    //   breadcrumb: 'HRT',
    //   HrtLateComplaintsPageComponent
    // }
  },
  {
    path: "hrt/indigenous",
    component: HrtIndigenousPageComponent,
  },
  {
    path: "hrt-group/indigenous",
    component: HrtGroupIndigenousPageComponent,
  },
  {
    path: "hrt-retaliation/indigenous",
    component: HrtRetaliationIndigenousPageComponent,
  },
  {
    path: "hrt/area-and-grounds",
    component: HrtAreaAndGroundsOfDiscriminationComponent,
    // data: {
    //   breadcrumb: 'HRT',
    //   HrtLateComplaintsPageComponent
    // }
  },
  {
    path: "hrt/details-of-the-discrimination",
    component: HrtDetailsOfTheDiscriminationPageComponent,
    // data: {
    //   breadcrumb: 'HRT',
    //   HrtLateComplaintsPageComponent
    // }
  },
  {
    path: "hrt/file-in-time",
    component: HrtComplaintFileInTimePageComponent,
    // data: {
    //   breadcrumb: 'HRT',
    //   HrtLateComplaintsPageComponent
    // }
  },
  {
    path: "hrt/other-proceedings",
    component: HrtOtherProceedingsPageComponent,
    // data: {
    //   breadcrumb: 'HRT',
    //   HrtLateComplaintsPageComponent
    // }
  },
  {
    path: "hrt/mediation",
    component: HrtMediationPageComponent,
    // data: {
    //   breadcrumb: 'HRT',
    //   HrtOtherRelatedProceedingsPageComponent
    // }
  },
  {
    path: "hrt/remedies",
    component: HrtRemediesPageComponent,
    // data: {
    //   breadcrumb: 'HRT',
    //
    //
    // }
  },
  {
    path: "hrt/thank-you",
    component: HrtThankYouPageComponent,
  },
  {
    path: "hrt-group/thank-you",
    component: HrtThankYouPageComponent,
  },
  {
    path: "hrt/review",
    component: HrtReviewPageComponent,
    // data: {
    //   breadcrumb: 'HRT',
    //
    //
    // }
  },
  {
    path: "hrt/statistical-information",
    component: HrtStatisticalInformationPageComponent,
    // data: {
    //   breadcrumb: 'HRT',
    //   HrtOtherRelatedProceedingsPageComponentHrtRemediesPageComponent
    // HrtSettlementMeetingPageComponent
    // }
  },
  {
    path: "hrt/other-related-proceedings",
    component: HrtOtherRelatedProceedingsPageComponent,
    // data: {
    //   breadcrumb: 'HRT',
    // }
  },
  {
    path: "hrt/representative",
    component: HrtRepresentativePageComponent,
  },
  {
    path: "hrt/respondents",
    component: HrtRespondentsPageComponent,
  },
  {
    path: "hrt/progress",
    component: HrtProgressPageComponent,
  },
  {
    path: "hrt-group",
    component: HrtGroupHomePageComponent,
    // data: {
    //   breadcrumb: 'HRT',
    //   survey_path: 'asset/survey_hrt'HrtComplainantPageComponent
    // }
  },
  {
    path: "hrt-group/progress",
    component: HrtGroupProgressPageComponent,
    // data: {
    //   breadcrumb: 'HRT',
    //   survey_path: 'asset/survey_hrt'HrtComplainantPageComponent
    // }
  },
  {
    path: "hrt-group/representative",
    component: HrtGroupRepresentativeComponent,
    // data: {
    //   breadcrumb: 'HRT',
    //   HrtLateComplaintsPageComponent
    // }
  },
  {
    path: "hrt-group/representative-sutability",
    component: HrtGroupRepSutabilityPageComponent,
    // data: {
    //   breadcrumb: 'HRT',
    //   HrtLateComplaintsPageComponent
    // }
  },
  {
    path: "hrt-group/complaint-suitability",
    component: HrtGroupComplaintSutabilityPageComponent,
    // data: {
    //   breadcrumb: 'HRT',
    //   HrtLateComplaintsPageComponent
    // }
  },
  {
    path: "hrt-group/respondent-contact-info",
    component: HrtGroupRespondentContactInformationPageComponent,
  },
  {
    path: "hrt-group/area-and-grounds",
    component: HrtGroupAreaAndDiscriminationPageComponent,
  },
  {
    path: "hrt-group/details-of-the-discrimination",
    component: HrtGroupDetailsOfDiscriminationPageComponent,
  },
  {
    path: "hrt-group/file-in-time",
    component: HrtGroupTimeLimitPageComponent,
  },
  {
    path: "hrt-group/other-proceedings",
    component: HrtGroupOtherProceedingsPageComponent,
  },
  {
    path: "hrt-group/remedies",
    component: HrtGroupRemediesPageComponent,
  },
  {
    path: "hrt-group/mediation",
    component: HrtGroupMediationPageComponent,
  },
  {
    path: "hrt-group/statistical-information",
    component: HrtGroupStatisticalInformationPageComponent,
  },
  {
    path: "hrt-group/review",
    component: HrtGroupReviewPageComponent,
  },
  {
    path: "hrt/progress",
    component: HrtProgressPageComponent,
  },
  {
    path: "qualify",
    component: SurveyPrimaryComponent,
    resolve: {
      // survey: SurveyResolver,
    },
    data: {
      breadcrumb: "Prequalification Survey",
      survey_path: "assets/survey-qualify.json",
      show_sidebar: false,
    },
  },

  {
    path: "hrt-retaliation",
    component: HrtRetaliationHomePageComponent,
  },
  {
    path: "hrt-retaliation/progress",
    component: HrtRetaliationProgressPageComponent,
  },
  {
    path: "hrt-retaliation/party-information",
    component: HrtRetaliationPartyInfoPageComponent,
  },
  {
    path: "hrt-retaliation/role-in-complaint",
    component: HrtRetaliationRoleInComplaintPageComponent,
  },
  {
    path: "hrt-retaliation/details-of-retaliation",
    component: HrtRetaliationDetailsOfTheRetaliationPageComponent,
  },
  {
    path: "hrt-retaliation/file-in-time",
    component: HrtRetaliationFileInTimePageComponent,
  },
  {
    path: "hrt-retaliation/other-proceedings",
    component: HrtRetaliationOtherProceedingsPageComponent,
    // data: {
    //   breadcrumb: 'HRT',
    //   HrtLateComplaintsPageComponent
    // }
  },
  {
    path: "hrt-retaliation/mediation",
    component: HrtRetaliationMediationPageComponent,
    // data: {
    //   breadcrumb: 'HRT',
    //   HrtOtherRelatedProceedingsPageComponent
    // }
  },
  {
    path: "hrt-retaliation/remedies",
    component: HrtRetaliationRemediesPageComponent,
    // data: {
    //   breadcrumb: 'HRT',
    //
    //
    // }
  },
 
  {
    path: "hrt-retaliation/statistical-information",
    component: HrtRetaliationStatisticalInformationPageComponent,
    // data: {
    //   breadcrumb: 'HRT',
    //   HrtOtherRelatedProceedingsPageComponentHrtRemediesPageComponent
    // HrtSettlementMeetingPageComponent
    // }
  },
   {
    path: "hrt-retaliation/thank-you",
    component: HrtRetaliationThankYouPageComponent,
  },
  {
    path: "hrt-retaliation/review",
    component: HrtRetaliationReviewPageComponent,
  },
  {
    path: "prv",
    redirectTo: "prv/survey",
    pathMatch: "full",
  },
  {
    // add a blank :id
    path: "prv/survey",
    component: SurveyPrimaryComponent,
    resolve: {
      userInfo: UserStatusResolver,
    },
    data: {
      breadcrumb: "Provincial Family Test",
      cache_name: "primary",
      survey_path: "assets/survey-primary.json",
      accept_terms: true,
    },
  },
  {
    path: "prv/survey/:id",
    component: SurveyPrimaryComponent,
    resolve: {
      userInfo: UserStatusResolver,
      // to resolve survey json before rendering the component:
      // survey: SurveyResolver,
    },
    data: {
      breadcrumb: "Provincial Family Test",
      cache_name: "primary",
      survey_path: "assets/survey-primary.json",
      accept_terms: true,
    },
  },
  {
    path: "result/:id/:state",
    component: ResultComponent,
    data: {
      breadcrumb: "Survey Results",
    },
  },
  {
    path: "glossary-editor",
    redirectTo: "prv/glossary-editor",
  },
  {
    path: "prv/glossary-editor",
    component: GlossaryEditorComponent,
    data: {
      breadcrumb: "Glossary Editor",
    },
  },
  {
    path: "survey-editor",
    redirectTo: "prv/survey-editor",
  },
  {
    path: "prv/survey-editor",
    component: SurveyEditorComponent,
    resolve: {
      // survey: SurveyResolver,
    },
    data: {
      breadcrumb: "Survey Editor",
      cache_name: "editor",
      survey_path: "assets/survey-primary.json",
    },
  },
  {
    path: "prv/status",
    component: UserStatusComponent,
    resolve: {
      userInfo: UserStatusResolver,
    },
    data: {
      breadcrumb: "Status",
    },
  },
  {
    path: "terms",
    component: TermsViewComponent,
    data: {
      breadcrumb: "Terms and Conditions",
    },
  },
  {
    path: "prv/terms",
    component: TermsViewComponent,
    resolve: {
      userInfo: UserStatusResolver,
    },
    data: {
      breadcrumb: "Terms and Conditions",
    },
  },
  {
    path: "sandbox",
    component: SurveyPrimaryComponent,
    resolve: {
      // survey: SurveyResolver,
    },
    data: {
      breadcrumb: "Survey Sandbox",
      survey_path: "assets/survey-sandbox.json",
      show_sidebar: true,
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule],
  providers: [SurveyResolver],
})
export class AppRoutingModule {}
