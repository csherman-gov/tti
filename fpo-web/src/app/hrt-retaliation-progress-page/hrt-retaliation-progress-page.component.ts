import { Component, OnInit, Input, OnDestroy } from "@angular/core";

// import service
import { MissionService } from "../mission.service";
import { Subscription } from "rxjs";

import { Router } from "@angular/router";
// data service
import { GeneralDataService, UserInfo } from "../general-data.service";

@Component({
  selector: "app-hrt-retaliation-progress-page",
  templateUrl: "./hrt-retaliation-progress-page.component.html",
  styleUrls: ["./hrt-retaliation-progress-page.component.scss"],
})
export class HrtRetaliationProgressPageComponent implements OnInit, OnDestroy {
  result: boolean;
  user_id = ''
  get showLateComplaints() {
    return this.result;
  }
  subscription: Subscription;
  formData: object = {};
  completedSteps: number = 0;
  steps = [
    {
      name: "Party information",
      intro: "",
      url: "hrt-retaliation/party-information",
      short_name: "partyInfo",
    },
    {
      name: "Your Role in a Complaint",
      intro: "",
      url: "hrt-retaliation/role-in-complaint",
      short_name: "roleInComplaint",
    },
    {
      name: "Details of the Retaliation",
      intro: "",
      url: "hrt-retaliation/details-of-retaliation",
      short_name: "detailsOfRetaliation",
    },
    {
      name: "Time Limit to Make Complaint",
      intro: "",
      url: "hrt-retaliation/file-in-time",
      short_name: "fileInTime",
    },
    {
      name: "Other Proceedings",
      intro: "",
      url: "hrt-retaliation/other-proceedings",
      short_name: "otherProceedings",
    },
    {
      name: "Remedies",
      intro: "",
      url: "hrt-retaliation/remedies",
      short_name: "remedies",
    },
    {
      name: "Mediation",
      intro: "",
      url: "hrt-retaliation/mediation",
      short_name: "mediation",
    },
    {
      name: "Demographic Information",
      intro: "This step is optional",
      url: "hrt-retaliation/statistical-information",
      short_name: "statisticalInformation",
    },
  ];
  get buttonClass() {
    return this.steps.reduce((acc, step) => {
      if (step.short_name === "statisticalInformation") {
        return acc && true;
      }
      return acc && this.formData[step.short_name];
    }, true)
      ? "btn btn-default"
      : "btn btn-inactive";
  }
  constructor(private missionService: MissionService, private router: Router, private dataService: GeneralDataService) {
    this.subscription = missionService.missionAnnounced$.subscribe(
      (allFormData) => {
        console.log("allFormData", allFormData);

        if (allFormData) {
          this.formData = allFormData;
          for (let key in this.formData) {
            if (key == "home") {
              continue;
            }
            if (key === "respondents") {
              console.log(allFormData.respondents);
              let respondents = allFormData.respondents.Respondents;
              let result = respondents.reduce((acc, current) => {
                return (
                  current[
                    "Did all the conduct you say is discrimination happen in the last one year?"
                  ] === "No" && acc
                );
              }, true);
              console.log(result);
              this.result = result;
            }
            this.completedSteps++;
          }
          if (!this.result) {
            this.steps = this.steps.filter((e) => e.name !== "Late complaints");
          }

          this.subscription.unsubscribe();
        }
      }
    );
  }

  ngOnInit() {
    console.log(this.formData);
    
    
    this.dataService.getUserInfo().then(res => {
        console.log('res: ', res)
        this.user_id = res.user_id ? res.user_id : ''
    }).catch(err => {
        console.warn(err)
    })
    if (Object.keys(this.formData).length < 1) {
        console.log('loadData')
      this.dataService
        .loadSurveyResultIndex("default", "retaliation", false)
        .then((result) => {
          console.log("loadSurveyResultIndex success");
          console.log("result: ", result);
          // this._surveyIndex = result.result || [];
        //   this.user_id = result.result[0].user_id;
        //   console.log(this.user_id);
          console.log(result.result[0]);
          if (result.result[0]) {
            this.missionService.confirmMission(result.result[0].result);
            // missionService.announceMission(this.allFormData);
            this.formData = result.result[0].result;

            // this.formData = allFormData
            this.completedSteps = 0;
            for (let key in this.formData) {
              if (key == "home") {
                continue;
              }
              this.completedSteps++;
            }
          }
        })
        .catch((err) => {
          console.log("loadSurveyResultIndex fail");
          // this._surveyIndex = [];
        });
    }
  }
  handleSave() {
    this.dataService
      .saveSurveyResult("default", "retaliation", this.formData)
      .then((res) => {
        console.log("save ok");
        console.log(res);
      });
  }
  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }
  handleClickEvent(event) {
    console.log(event.target.dataset);
    const url = event.target.dataset.url || "hrt-retaliation/progress";
    // jump to that section
    this.router.navigateByUrl(url);
  }
  // Validate and Navigate to Review Page
  handleReviewEvent(event) {
    // this.router.navigateByUrl('hrt/review')

    if (
      this.steps.reduce((acc, step) => {
        if (step.short_name === "statisticalInformation") {
          return acc && true;
        }
        return acc && this.formData[step.short_name];
      }, true)
    ) {
      this.router.navigateByUrl("hrt-retaliation/review");
    }
  }
}
