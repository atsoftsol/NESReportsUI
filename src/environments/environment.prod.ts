export const environment = {
  production: true,
  apiEndPoint: 'http://202.53.10.164/',
  retryFailedRequest: 3,
  commonConfig: {
    getStates: 'api/common/states',
    getDistricts: 'api/common/districts',
    getBranches: 'api/common/branches',
    getCourses: 'api/common/courses',
    getSubjects: 'api/common/subjects',
    getInspectionReportTypes: 'api/inspection/inspectiontype',
    getInspectionCategories: 'api/inspection/inspectionCategory/{reportType}'
  },
  avReportConfig: {
    getStateWiseUsageSummary: 'api/audiovideoreport/statewiseusagesummary',
    getStateWiseUsageDetails: 'api/audiovideoreport/statewiseusagedetail/{stateId}/{startDate}/{endDate}',
    getDistrictWiseUsageSummary: 'api/audiovideoreport/districtwiseusagesummary',
    getDistrictWiseUsageDetails: 'api/audiovideoreport/districtwiseusagedetail/{stateId}/{districtId}/{startDate}/{endDate}',
    getBranchWiseUsageSummary: 'api/audiovideoreport/branchwiseusagesummary',
    getBranchWiseUsageDetails: 'api/audiovideoreport/branchwiseusagedetail/{stateId}/{districtId}/{branchId}/{startDate}/{endDate}',
    getCourseWiseUsageSummary: 'api/audiovideoreport/coursewiseusagesummary',
    getCourseWiseUsageDetails: 'api/audiovideoreport/coursewiseusagedetail/{stateId}/{districtId}/{branchId}/{courseId}/{startDate}/{endDate}',
    getSubjectWiseUsageSummary: 'api/audiovideoreport/subjectwiseusagesummary',
    getSubjectWiseUsageDetails: 'api/audiovideoreport/subjectwiseusagedetails/{stateId}/{districtId}/{branchId}/{courseId}/{subjectId}/{startDate}/{endDate}'
  },
  feedbackReportConfig: {
    getFeedbackTypes: 'api/feedbackreport/feedbacktype',
    getCategories: 'api/feedbackreport/feedbackcategory',
    getSubCategories: 'api/feedbackreport/subcategories',
    getStateWiseSummary: 'api/feedbackreport/feedbackstatewisesummary',
    getDistrictWiseSummary: 'api/feedbackreport/feedbackdistrictwisesummary',
    getBranchWiseSummary: 'api/feedbackreport/feedbackbranchwisesummary',
    getCourseWiseSummary: 'api/feedbackreport/feedbackcoursewisesummary'
  }
};