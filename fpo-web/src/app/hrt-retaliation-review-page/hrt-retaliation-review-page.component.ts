import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { HttpClient } from "@angular/common/http";
// import service
import { MissionService } from "../mission.service";
import { Subscription } from "rxjs";

import { Router } from "@angular/router";
import { GeneralDataService } from "../general-data.service";

import { PlatformLocation } from "@angular/common";

@Component({
  selector: "app-hrt-retaliation-review-page",
  templateUrl: "./hrt-retaliation-review-page.component.html",
  styleUrls: ["./hrt-retaliation-review-page.component.scss"],
})
export class HrtRetaliationReviewPageComponent implements OnInit, OnDestroy {
  result: boolean;
  loading = false
  get showLateComplaints() {
    return this.result;
  }
  buttonClass = "btn btn-inactive";
  error = false;
  checkbox = false;
  complainants: any;
  subscription: Subscription;
  formData = {
    home: {
        case_type: 'Retaliation',
        attachment_html: ''
    },
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
    `{
        "home": {
          "form_timeout": "I am using a public computer (i.e. library, internet café, Service BC location)"
        },
        "partyInfo": {
          "Legal Name - First Name": "123",
          "Legal Name - Last Name": "123",
          "Preferred name - e.g. traditional name, nickname, alias": "123",
          "Use my preferred name": [
            "When talking to me"
          ],
          "Title": "other",
          "Pronoun": "other",
          "Select only one option": "A lawyer",
          "First name": "12312312",
          "Last name": "312312123",
          "Contact Preferred name - e.g. traditional name, nickname, alias": "123123123123",
          "Contact Title": "other",
          "Contact Pronoun": "other",
          "Complainant Contact Mailing address": "123 asddsa",
          "Complainant Contact City": "dasd",
          "Complainant Contact Province": "Alberta",
          "Complainant Contact Postal Code": "12312312",
          "Complainant Contact Phone number": "1231231231",
          "Complainant Contact Cell Phone number": "123@123.ca",
          "Complainant Contact Fax": "123",
          "Complainant Contact Email": "123",
          "Respondents Contact Information": [
            {
              "Name of the Respondent": "r2",
              "Respondent Contact Email": "312@boss.ca",
              "Mailing address": "321 tesr st",
              "City": "Vanvouver",
              "Province": "Alberta",
              "Postal Code": "e3e3e3",
              "Respondent Contact Phone number": "1231231231",
              "Relationship to you": "123123",
              "Respondent Contact Cell Phone number": "123123",
              "Respondent Contact Fax": "123123"
            }
          ],
          "Title-Comment": "12312312312",
          "Pronoun-Comment": "1231221312",
          "Contact Title-Comment": "Other",
          "Contact Pronoun-Comment": "Other"
        },
        "roleInComplaint": {
          "Is the retaliation about": "A complaint that someone filed with the BC Human Rights Tribunal",
          "What is the complaint name and case number?": "123",
          "When was the complaint filed?": "2020-01-01",
          "What is your role in the complaint?": "I made the complaint",
          "How did the Respondent(s) know about your role?": "123123"
        },
        "detailsOfRetaliation": {
          "Details of the Retaliation for each Respondent": [
            {
              "Respondent": "123123",
              "Describe in a few words the conduct that you say is retaliation": "123",
              "Give details about this Respondent’s conduct that you say is retaliation.": [
                {
                  "Conduct": "123",
                  "Date": "2005-01-18"
                }
              ],
              "Explain why you think this conduct is retaliation for your role in a complaint": "123"
            }
          ]
        },
        "fileInTime": {
          "There is a 1-year time limit for filing a complaint": [
            {
              "Respondent name": "1231231231",
              "What is the date of the most recent conduct that you say is retaliation?": "2005-01-01",
              "Did the most recent conduct happen in the last year?": "Yes"
            }
          ],
          "Did all of the conduct happen in the last year for all Respondents?": "No",
          "Is all of the conduct related or similar?": "Yes",
          "Explain how the conduct is similar or related (a “continuing contravention”)": "123",
          "Explain any gaps in time": "123",
          "Why did you file late?": "123",
          "How will accepting your complaint benefit the public?": "123",
          "Why would the delay in filing not harm anyone else?": "123"
        },
        "otherProceedings": {
          "Do you have another proceeding about the same events?": "Yes",
          "What kind of proceeding is it?": "12312",
          "What stage is that proceeding at?": "3123123",
          "Do you want the Tribunal to wait to deal with your complaint?": "Yes",
          "Explain why you want the Tribunal to wait to deal with your complaint": "123123"
        },
        "remedies": {
          "Select the kinds of remedies you want": [
            "Order to stop the retaliation",
            "Steps or programs to address the retaliation (examples: training, policy)",
            "Compensation for lost wages or other expenses such as moving expenses, photocopying, costs of attending the hearing (keep receipts)",
            "other"
          ],
          "Select the kinds of remedies you want-Comment": "asd"
        },
        "mediation": {
          "Do you want to attend a mediation?": "Yes"
        }
      }`
  );
  show: boolean = false;
  constructor(
    private missionService: MissionService,
    private router: Router,
    private http: HttpClient,
    private dataService: GeneralDataService,
    private platformLocation: PlatformLocation
  ) {
    this.subscription = missionService.missionAnnounced$.subscribe(
      (allFormData) => {
        console.log("allFormData", allFormData);
        if (allFormData) {
          this.formData = allFormData;
        //   this.formData = this.newFormData;
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

      const attachment_html = document.getElementById('pdf-container').innerHTML
      console.log(attachment_html)
      const case_type = 'Retaliation'
      this.formData.home = {
        case_type: case_type,
        attachment_html: attachment_html
      }
      console.log(this.formData)
      this.loading = true
      this.http
        .post(
            this.platformLocation.getBaseHrefFromDOM() + "api/v1/survey-submit/test_collection/test_key",
          this.formData
        )
        .toPromise()
        .then((res) => {
          console.log(res);
          this.error = false;
          this.router.navigateByUrl("hrt-retaliation/thank-you");
        }).catch(err => {
            this.loading = false
            console.warn(err)
        });
    } else {
      this.error = true;
    }
  }
  handleBackBtnClick() {
    this.router.navigateByUrl("hrt-retaliation/progress");
  }
}
