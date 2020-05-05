import { Component, OnInit, OnDestroy } from '@angular/core';

import { MissionService } from '../mission.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
// Import Survey.js
import * as Survey from 'survey-angular';

@Component({
  selector: 'app-hrt-representative-page',
  templateUrl: './hrt-representative-page.component.html',
  styleUrls: ['./hrt-representative-page.component.scss']
})
export class HrtRepresentativePageComponent implements OnInit, OnDestroy {
  subscription: Subscription;


  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }

  survey: any
  completedSteps = {
    step1: false,
    step2: false
  }
  currentStep = {
    home: true,
    step1: false,
    step2: false,
  }
  showForm = ''
  displayingProgressPage = false


  private json = {
    "showNavigationButtons": false,
    "completeText": "",
    "pages": [
      {
        "name": "Have a Representative?",
        "elements": [
          {
            type: "radiogroup",
            name: "Do you have a representative",
            title: "Is there someone that will represent you in this complaint? (lawyer or other person)",
            isRequired: true,
            colCount: 1,
            choices: [
              {
                text: "Yes",
                value: "Yes"
              },
              {
                text: "No",
                value: "No"
              }
            ]
          },
          {
            visibleIf: "{Do you have a representative} == 'Yes'",
            name: "Name of the representative",
            type: "text",
            title: "Name of lawyer or other person who represents you in this complaint: ",
            isRequired: true,
            width: "50%",
          },
        ]
      },
    ],
    "showQuestionNumbers": "off"
  };

  formData: object
  constructor(private missionService: MissionService, private router: Router) {
    this.subscription = missionService.missionAnnounced$.subscribe(
      allFormData => {
        console.log('allFormData', allFormData)

        if (allFormData.representative) {
          this.formData = allFormData.representative
        }
        this.subscription.unsubscribe();

      });
  }

  // -----------------------------------------------------------------------------------------Start
  // -----------------------------------------------------------------------------------------End



  ngOnInit() {

    this.survey = new Survey.Model(this.json);
    this.initSurvey()
    Survey
      .SurveyNG
      .render("surveyElementHRT", { model: this.survey });
  }


  initSurvey() {
    // addQuestionTypes(Survey);
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

    // load data from sessionStorage if there is one
    this.survey.data = this.formData


  }

  handleNextStep() {

    if (this.survey.isLastPage) {
      const validated = this.survey.completeLastPage()
      if (validated) {
        this.missionService.confirmMission({
          name: 'representative',
          data: this.survey.data,
          complete: true
        });
        this.router.navigateByUrl('hrt/progress')
      }
    } else {
      this.survey.nextPage()
    }



  }


}
