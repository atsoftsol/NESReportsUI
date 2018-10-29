// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiEndPoint: 'http://202.53.10.164/',
  retryFailedRequest: 3,
  commonConfig: {
    getStates: 'api/common/states',
    getDistricts: 'api/common/districts/{stateIds}',
    getBranches: 'api/common/branches/{districtIds}',
    getCourses: 'api/common/courses',
    getSubjects: 'api/common/subjects'
  },
  avReportConfig: {
    getStateWiseUsageSummary: 'api/audiovideoreport/statewiseusagesummary/{stateCodes}/{startDate}/{endDate}',
    getStateWiseUsageDetails: 'api/audiovideoreport/statewiseusagedetail/{stateCodes}/{startDate}/{endDate}',
    getDistrictWiseUsageSummary: 'api/audiovideoreport/districtwiseusagesummary/{stateCodes}/{districtCodes}/{startDate}/{endDate}',
    getDistrictWiseUsageDetails: 'api/audiovideoreport/districtwiseusagedetail/{stateCode}/{districtCode}/{startDate}/{endDate}',
    getBranchWiseUsageSummary: 'api/audiovideoreport/branchwiseusagesummary/{stateCodes}/{districtCodes}/{branchcodes}/{startDate}/{endDate}',
    getBranchWiseUsageDetails: 'api/audiovideoreport/branchwiseusagedetail/{stateCode}/{districtCode}/{branchcode}/{startDate}/{endDate}',
    getCourseWiseUsageSummary: 'api/audiovideoreport/coursewiseusagesummary/{stateCodes}/{districtCodes}/{branchCodes}/{courseCode}/{startDate}/{endDate}',
    getCourseWiseUsageDetails: 'api/audiovideoreport/coursewiseusagedetail/{stateCode}/{districtCode}/{branchCode}/{courseCode}/{startDate}/{endDate}',
    getSubjectWiseUsageSummary: 'api/audiovideoreport/subjectwiseusagesummary/{stateCodes}/{districtCodes}/{branchCodes}/{courseCodes}/{startDate}/{endDate}',
    getSubjectWiseUsageDetails: 'api/audiovideoreport/subjectwiseusagedetails/{stateCodes}/{districtCodes}/{branchCodes}/{courseCodes}/{subjectCode}/{startDate}/{endDate}'
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
