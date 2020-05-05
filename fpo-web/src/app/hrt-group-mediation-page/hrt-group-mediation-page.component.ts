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
  selector: "app-hrt-group-mediation-page",
  templateUrl: "./hrt-group-mediation-page.component.html",
  styleUrls: ["./hrt-group-mediation-page.component.scss"],
})
export class HrtGroupMediationPageComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  private json = {
    showNavigationButtons: false,
    completeText: "",

    pages: [
      {
        name: "Mediation",
        elements: [
          {
            type: "html",
            name: "question1",
            html:
              "<p>\nAt a \"mediation\", an expert mediator works with you and the respondent to find a solution to your complaint. Settlement is voluntary. If you can’t agree, the process continues. \n</p>\n<p>Mediation is free. </p>\n<p>What you and the respondent say in mediation is confidential. </p></p>\n<p>A mediator does not act for either party.</p><p>You can bring your lawyer, advocate, or a support person</p> <p>You don’t have to be in the same room as a respondent to participant in mediation. The mediator can speak to you and the respondent separately.</p> <p>For more information see the Tribunal’s website <a href='www.bchrt.bc.ca' target='_blank'>www.bchrt.bc.ca</a>. Search “settle a complaint“.</p>",
          },
          {
            type: "radiogroup",
            name: "Do you want to attend a mediation?",
            isRequired: true,
            choices: ["Yes", "No"],
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

        if (allFormData.mediation) {
          this.formData = allFormData.mediation;
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
          console.log('this.survey.data ', this.survey.data)
        this.missionService.confirmMission({
          name: "mediation",
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
