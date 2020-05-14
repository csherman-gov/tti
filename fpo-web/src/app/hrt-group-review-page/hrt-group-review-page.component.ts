import { Component, OnInit, Input, OnDestroy } from "@angular/core";

// import service
import { MissionService } from "../mission.service";
import { Subscription } from "rxjs";

import { Router } from "@angular/router";

@Component({
  selector: "app-hrt-group-review-page",
  templateUrl: "./hrt-group-review-page.component.html",
  styleUrls: ["./hrt-group-review-page.component.scss"],
})
export class HrtGroupReviewPageComponent implements OnInit, OnDestroy {
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
    representative: {},
    repSutability: {},
    complaintSutability: {},
    respondentContact: {},
    areaAndGrounds: {
      areas: [],
    },
    detailsOfDiscrimination: {},
    fileInTime: {},
    otherProceedings: {},
    remedies: {},
    mediation: {},
    statisticalInformation: {},
  };
  details = [];
  newFormData = JSON.parse(
    `{"representative":{"Organization Name":"123","Individual Legal name – First name":"321","Individual Legal Name – Last name":"12312312312","Preferred name":"123","Use my preferred name":["When talking to me","When writing to me"],"Title":"Mr.","Pronoun":"She","Select only one option:":"A lawyer for the Representative","First name":"123","Last name":"321","Representative Preferred name":"123","Representative Title":"Mr.","Representative Pronoun":"She","Mailing address":"te","City":"te","Province":"Northwest Territories","Postal Code":"a3e 3e3","Phone number":"1231231231","Fax":"dsa@da.com","Email":"dsa@da.com"},"repSutability":{"Are you a member of the group or class?":"No","Why are you filing the complaint?":"123","Are your interests in the complaint different from the group or class members’ interests?":"Yes","If yes, explain the differences between your interests and the interests of the group or class members’ interests":"123","Do you have reason to believe that group or class members may not want you to make this complaint on their behalf?":"Yes","If yes, explain":"123","Have you notified the group or class about the complaint?":"Yes","If yes, please explain how they have been notified":"123","How will you communicate with the group or class members?":"123","Declarations":["understand the nature of the proceeding;","have no interest that conflicts with those of the group or class members;","will resign as Representative if a conflict of interest arises;","will act in good faith;"," will focus on the group or class members’ rights to protection against discrimination under the Human Rights Code;","will give information to the group or class about my role, how the complaint process works, how long it takes, and what the outcomes may be;","will keep the group or class members up-to-date about what steps I have taken, what stage we are at, and what to expect next;","will be available to the group or class members to answer their questions;","will tell the group or class members my plan for how they may take part in the process;  ","will do the jobs of a Representative, including: ","learn about the complaint process;","ask the Tribunal to accommodate the needs of group or class members so they can take part in the process;","gather evidence to support the complaint and put forward the best possible case to the Tribunal; and","decide whether to hire a lawyer or legal advocate and instruct that person."]},"complaintSutability":{"Describe the Group or Class":"312123","Explain how the alleged discrimination is similar for all group or class members":"123213"},"respondentContact":{"Respondents Contact Information":[{"Name of the Respondent":"John Doe","Mailing address":"123 asddsa","City:":"dasd","Province":"Alberta","Postal Code":"12312312","Respondent Contact Phone number":"1231231231","Respondent Contact Email":"123@123.ca","Relationship to group or class members":"boss"}]},"areaAndGrounds":{"areas":[{"What is the Area of Discrimination?":"Employment","If your complaint is about employment, check if it’s about":["A job ad"],"What are the Grounds of Discrimination?":["Ancestry"],"Details - Ancestry":"123"},{"What is the Area of Discrimination?":"Services ","What are the Grounds of Discrimination?":["Colour"],"Details - Colour":"3212312312312"}]},"detailsOfDiscrimination":{"Describe what your complaint is about in a few words":"123","Describe the harm in a few word":"123","Explain how the harm relates to the grounds you have selected before":"312312312","Describe what this Respondent did that harmed group or class members based on the grounds":[{"Respondent":"123","Event":"321","Date":"2020-12-12"},{"Respondent":"321","Event":"123","Date":"2019-12-11"}]},"fileInTime":{"There is a one-year time limit for filing a complaint":[{"Respondent name":"123","What is the date of the most recent event that you say is discrimination?":"123","Did the most recent event happen in the last year?":"Yes"},{"Respondent name":"321","What is the date of the most recent event that you say is discrimination?":"123","Did the most recent event happen in the last year?":"Yes"}],"Did every event happen in the last year for all respondents?":"No","Are all the event Related or similar?":"Yes","Explain how the incidents are similar or related":"123","Explain any gaps between events":"123","Why did you file late?":"321","How will accepting your complaint benefit the public?":"112312312321321132321","Why would the delay in filing not harm anyone else?":"123123312312312312312 1233123 123 12312312 123 "},"otherProceedings":{"Does the group or class have another proceeding about the same events?":"Yes","What kind of proceeding is it?":"3333","What stage is that proceeding at?":"1213123312312123","Do you want the Tribunal to wait to deal with the complaint?":"Yes","Explain why you want the Tribunal to wait to deal with the complaint":"312312312312"},"remedies":{"Select the kinds of remedies you want":["Declaration that the conduct is discrimination","Steps or programs to address the discrimination (examples: training, policy)","Compensation for lost waged or expenses or other expenses such as moving expenses, photocopying, costs of attending the hearing (keep receipts)"]},"mediation":{"Do you want to attend a mediation?":"Yes"},"statisticalInformation":{"Indigenous Identity":"First Nations","Racial Identity":"Indigenous","Immigration Status":"Canadian citizen","Language":"English","Disability requiring accommodation in employment and services":"Yes - physical","Gender Identity":"Woman","Sexual Orientation":"LGBQ","Age":"Under 19","Household":"Single parent","Household Income After Tax":"Under $20,000"}}`
  );
  show: boolean = false;
  constructor(private missionService: MissionService, private router: Router) {
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
    } else {
      this.buttonClass = "btn btn-inactive";
    }
  }
  handleSubmit() {
    if (this.checkbox) {
      console.log("Happy!");

      this.error = false;
      this.router.navigateByUrl("hrt-group/thank-you");
    } else {
      this.error = true;
    }
  }
  handleBackBtnClick() {
    this.router.navigateByUrl("hrt-group/progress");
  }
}
