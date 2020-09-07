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
  selector: "app-hrt-retaliation-remedies-page",
  templateUrl: "./hrt-retaliation-remedies-page.component.html",
  styleUrls: ["./hrt-retaliation-remedies-page.component.scss"],
})
export class HrtRetaliationRemediesPageComponent implements OnInit, OnDestroy {
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
            title: "Select the kinds of remedies you want that are available under s. 37 of the Human Rights Code",
            "otherErrorText": "Please describe the specific thing you want.",
            isRequired: true,
            choices: [
              "Order to stop the retaliation",
              "Declaration that the conduct is retaliation",
              "Steps or programs to address the retaliation (examples: training, policy)",
              "Compensation for injury to dignity, feelings, and self-respect",
              "Compensation for lost wages or other expenses such as moving expenses, photocopying, costs of attending the hearing (keep receipts)",
            ],
            hasOther: true,
            validators: [ { type: "expression", text: "max 255 characters.", expression: "{Select the kinds of remedies you want-Comment}.size >= 255" } ],
            otherText: "Something specific (example: job back)",
          },
          {
            type: "comment",
            name: "Detail - Something specific (example: job back)",
            visibleIf:
              "{Select the kinds of remedies you want} contains 'Something specific (example: job back)'",
            maxLength: 32768,
            isRequired: true,
          },
          {
            type: "comment",
            name: "Detail - Other",
            visibleIf:
              "{Select the kinds of remedies you want} contains 'Other'",
	          maxLength: 32768,
            isRequired: true,
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
    // this.initSurvey();

    this.renderSurvey();
  }

  renderSurvey() {
    console.log("hi!1");
    // let surveyModel =
    this.survey = new Survey.Model(this.json);
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
        this.router.navigateByUrl("hrt-retaliation/progress");
      }
    } else {
      this.survey.nextPage();
    }
  }
}
