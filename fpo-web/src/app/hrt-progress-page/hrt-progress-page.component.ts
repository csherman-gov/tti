import { Component, OnInit, Input, OnDestroy } from "@angular/core";

// import service
import { MissionService } from "../mission.service";
import { Subscription } from "rxjs";

import { Router } from "@angular/router";
// data service
import { GeneralDataService, UserInfo } from "../general-data.service";

@Component({
  selector: "app-hrt-progress-page",
  templateUrl: "./hrt-progress-page.component.html",
  styleUrls: ["./hrt-progress-page.component.scss"],
})
export class HrtProgressPageComponent implements OnInit, OnDestroy {
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
      name: "Time limit to make complaint",
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
  user_id = "";
  constructor(
    private missionService: MissionService,
    private router: Router,
    private dataService: GeneralDataService
  ) {
    this.subscription = missionService.missionAnnounced$.subscribe(
      (allFormData) => {
        console.log("allFormData", allFormData);
        if (allFormData) {
          this.formData = allFormData;
          for (let key in this.formData) {
            if (key == "home") {
              continue;
            }
            this.completedSteps++;
          }
          this.subscription.unsubscribe();
        }
      }
    );
    console.log("this.formData: ", this.formData);
    // if(this.formData.complainant) {}
  }

  ngOnInit() {
    console.log(this.formData);
    this.dataService.getUserInfo().then(res => {
        console.log('res: ', res)
        this.user_id = res.user_id
    }).catch(err => {
        console.warn(err)
    })
    if (Object.keys(this.formData).length < 1) {
        console.log('loadData')
      this.dataService
        .loadSurveyResultIndex("default", "individual", false)
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
  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }

  handleSave() {
    this.dataService
      .saveSurveyResult("default", "individual", this.formData)
      .then((res) => {
        console.log("save ok");
        console.log(res);
      });
  }
  handleClickEvent(event) {
    console.log(event.target.dataset);
    const url = event.target.dataset.url || "hrt/progress";
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
      this.router.navigateByUrl("hrt/review");
    }
  }
}
