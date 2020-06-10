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
  selector: "app-hrt-statistical-information-page",
  templateUrl: "./hrt-statistical-information-page.component.html",
  styleUrls: ["./hrt-statistical-information-page.component.scss"],
})
export class HrtStatisticalInformationPageComponent
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
              "<p> The Tribunal wants to ensure that everyone can access and use its process. We use this information to know how the process works for different groups. Your information is <b>confidential</b>. We share it with the Office of the Human Rights Commissioner on a confidential basis. We do not give it to the Respondents. We share only statistics or “aggregated data” with the public. </p> <p> This section is <b>voluntary</b>. You can complete all, some, or none. Check all that apply. </p>",
          },
          {
            type: "radiogroup",
            name: "Indigenous Identity",
            hasOther: true,
            choices: ["First Nations", "Métis", "Inuit"],
            showClearButton: true,
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
              "East Asian",
              "South Asian",
              "Latinx",
              "Middle Eastern",
              "White",
              "Mixed Race",
            ],
            showClearButton: true,
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
            showClearButton: true,
            otherText: "Other",
          },
          {
            type: "radiogroup",
            name: "Primary Language",
            hasOther: true,
            choices: [
              "English",
              "French",
              "ASL",
              "Chinese Traditional",
              "Chinese Simplified",
              "Punjabi",
              "Tagalog",
              "Farsi",
              "Korean",
            ],
            showClearButton: true,
            otherText: "Other",
          },
          {
            type: "radiogroup",
            name:
              "Disability requiring accommodation in employment and services",
            choices: [
              "Pain-related",
              "Flexibility",
              "Mobility",
              "Dexterity",
              "Seeing",
              "Hearing",
              "Deafblind",
              "Mental health-related",
              "Cognitive",
              "Memory",
              "Learning",
              "Developmental",
              "Unknown",
            ],
            showClearButton: true,
            otherText: "Other",
            hasOther: true
          },
          {
            type: "radiogroup",
            name: "Gender Identity",
            hasOther: true,
            choices: [
              "Woman",
              "Man",
              "Intersex",
              "Non-binary",
              "Transgender",
              "Two Spirit",
            ],
            showClearButton: true,
            otherText: "Other",
          },
          {
            type: "radiogroup",
            name: "Sexual Orientation",
            hasOther: true,
            choices: ["LGBQ", "Heterosexual"],
            showClearButton: true,
            otherText: "Other",
          },
          {
            type: "radiogroup",
            name: "Age",
            choices: ["Under 19", "20-34", "35-49", "50-64", "65 and over"],
            showClearButton: true,
            otherText: "Other",
          },
          {
            type: "radiogroup",
            name: "Household",
            hasOther: true,
            choices: [
              "Single parent family",
              "Two parent family",
              "Single adult",
              "Two adults",
            ],
            showClearButton: true,
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
            showClearButton: true,
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
        this.router.navigateByUrl("hrt/progress");
      }
    } else {
      this.survey.nextPage();
    }
  }
}
