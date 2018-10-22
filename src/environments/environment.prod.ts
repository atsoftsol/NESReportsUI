export const environment = {
  production: true,
  apiEndPoint: 'http://202.53.14.107/',
  retryFailedRequest: 3,
  commonConfig: {
    getStates: 'api/common/states',
    getDistricts: 'api/common/districts/{stateIds}',
    getBranches: 'api/common/branches/{districtIds}',
    getCourses: 'api/common/courses',
    getSubjects: 'api/common/subjects'
  },
  avReportConfig: {
    getStateWiseUsageSummary: 'api/avreport/statewiseusagesummary/{stateCodes}/{startDate}/{endDate}',
    getStateWiseUsageDetails: 'api/avreport/statewiseusagedetails/{stateCode}/{startDate}/{endDate}',
    getDistrictWiseUsageSummary: 'api/avreport/districtwiseusagesummary/{stateCodes}/{startDate}/{endDate}',
    getDistrictWiseUsageDetails: 'api/avreport/districtwiseusagedetails/{districtCode}/{startDate}/{endDate}',
    getBranchWiseUsageSummary: 'api/avreport/branchwiseusagesummary/{stateCodes}/{districtCodes}/{startDate}/{endDate}',
    getBranchWiseUsageDetails: 'api/avreport/branchwiseusagedetails/{stateCode}/{districtCode}/{branchCode}/{startDate}/{endDate}',
    getCourseWiseUsageSummary: 'api/avreport/coursewiseusagesummary/{stateCodes}/{districtCodes}/{branchCodes}/{startDate}/{endDate}',
    getCourseWiseUsageDetails: 'api/avreport/coursewiseusagedetails/{stateCodes}/{districtCodes}/{branchCodes}/{courseCode}/{startDate}/{endDate}',
    getSubjectWiseUsageSummary: 'api/avreport/subjectwiseusagesummary/{stateCodes}/{districtCodes}/{branchCodes}/{courseCodes}/{startDate}/{endDate}',
    getSubjectWiseUsageDetails: 'api/avreport/subjectwiseusagedetails/{stateCodes}/{districtCodes}/{branchCodes}/{courseCodes}/{subjectCode}/{startDate}/{endDate}'
  }
};