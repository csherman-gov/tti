import { Component, OnInit, Input, OnDestroy } from "@angular/core";

// import service
import { MissionService } from "../mission.service";
import { Subscription } from "rxjs";

import { Router } from "@angular/router";
import { GeneralDataService } from "../general-data.service";

@Component({
  selector: "app-hrt-retaliation-review-page",
  templateUrl: "./hrt-retaliation-review-page.component.html",
  styleUrls: ["./hrt-retaliation-review-page.component.scss"],
})
export class HrtRetaliationReviewPageComponent implements OnInit, OnDestroy {
  result: boolean;
  get showLateComplaints() {
    return this.result;
  }
  buttonClass = "btn btn-inactive";
  error = false;
  checkbox = false;
  complainants: any;
  subscription: Subscription;
  formData = {
    respondents: [],
    partyInfo: {},
    roleInComplaint: {},
    detailsOfRetaliation: {},
    fileInTime: {},
    otherProceedings: {},
    remedies: {},
    mediation: {},
    statisticalInformation: {},
  };
  details = [];
  newFormData = JSON.parse(
    `{"home":{"form_timeout":"I am using a public computer (i.e. library, internet café, Service BC location)"},"partyInfo":{"Legal Name - First Name":"123","Legal Name - Last Name":"123","Preferred name - e.g. traditional name, nickname, alias":"123","Use my preferred name":["When talking to me"],"Title":"Mr.","Select only one option":"The complainant","Respondents Contact Information":[{"Name of the Respondent":"te te","Mailing address":"te","City":"te","Province":"British Columbia","Postal Code":"a3e 3e3","Respondent Contact Phone number":"1231231231","Respondent Contact Email":"dsa@da.com","Relationship to you":"123"}]},"roleInComplaint":{"Is the conduct that you say is retaliation about":"A complaint that someone might file with the BC Human Rights Tribunal","What is the complaint name and case number?":"123", "What was your role?": "The Respondent(s) thought that I might make a complaint",
    "Why did the Respondent(s) think this?": "123", "When was the complaint filed?":"2020-02-01","What is your role in the complaint?":"I made the complaint","How did the Respondent(s) know about your role?":"1231231231","What was your role?":"The Respondent(s) thought that I might make a complaint","Why did the Respondent(s) think this?":"312@boss.ca"},"otherProceedings":{"Do you have another proceeding about the same events?":"Yes","What kind of proceeding is it?":"312312312","What stage is that proceeding at?":"12312312","Do you want the Tribunal to wait to deal with your complaint?":"Yes","Explain why you want the Tribunal to wait to deal with your complaint":"12312312"}, "fileInTime": {
        "There is a one-year time limit for filing a complaint":[{"Respondent name":"asd","What is the date of the most recent conduct that you say is retaliation?":"2020-05-07","Did the most recent event happen in the last year?":"Yes"}],"Did all of the conduct happen in the last year for all Respondents?":"No","Is all of the conduct related or similar?":"Yes","Explain how the incidents are similar or related (a “continuing contravention”)":"31231231","Explain any gaps between events":"123123123","Why did you file late?":"312312312","How will accepting your complaint benefit the public?":"3123123","Why would the delay in filing not harm anyone else?":"12312312"
    }, "remedies":{"Select the kinds of remedies you want":["Order to stop the discrimination","Compensation for injury to dignity, feelings, and self-respect"]}, "mediation": {"Do you want to attend a mediation?": "Yes"},"detailsOfRetaliation":{"Details of the Retaliation for each Respondent":[{"Respondent":"123","Describe in a few words the conduct that you say is retaliation":"Evicting - Expelling - Denying a right or benefit Firing - Intimidating or Coercing - Threatening to do one of these things Suspending - Penalizing - Other similar conduct Instructions. Give a short answer here. You will give details below. Your short answer helps us understand the details you give below. Examples. “This Respondent fired me.” “This Respondent threatened me.","Give details about this Respondent’s conduct that you say is retaliation":[{"Conduct":"123123 12","Date":"2008-02-09"}],"Explain why you think this conduct is retaliation for your role in a complaint":"I talked about discrimination at work. My boss said he’d never promote me if I made a complaint."}]},"statisticalInformation":{"Indigenous Identity":"First Nations","Racial Identity":"Indigenous","Immigration Status":"Canadian citizen","Language":"English","Disability requiring accommodation in employment and services":"Yes - physical","Gender Identity":"Woman","Sexual Orientation":"LGBQ","Age":"Under 19","Household":"Single parent","Household Income After Tax":"Under $20,000"}}`
  );
  show: boolean = false;
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
          this.formData = this.newFormData;
          console.log(this.formData);
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
          }

          for (let key in this.formData["areaAndGrounds"]) {
            console.log(key);
            if (key.includes("Details - ")) {
              this.details.push({
                key: key.replace("Details - ", ""),
                val: this.formData["areaAndGrounds"][key],
              });
            }
          }
          console.log(this.details, "+++++++++++++++++++++++++++");

          // this.complainants = Object.keys(this.formData.complainant)
          this.show = true;
        }
        this.subscription.unsubscribe();
      }
    );
  }

  saveData() {
    this.dataService.loadUserInfo().then((res) => {
      console.log(12312312312);
      this.dataService
        .saveSurveyResult("editor", "primary2", {
          time: 1588573866783,
          data: {
            ApplicantName: { first: "123", middle: "321", last: "213" },
            ApplicantDOB: "2020-01-01",
            Lawyer: "n",
            FAQLawyer2: false,
            ExplanationServiceAddress: 1,
            ApplicantAddress: {
              street: "1231231231",
              city: "dasd",
              state: "BC",
              country: "CAN",
              postcode: "12312312",
            },
            ApplicantContact: { phone: "123123123", email: "123", fax: "" },
          },
          page: 0,
          completed: true,
        })
        .then(
          (result) => {
            console.log(result);
          },
          (err) => console.log(err)
        );
    });
  }

  ngOnInit() {
    console.log(this.formData);

    // for (let key in this.formData) {
    //   if (key == 'home') {
    //     continue;
    //   }
    //   if (key === 'respondents') {
    //     // console.log(allFormData.respondents)
    //     let respondents = this.formData.respondents ? this.formData.respondents.Respondents : []
    //     let result = respondents.reduce((acc, current) => {
    //       return current['Did all the conduct you say is discrimination happen in the last one year?'] === 'No' && acc
    //     }, true)
    //     console.log(result)
    //     this.result = result
    //   }
    // }
    // this.complainants = Object.keys(this.formData.complainant)
    // this.show = true
  }
  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }
  handleClickEvent(event) {
    console.log(event.target.dataset);
  }
  handleCheckboxChange(event) {
    const value = event.target.checked;
    this.checkbox = value;
    if (value) {
      this.buttonClass = "btn btn-default";
    }
  }
  handleSubmit() {
    if (this.checkbox) {
      console.log("Happy!");

      this.error = false;
      this.router.navigateByUrl("hrt-retaliation/thank-you");
    } else {
      this.error = true;
    }
  }
  handleBackBtnClick() {
    this.router.navigateByUrl("hrt-retaliation/progress");
  }
}
