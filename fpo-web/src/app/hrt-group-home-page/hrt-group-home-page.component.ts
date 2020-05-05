import { Component, OnInit, OnDestroy } from "@angular/core";

import { MissionService } from "../mission.service";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";
import { addQuestionTypes } from "../survey/question-types";
// import * as widgets from 'surveyjs-widgets';
// Import Survey.js
import * as Survey from "survey-angular";
// widgets.inputmask(Survey);

@Component({
  selector: "app-hrt-group-home-page",
  templateUrl: "./hrt-group-home-page.component.html",
  styleUrls: ["./hrt-group-home-page.component.scss"],
})
export class HrtGroupHomePageComponent implements OnInit, OnDestroy {
  subscription: Subscription;

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }

  survey: any;
  completedSteps = {
    step1: false,
    step2: false,
  };
  currentStep = {
    home: true,
    step1: false,
    step2: false,
  };
  showForm = "";
  displayingProgressPage = false;

  private json = {
    showNavigationButtons: false,
    completeText: "HE",
    pages: [
      {
        name: "Start",
        elements: [
          {
            type: "radiogroup",
            name: "form_timeout",
            title: "Are you using a public computer?",
            isRequired: true,
            colCount: 1,
            choices: [
              {
                text:
                  "I am using a public computer (i.e. library, internet café, Service BC location)",
                value:
                  "I am using a public computer (i.e. library, internet café, Service BC location)",
              },
              {
                text: "I am using a private computer",
                value: "I am using a private computer",
              },
            ],
          },
        ],
      },
    ],
    showQuestionNumbers: "off",
  };

  formData: object;
  constructor(private missionService: MissionService, private router: Router) {
      console.log('why??????')
    this.subscription = missionService.missionAnnounced$.subscribe(
      (allFormData) => {
        console.log("allFormData", allFormData);

        if (allFormData.home) {
          this.formData = allFormData.home;
        }
        // this.subscription.unsubscribe();
      }
    );
  }
  confirm() {
    // this.confirmed = true;
    if (this.survey.completeLastPage()) {
      this.missionService.confirmMission({
        name: "home",
        data: this.survey.data,
      });
      console.log(this.survey);
      this.router.navigateByUrl("hrt-group/progress");
    }
  }

  ngOnInit() {
    // this.initSurvey()
    this.survey = new Survey.Model(this.json);
    // load data from sessionStorage if there is one
    this.survey.data = this.formData;

    Survey.SurveyNG.render("surveyElementHRT", { model: this.survey });
    this.survey.onComplete.add(function (result) {
      document.querySelector("#surveyResult").textContent =
        "Result JSON:\n" + JSON.stringify(result.data, null, 3);
    });
  }

  initSurvey() {
    addQuestionTypes(Survey);
    console.log("Survey.Survey.cssType", Survey.Survey.cssType);
    Survey.Survey.cssType = "bootstrap";
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
  }
}
