import { Component, OnInit, OnDestroy } from "@angular/core";

import { MissionService } from "../mission.service";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";

// import Inputmask from "inputmask";
// import * as widgets from 'surveyjs-widgets';
// Import Survey.js
import * as Survey from "survey-angular";
// import { addQuestionTypes } from '../survey/question-types';
// widgets.inputmask(Survey);
@Component({
  selector: "app-hrt-remedies-page",
  templateUrl: "./hrt-remedies-page.component.html",
  styleUrls: ["./hrt-remedies-page.component.scss"],
})
export class HrtRemediesPageComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  private json = {
    showNavigationButtons: false,
    completeText: "",
    showQuestionNumbers: "off",

    pages: [
      {
        name: "Remedies",
        elements: [
          {
            type: "checkbox",
            name: "Select the kinds of remedies you want",
            title: "Select the kinds of remedies you want that are available under s. 37 of the Human Rights Code:",
            isRequired: true,
            hasOther: true,
            "otherErrorText": "Please describe the specific thing you want.",
            otherText: "Something specific (job back, policy…)",
            choices: [
              "Order to stop the discrimination",
              "Declaration that the conduct is discrimination",
              "Steps or programs to address the discrimination (examples: training, policy)",
              "Compensation for injury to dignity, feelings, and self-respect",
              "Compensation for lost wages or other expenses such as moving expenses, photocopying, costs of attending the hearing (keep receipts)",
            ],
          },
        //   {
        //     type: "comment",
        //     name: "Detail - Something specific (job back, policy…)",
        //     visibleIf:
        //       "{Select the kinds of remedies you want} contains 'Something specific (job back, policy…)'",
        //     isRequired: true,
        //   },
          {
            type: "comment",
            name: "Detail - Other",
            visibleIf:
              "{Select the kinds of remedies you want} contains 'Other'",
            isRequired: true,
            maxLength: 2000,
          },
        ],
      },
    ],
  };

  survey: any;
  formData: object;
  constructor(private missionService: MissionService, private router: Router) {
    this.subscription = missionService.missionAnnounced$.subscribe(
      (allFormData) => {
        console.log("allFormData", allFormData);

        if (allFormData.remedies) {
          this.formData = allFormData.remedies;
          console.log("hi!");
        }
        this.subscription.unsubscribe();
      }
    );
  }
  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }
  ngOnInit() {
    // console.log("Survey.Survey.cssType", Survey.Survey.cssType);
    this.initSurvey();

    this.renderSurvey();
  }
  initSurvey() {
    // addQuestionTypes(Survey);
    // console.log("Survey.Survey.cssType", Survey.Survey.cssType);
    // Survey.Survey.cssType = "bootstrap";
    Survey.defaultBootstrapCss.page.root = "sv_page";
    Survey.defaultBootstrapCss.pageDescription = "sv_page_description";
    Survey.defaultBootstrapCss.pageTitle = "sv_page_title";
    Survey.defaultBootstrapCss.navigationButton = "btn btn-primary";
    Survey.defaultBootstrapCss.question.title = "sv_q_title";
    Survey.defaultBootstrapCss.question.description = "sv_q_description small";
    Survey.defaultBootstrapCss.panel.title = "sv_p_title";
    Survey.defaultBootstrapCss.panel.container = "sv_p_container";
    Survey.defaultBootstrapCss.panel.description = "sv_p_description";
    Survey.defaultBootstrapCss.row = "sv_row";
    Survey.defaultBootstrapCss.matrixdynamic.button = "btn btn-default";
    Survey.defaultBootstrapCss.paneldynamic.button = "btn btn-default";
    Survey.defaultBootstrapCss.paneldynamic.root = "sv_p_dynamic"; // not used?
    Survey.defaultBootstrapCss.checkbox.item = "sv-checkbox";
    Survey.defaultBootstrapCss.checkbox.controlLabel = "sv-checkbox-label";
    Survey.defaultBootstrapCss.checkbox.materialDecorator = "";
    Survey.defaultBootstrapCss.radiogroup.item = "sv-radio";
    Survey.defaultBootstrapCss.radiogroup.controlLabel = "sv-checkbox-label";
    Survey.defaultBootstrapCss.radiogroup.materialDecorator = "";

    Survey.StylesManager.applyTheme("bootstrap");
  }
  renderSurvey() {
    console.log("hi!1");
    // let surveyModel =
    this.survey = new Survey.Model(this.json);
    this.survey.maxOthersLength = 255;
    if (this.formData) {
      console.log("hi122!");
      this.survey.data = this.formData;
    }
    console.log("hi!2");
    Survey.SurveyNG.render("surveyElementHRT", { model: this.survey });
    console.log("hi!3");
  }
  handleNextStep() {
    if (this.survey.isLastPage) {
      const validated = this.survey.completeLastPage();
      if (validated) {
        this.missionService.confirmMission({
          name: "remedies",
          data: this.survey.data,
          complete: true,
        });
        this.router.navigateByUrl("hrt/progress");
      }
    } else {
      this.survey.nextPage();
    }
  }
}
