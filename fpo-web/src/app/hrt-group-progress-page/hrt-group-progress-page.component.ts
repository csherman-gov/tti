import { Component, OnInit, Input, OnDestroy } from "@angular/core";

// import service
import { MissionService } from "../mission.service";
import { Subscription } from "rxjs";

import { Router } from "@angular/router";
// data service
import { GeneralDataService, UserInfo } from "../general-data.service";

@Component({
  selector: "app-hrt-group-progress-page",
  templateUrl: "./hrt-group-progress-page.component.html",
  styleUrls: ["./hrt-group-progress-page.component.scss"],
})

export class HrtGroupProgressPageComponent implements OnInit, OnDestroy {
  result: boolean;
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
      url: "hrt/complainant",
      short_name: "complainant",
    },
    {
      name: "Area and Grounds",
      intro: "",
      url: "hrt/area-and-grounds",
      short_name: "areaAndGrounds",
    },
    {
      name: "Details of the Discrimination",
      intro: "",
      url: "hrt/details-of-the-discrimination",
      short_name: "detailsOfDiscrimination",
    },
    {
      name: "Is the Complaint filed in Time?",
      intro: "",
      url: "hrt/file-in-time",
      short_name: "fileInTime",
    },
    {
      name: "Other Proceedings",
      intro: "",
      url: "hrt/other-proceedings",
      short_name: "otherProceedings",
    },
    {
      name: "Remedies",
      intro: "",
      url: "hrt/remedies",
      short_name: "remedies",
    },
    {
      name: "Mediation",
      intro: "",
      url: "hrt/mediation",
      short_name: "mediation",
    },
    {
      name: "Demographic Information",
      intro: "This step is optional",
      url: "hrt/statistical-information",
      short_name: "statisticalInformation",
    },
  ];
  steps1 = [
    {
      name: "Representative and Group or Class",
      intro: "",
      url: "hrt-group/representative",
      short_name: "representative",
    },
    {
      name: "Suitability of Representative",
      intro: "",
      url: "hrt-group/representative-sutability",
      short_name: "repSutability",
    },
    {
      name: "Suitability of Complaint",
      intro: "",
      url: "hrt-group/complaint-suitability",
      short_name: "complaintSutability",
    },
  ];
  steps2 = [
    {
      name: " Respondent Contact Information",
      intro: "",
      url: "hrt-group/respondent-contact-info",
      short_name: "respondentContact",
    },
    {
      name: "Areas and Grounds of Discrimination",
      intro: "",
      url: "hrt-group/area-and-grounds",
      short_name: "areaAndGrounds",
    },
    {
      name: "Details of Discrimination",
      intro: "",
      url: "hrt-group/details-of-the-discrimination",
      short_name: "detailsOfDiscrimination",
    },
    {
      name: "Time Limit to Make Complaint",
      intro: "",
      url: "hrt-group/file-in-time",
      short_name: "fileInTime",
    },
    {
      name: "Other Proceedings",
      intro: "",
      url: "hrt-group/other-proceedings",
      short_name: "otherProceedings",
    },
    {
      name: "Remedies",
      intro: "",
      url: "hrt-group/remedies",
      short_name: "remedies",
    },
    {
      name: "Mediation",
      intro: "",
      url: "hrt-group/mediation",
      short_name: "mediation",
    },
    {
      name: "Demographic Information",
      intro: "This step is optional",
      url: "hrt-group/statistical-information",
      short_name: "statisticalInformation",
    },
  ];
  get buttonClass() {
    return this.steps2.reduce((acc, step) => {
      if (step.short_name === "statisticalInformation") {
        return acc && true;
      }
      return acc && this.formData[step.short_name];
    }, true)
      ? "btn btn-default"
      : "btn btn-inactive";
  }
  user_id = "";
  constructor(private missionService: MissionService, private router: Router, private dataService: GeneralDataService) {
    console.log(123131231312);
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
          console.log("completedSteps: ", this.completedSteps);
        }
        // this.subscription.unsubscribe();
      }
    );
  }

  ngOnInit() {
    console.log(this.formData);
    
    
    // load data
    if (Object.keys(this.formData).length < 1) {
        console.log('loadData')
      this.dataService
        .loadSurveyResultIndex("default", "individual", false)
        .then((result) => {
          console.log("loadSurveyResultIndex success");
          console.log("result: ", result);
          // this._surveyIndex = result.result || [];
          this.user_id = result.result[0].user_id;
          console.log(this.user_id);
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
  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }
  handleSave() {
    this.dataService
      .saveSurveyResult("default", "group", this.formData)
      .then((res) => {
        console.log("save ok");
        console.log(res);
      });
  }
  handleClickEvent(event) {
    console.log(event.target.dataset);
    const url = event.target.dataset.url || "hrt-group/progress";
    // jump to that section
    this.router.navigateByUrl(url);
  }
  // Validate and Navigate to Review Page
  handleReviewEvent(event) {
    // this.router.navigateByUrl('hrt/review')

    if (
      this.steps2.reduce((acc, step) => {
        if (step.short_name === "statisticalInformation") {
          return acc && true;
        }
        return acc && this.formData[step.short_name];
      }, true)
    ) {
      this.router.navigateByUrl("hrt-group/review");
    }
  }
}
