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
  selector: "app-hrt-group-statistical-information-page",
  templateUrl: "./hrt-group-statistical-information-page.component.html",
  styleUrls: ["./hrt-group-statistical-information-page.component.scss"],
})
export class HrtGroupStatisticalInformationPageComponent
  implements OnInit, OnDestroy {
  subscription: Subscription;
  private json = {
    showNavigationButtons: false,
    completeText: "",
    showQuestionNumbers: "off",

    pages: [
      {
        name: "page1",
        elements: [
          {
            type: "html",
            name: "question1",
            html:
              "<p>\nThe Tribunal wants to ensure that everyone can access and use its process. We will use the following information to know what groups of people are coming to the Tribunal. We share this information with the Office of the Human Rights Commissioner on a <strong>confidential</strong> basis.\n</p>\n<p>\nThis section is <strong>voluntary</strong>. You can choose if you want to give any of this information. Check all that apply.\n</p>",
          },
          {
            type: "radiogroup",
            name: "Indigenous Identity",
            hasOther: true,
            choices: ["First Nations", "Métis", "Inuit"],
            otherText: "Other",
          },
          {
            type: "radiogroup",
            name: "Racial Identity",
            hasOther: true,
            choices: [
              "Indigenous",
              "Black",
              "Asian",
              "South Asian",
              "Latinx",
              "Middle Eastern",
              "White",
              "Mixed Race",
            ],
            otherText: "Other",
          },
          {
            type: "radiogroup",
            name: "Immigration Status",
            hasOther: true,
            choices: [
              "Canadian citizen",
              "Permanant resident",
              "Refugee",
              "Temporary visa",
            ],
            otherText: "Other",
          },
          {
            type: "radiogroup",
            name: "Language",
            hasOther: true,
            choices: ["English", "French", "ASL"],
            otherText: "Other",
          },
          {
            type: "radiogroup",
            name:
              "Disability requiring accommodation in employment and services",
            choices: ["Yes - physical", "Yes - mental health", "Yes cognitive"],
            otherText: "Other",
          },
          {
            type: "radiogroup",
            name: "Gender Identity",
            hasOther: true,
            choices: [
              "Woman",
              "Man",
              "Non-binary",
              "Transgender",
              "Two Spirit",
            ],
            otherText: "Other",
          },
          {
            type: "radiogroup",
            name: "Sexual Orientation",
            hasOther: true,
            choices: ["LGBQ", "Heterosexual"],
            otherText: "Other",
          },
          {
            type: "radiogroup",
            name: "Age",
            choices: ["Under 19", "20-34", "35-49", "50-64", "65 and over"],
            otherText: "Other",
          },
          {
            type: "radiogroup",
            name: "Household",
            hasOther: true,
            choices: [
              "Single parent",
              "Two parent family",
              "Single adult",
              "Two adults",
            ],
            otherText: "Other",
          },
          {
            type: "radiogroup",
            name: "Household Income After Tax",
            choices: [
              "Under $20,000",
              "$20,000 to $39,999",
              "$40,000 to $59,999",
              "$60,000 to $79,999",
              "$80,000 to $99,999",
              "$100,000 or more",
            ],
            otherText: "Other",
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

        if (allFormData.statisticalInformation) {
          this.formData = allFormData.statisticalInformation;
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
          name: "statisticalInformation",
          data: this.survey.data,
          complete: true,
        });
        this.router.navigateByUrl("hrt-group/progress");
      }
    } else {
      this.survey.nextPage();
    }
  }
}
