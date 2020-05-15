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
  selector: "app-hrt-mediation-page",
  templateUrl: "./hrt-mediation-page.component.html",
  styleUrls: ["./hrt-mediation-page.component.scss"],
})
export class HrtMediationPageComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  private json = {
    showNavigationButtons: false,
    completeText: "",
    showQuestionNumbers: "off",

    pages: [
      {
        name: "Mediation",
        elements: [
            {
                type: "html",
                name: "question1",
                html:
                  '<h4>Information</h3><ul> <li> At a "mediation", a trained mediator works with you and the respondent to find a solution to your complaint. Settlement is voluntary. If you can’t agree, the process continues. </li> <li> If you settle your complaint, the process if usually much faster. If you don’t settle, there are <a href="http://www.bchrt.bc.ca/complaint-process/steps.htm">steps</a> you must take before a hearing where you can prove your complaint. </li> <li> Mediation is free. </li> <li>  What you and the respondent say in mediation is confidential.</li> <li>  A mediator does not act for either party.</li> <li> You can bring your representative or a support person </li> <li> You don’t have to be in the same room as a respondent to participant in mediation. The mediator can speak to you and the respondent separately. </li> <li> For more information see <a href="http://www.bchrt.bc.ca/complaint-process/settle/index.htm" target="_blank">the Tribunal’s website</a> </li> </ul>',
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
        this.missionService.confirmMission({
          name: "mediation",
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
