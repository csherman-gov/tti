import { Component, OnInit, OnDestroy } from '@angular/core';

import { MissionService } from '../mission.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
// Import Survey.js
import * as Survey from 'survey-angular';
import { addQuestionTypes } from '../survey/question-types';

@Component({
  selector: 'app-hrt-other-related-proceedings-page',
  templateUrl: './hrt-other-related-proceedings-page.component.html',
  styleUrls: ['./hrt-other-related-proceedings-page.component.scss']
})
export class HrtOtherRelatedProceedingsPageComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  private json = {
    "showNavigationButtons": false,
    "completeText": "",
    "pages": [
      {
        "name": "Other related proceedings",
        "elements": [
          {
            "type": "html",
            "name": "Notes",
            "html": "<p>The Tribunal may defer your complaint (put your complaint on hold) until another proceeding capable of dealing with your human rights complaint, such as a grievance, has been completed. If your complaint is deferred, the Tribunal will take no further steps until the deferral ends</p>"
          },
          {
            "type": "radiogroup",
            "name": "Is there another proceeding?",
            "isRequired": true,
            "choices": [
              "Yes",
              "No"
            ]
          },
          {
            "type": "text",
            "name": "What is the other proceeding and when did it start?",
		        "maxLength": 255,
            "visibleIf": "{Is there another proceeding?} = \"Yes\""
          },
          {
            "type": "text",
            "name": "What dates have been set?",
		        "maxLength": 255,
            "visibleIf": "{Is there another proceeding?} = \"Yes\""
          },
          {
            "type": "text",
            "name": "What remedies have you sought?",
		        "maxLength": 255,
            "visibleIf": "{Is there another proceeding?} = \"Yes\""
          },
          {
            "type": "text",
            "name": "Has there been a decision?",
		        "maxLength": 255,
            "visibleIf": "{Is there another proceeding?} = \"Yes\""
          },
          {
            "type": "text",
            "name": "Anything else the Tribunal needs to know?",
		        "maxLength": 255,
            "visibleIf": "{Is there another proceeding?} = \"Yes\""
          },
          {
            "type": "radiogroup",
            "name": "Do you want the tribunal to defer considering your complaint? ",
            "visibleIf": "{Is there another proceeding?} = \"Yes\"",
            "choices": [
              "Yes",
              "No"
            ]
          },
          {
            "type": "text",
            "name": "Explain why",
		        "maxLength": 255,
            "visibleIf": "{Is there another proceeding?} = \"Yes\""
          }
        ]
      }
    ],
    "showQuestionNumbers": "off"
  };
  survey: any
  formData: object
  constructor(private missionService: MissionService, private router: Router) {
    this.subscription = missionService.missionAnnounced$.subscribe(
      allFormData => {
        console.log('allFormData', allFormData)

        if (allFormData['other_related_proceedings']) {
          this.formData = allFormData['other_related_proceedings']
        }
        this.subscription.unsubscribe();
      });
  }
  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }
  ngOnInit() {



    this.renderSurvey()
  }



  renderSurvey() {
    let surveyModel = new Survey.Model(this.json);
    this.survey = surveyModel
    Survey.SurveyNG.render('surveyElementHRT', { model: surveyModel });
    this.survey.data = this.formData
  }
  handleNextStep() {

    if (this.survey.isLastPage) {
      const validated = this.survey.completeLastPage()
      if (validated) {
        this.missionService.confirmMission({
          name: 'other_related_proceedings',
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
