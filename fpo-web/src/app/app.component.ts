import { AfterViewInit, Component, Renderer2, DoCheck, OnInit } from "@angular/core";
import { LocationStrategy } from "@angular/common";
import { NavigationEnd, Router } from "@angular/router";
import { BreadcrumbComponent } from "./breadcrumb/breadcrumb.component";
import { GeneralDataService } from "./general-data.service";
import { InsertService } from "./insert/insert.service";
import { MatomoInjector } from "@ambroise-rabier/ngx-matomo";
import { environment } from "../environments/environment";
import { MissionService } from "./mission.service";
import * as Survey from "survey-angular";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  providers: [MissionService],
})
export class AppComponent implements AfterViewInit, DoCheck, OnInit {
  title = "";
  _isPrv = false;
  // Add default survey data
  allFormData = {};
  complaintTitle = "B.C. Human Rights Tribunal";
  constructor(
    private renderer: Renderer2,
    private router: Router,
    private locStrat: LocationStrategy,
    private dataService: GeneralDataService,
    private missionService: MissionService,
    private matomoInjector: MatomoInjector
  ) {
    // subscribe
    missionService.missionConfirmed$.subscribe((formData) => {
      console.log("Event Captured on App Component! ", formData);
      if (!formData.data) {
        this.allFormData = formData
        missionService.announceMission(this.allFormData)
        return
      }
      let { name, data } = formData;
      this.allFormData[name] = data;
      console.log(this.allFormData);
    });
    router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        console.log("announced!!!!", e);
        missionService.announceMission(this.allFormData);
      }
    });
  }
  ngOnInit() {
      this.initSurvey()
  }
  initSurvey() {
    // addQuestionTypes(Survey);
    Survey.defaultBootstrapCss.page.root = "sv_page";
    Survey.defaultBootstrapCss.pageDescription = "sv_page_description";
    Survey.defaultBootstrapCss.page.description = "sv_page_description";
    Survey.defaultBootstrapCss.pageTitle = "sv_page_title";
    Survey.defaultBootstrapCss.page.title = "sv_page_title";
    Survey.defaultBootstrapCss.navigationButton = "btn btn-primary";
    Survey.defaultBootstrapCss.question.title = "sv_q_title";
    Survey.defaultBootstrapCss.question.description = "sv_q_description";
    Survey.defaultBootstrapCss.panel.description = "sv_p_description";
    Survey.defaultBootstrapCss.matrixdynamic.button = "btn btn-primary";
    Survey.defaultBootstrapCss.paneldynamic.button = "btn btn-primary";
    Survey.defaultBootstrapCss.paneldynamic.root = "sv_p_dynamic";
    Survey.defaultBootstrapCss.checkbox.item = "sv-checkbox";
    Survey.defaultBootstrapCss.checkbox.controlLabel = "sv-checkbox-label";
    Survey.defaultBootstrapCss.checkbox.materialDecorator = "";
    Survey.defaultBootstrapCss.radiogroup.item = "sv-radio";
    Survey.defaultBootstrapCss.radiogroup.controlLabel = "sv-checkbox-label";
    Survey.defaultBootstrapCss.radiogroup.materialDecorator = "";
    Survey.StylesManager.applyTheme("bootstrap");
  }
  ngDoCheck() {
    console.log(111111111111);
    console.log(this.router.url.includes("hrt-group"));
    if (this.router.url.includes("hrt-group")) {
      this.complaintTitle = "Form 1.3 - Group or Class Complaint";
      document.title = "File a Group Complaint ";
    } else if (this.router.url.includes("hrt-retaliation")) {
      this.complaintTitle = "Form 1.4 - Retaliation Complaint";
      document.title = "File a Retaliation Complaint ";
    } else {
        this.complaintTitle = "Form 1.1 - Individual Complaint";
      document.title = "File a Individual Complaint ";
    }
  }
  ngAfterViewInit(): void {
    let isPopState = false;
    let prevSlug: string;
    let prevUrl: string;
    let matomoEnabled: boolean;

    this.locStrat.onPopState(() => {
      isPopState = true;
    });

    if (environment.matomoUrl && environment.matomoSiteId) {
      this.matomoInjector.init({
        url: environment.matomoUrl,
        id: environment.matomoSiteId,
      });
      matomoEnabled = true;
    }

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (!isPopState) {
          // scroll to page top only when navigating to a new page (not via history state)
          window.scrollTo(0, 0);
          isPopState = false;
        }
        isPopState = false;

        let nextSlug = event.url.slice(1);
        if (nextSlug.match(/^prv(\/|$)/)) {
          this._isPrv = true;
        } else {
          this._isPrv = false;
        }
        nextSlug = nextSlug.replace(/^prv\//, "").replace("/", "-");
        if (!nextSlug) nextSlug = "home";
        if (prevSlug) {
          this.renderer.removeClass(document.body, "ctx-" + prevSlug);
        }
        if (nextSlug) {
          this.renderer.addClass(document.body, "ctx-" + nextSlug);
        }
        prevSlug = nextSlug;

        if (matomoEnabled) {
          // init() handles the first URL, so only trigger on subsequent pages
          if (prevUrl) {
            this.matomoInjector.onPageChange({ referrer: prevUrl });
          }
          prevUrl = window.location.href;
        }
      }
    });
  }

  get isPrv() {
    return this._isPrv;
  }

  quickExit(): void {
    this.dataService.quickExit();
  }
}
