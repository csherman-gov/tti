import { Component, OnInit, OnDestroy } from '@angular/core';

import { MissionService } from '../mission.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
// import Inputmask from "inputmask";
// import * as widgets from 'surveyjs-widgets';
// Import Survey.js
import * as Survey from 'survey-angular';
// import { addQuestionTypes } from '../survey/question-types';
// widgets.inputmask(Survey);
@Component({
  selector: 'app-hrt-settlement-meeting-page',
  templateUrl: './hrt-settlement-meeting-page.component.html',
  styleUrls: ['./hrt-settlement-meeting-page.component.scss']
})
export class HrtSettlementMeetingPageComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  private json = {
    "showNavigationButtons": false,
    "completeText": "",
    "pages": [
      {
        "name": "Complainant Type",
        "elements": [
          {
            "type": "html",
            "name": "Note",
            "html": "<p>The Tribunal can provide a mediator to resolve the complaint informally and voluntarily. This is called a \"<strong>settlement meeting</strong>\"</p>\n<p>This is a free service. What is said during the settlement meeting is confidential and cannot be used against either party later</p>"
           },
          {
            "type": "radiogroup",
            "name": "Do you want to participate in a settlement meeting?",
            "isRequired": true,
            "choices": [
              "Yes",
              "No"
            ]
          }
        ]
      },
    ],
    "showQuestionNumbers": "off"
  };
  survey: any
  formData: object
  constructor(private missionService: MissionService, private router: Router) {
    this.subscription = missionService.missionAnnounced$.subscribe(
      allFormData => {
        console.log('allFormData', allFormData)

        if (allFormData.settlement_meeting) {
          this.formData = allFormData.settlement_meeting
          console.log('hi!')
        }
        this.subscription.unsubscribe();
      });
  }
  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }
  ngOnInit() {
    console.log('Survey.Survey.cssType', Survey.Survey.cssType)
    // this.initSurvey();

    this.renderSurvey()
  }

  // initSurvey() {
  //   // addQuestionTypes(Survey);
  //   this.initTest()
  //   Survey.Survey.cssType = "bootstrap";
  //   Survey.defaultBootstrapCss.page.root = "sv_page";
  //   Survey.defaultBootstrapCss.pageDescription = "sv_page_description";
  //   Survey.defaultBootstrapCss.pageTitle = "sv_page_title";
  //   Survey.defaultBootstrapCss.navigationButton = "btn btn-primary";
  //   Survey.defaultBootstrapCss.question.title = "sv_q_title";
  //   Survey.defaultBootstrapCss.question.description = "sv_q_description small";
  //   Survey.defaultBootstrapCss.panel.title = "sv_p_title";
  //   Survey.defaultBootstrapCss.panel.container = "sv_p_container";
  //   Survey.defaultBootstrapCss.panel.description = "sv_p_description";
  //   Survey.defaultBootstrapCss.row = "sv_row";
  //   Survey.defaultBootstrapCss.matrixdynamic.button = "btn btn-default";
  //   Survey.defaultBootstrapCss.paneldynamic.button = "btn btn-default";
  //   Survey.defaultBootstrapCss.paneldynamic.root = "sv_p_dynamic"; // not used?
  //   Survey.defaultBootstrapCss.checkbox.item = "sv-checkbox";
  //   Survey.defaultBootstrapCss.checkbox.controlLabel = "sv-checkbox-label";
  //   Survey.defaultBootstrapCss.checkbox.materialDecorator = "";
  //   Survey.defaultBootstrapCss.radiogroup.item = "sv-radio";
  //   Survey.defaultBootstrapCss.radiogroup.controlLabel = "sv-checkbox-label";
  //   Survey.defaultBootstrapCss.radiogroup.materialDecorator = "";
  // }

  renderSurvey() {
    console.log('hi!1')
    // let surveyModel =
    this.survey = new Survey.Model(this.json);
    this.survey.maxOthersLength = 255;
    if (this.formData) {
      console.log('hi122!')
      this.survey.data = this.formData
    }
    console.log('hi!2')
    Survey.SurveyNG.render('surveyElementHRT', { model: this.survey });
    console.log('hi!3')

  }
  handleNextStep() {

    if (this.survey.isLastPage) {
      const validated = this.survey.completeLastPage()
      if (validated) {
        this.missionService.confirmMission({
          name: 'settlement_meeting',
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
