import { AfterViewInit, Component, Renderer2 } from "@angular/core";
import { LocationStrategy } from "@angular/common";
import { NavigationEnd, Router } from "@angular/router";
import { BreadcrumbComponent } from "./breadcrumb/breadcrumb.component";
import { GeneralDataService } from "./general-data.service";
import { InsertService } from "./insert/insert.service";
import { MatomoInjector } from "@ambroise-rabier/ngx-matomo";
import { environment } from "../environments/environment";
import { MissionService } from "./mission.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  providers: [MissionService],
})
export class AppComponent implements AfterViewInit {
  title = "";
  _isPrv = false;
  // Add default survey data
  allFormData = {};
  complaintTitle = 'B.C. Human Rights Tribunal'
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
