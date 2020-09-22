import { Component, OnInit, OnDestroy } from '@angular/core';

import { MissionService } from '../mission.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
// Import Survey.js
import * as Survey from 'survey-angular';
import { addQuestionTypes } from '../survey/question-types';

@Component({
  selector: 'app-hrt-late-complaints-page',
  templateUrl: './hrt-late-complaints-page.component.html',
  styleUrls: ['./hrt-late-complaints-page.component.scss']
})
export class HrtLateComplaintsPageComponent implements OnInit, OnDestroy {
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
            "name": "Notes",
            "html": "<p>\n    If <strong>ANY</strong> of the conduct you say is discrimination happened more than one year ago, part or all of\n    your complaint <strong>MAY</strong>\n    be filed late.\n  </p>\n  <p>\n    answer the following questions, even if you believe that all of your complaint is filed on\n    time because it is about similar or related events with at least one event in the last one year.\n  </p>\n  <p>\n    The Tribunal may accept a late complaint if it decides that accepting the late-filed complaint:\n  </p>\n  <ul>\n    <li>\n      is in the public interest; and\n    </li>\n    <li>\n      no one would be substantially prejudiced (harmed) by the delay\n    </li>\n  </ul>"
          },
          {
            "type": "comment",
            "name": "Why did you wait to file your complaint?",
            "isRequired": true,
            "maxLength": 32000,
            "rows": 3
          },
          {
            "type": "comment",
            "name": "Why should the tribunal accept your complaint?",
            "isRequired": true,
            "maxLength": 32000,
            "rows": 3
          },
          {
            "type": "comment",
            "name": "Why would the delay in filing not cause substantial prejudice to any other person?",
            "isRequired": true,
            "maxLength": 32000,
            "rows": 3
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

        if (allFormData['late_complaints']) {
          this.formData = allFormData['late_complaints']
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
          name: 'late_complaints',
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
