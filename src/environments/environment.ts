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
    getStateWiseUsageSummary: 'api/audiovideoreport/statewiseusagesummary/{stateIds}/{startDate}/{endDate}',
    getStateWiseUsageDetails: 'api/audiovideoreport/statewiseusagedetail/{stateId}/{startDate}/{endDate}',
    getDistrictWiseUsageSummary: 'api/audiovideoreport/districtwiseusagesummary/{stateIds}/{districtIds}/{startDate}/{endDate}',
    getDistrictWiseUsageDetails: 'api/audiovideoreport/districtwiseusagedetail/{stateId}/{districtId}/{startDate}/{endDate}',
    getBranchWiseUsageSummary: 'api/audiovideoreport/branchwiseusagesummary/{stateIds}/{districtIds}/{branchIds}/{startDate}/{endDate}',
    getBranchWiseUsageDetails: 'api/audiovideoreport/branchwiseusagedetail/{stateId}/{districtId}/{branchId}/{startDate}/{endDate}',
    getCourseWiseUsageSummary: 'api/audiovideoreport/coursewiseusagesummary/{stateIds}/{districtIds}/{branchIds}/{courseIds}/{startDate}/{endDate}',
    getCourseWiseUsageDetails: 'api/audiovideoreport/coursewiseusagedetail/{stateId}/{districtId}/{branchId}/{courseId}/{startDate}/{endDate}',
    getSubjectWiseUsageSummary: 'api/audiovideoreport/subjectwiseusagesummary/{stateIds}/{districtIds}/{branchIds}/{courseIds}/{subjectIds}/{startDate}/{endDate}',
    getSubjectWiseUsageDetails: 'api/audiovideoreport/subjectwiseusagedetails/{stateId}/{districtId}/{branchId}/{courseId}/{subjectId}/{startDate}/{endDate}'
  }
};