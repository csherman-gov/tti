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
  selector: "app-hrt-retaliation-details-of-the-retaliation-page",
  templateUrl:
    "./hrt-retaliation-details-of-the-retaliation-page.component.html",
  styleUrls: [
    "./hrt-retaliation-details-of-the-retaliation-page.component.scss",
  ],
})
export class HrtRetaliationDetailsOfTheRetaliationPageComponent
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
            name: "question2",
            html:
              "<p>\nTo show possible retaliation, you must show:\n</p>\n<ul><li>\nThe Respondent harmed or threatened to harm you, and \n</li><li>\nThe Respondent did this to retaliate against you for your role in a complaint\n\n</li></ul>\n<p>\nYou will be asked to give details for each Respondent.\n</p>",
          },
          {
            type: "paneldynamic",
            name: "Details of the Retaliation for each Respondent",
            templateElements: [
              {
                type: "text",
                name: "Respondent",
                titleLocation: "left",
              },
              {
                type: "comment",
                name:
                  "Describe in a few words the conduct that you say is retaliation",
                description:
                  "Information. Conduct that can be retaliation is:\nEvicting                                 -  Expelling                                   -   Denying a right or benefit\nFiring                                    -   Intimidating or Coercing            -  Threatening to do one of these things\nSuspending                          -   Penalizing                                 -   Other similar conduct\nInstructions. Give a short answer here. You will give details below. Your short answer helps us understand the details you give below.\nExamples. “This Respondent fired me.” “This Respondent threatened me.” \n",
              },
              {
                type: "matrixdynamic",
                name:
                  "Give details about this Respondent’s conduct that you say is retaliation.",
                description:
                  "Be specific\nExample. Do not say, “This person threatened me.” Write out their words and actions.\nIf you don’t know the exact date, give an approximate date. Examples. 2020/02/23 or 2020/02\n",
                columns: [
                  {
                    name: "Conduct",
                    cellType: "comment",
                    isRequired: true,
                    rows: 1,
                  },
                  {
                    name: "Date",
                    cellType: "text",
                    isRequired: true,
                    inputType: "date",
                    max: "2999-12-31",
                  },
                ],
                choices: [1, 2, 3, 4, 5],
                rowCount: 1,
                minRowCount: 1,
              },
              {
                type: "comment",
                name:
                  "Explain why you think this conduct is retaliation for your role in a complaint",
                description:
                  "Examples:\n“I talked about discrimination at work. My boss said he’d never promote me if I made a complaint.”\n“I filed a discrimination complaint against my landlord. Two months later the landlord sued me in court. The lawsuit had no basis. It was just to smear my character.”\n“After I filed a complaint, my manager investigated me. My employer suspended me for 5 days for being late to work once. At most, this deserved a verbal warning.”\nConsider getting help if you are not sure. See the Resources Sheet at the end of the Form. ",
              },
            ],
            panelCount: 1,
            minPanelCount: 1,
            maxPanelCount: 10,
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

        if (allFormData.detailsOfRetaliation) {
          this.formData = allFormData.detailsOfRetaliation;
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
          name: "detailsOfRetaliation",
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
