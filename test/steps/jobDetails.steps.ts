import { When, Then } from '@cucumber/cucumber';
import { JobPage } from '../../src/pages/JobPage';
import employeeData from '../../src/data/employeeData.json';

When(
    'I navigate to the Job tab',
    async function () {
        const jobPage = new JobPage(this.page);

        await jobPage.navigateToJob();
    }
);

When(
    'I update the job details',
    async function () {
        const jobPage = new JobPage(this.page);

        await jobPage.enterJoinedDate(employeeData.job.joinedDate);
        await jobPage.selectJobTitle(employeeData.job.jobTitle);
        await jobPage.selectJobCategory(employeeData.job.jobCategory);
        await jobPage.selectSubUnit(employeeData.job.subUnit);
        await jobPage.selectLocation();
        await jobPage.selectEmploymentStatus(employeeData.job.employmentStatus);
    }
);

When(
    'I save the job details',
    async function () {
        const jobPage = new JobPage(this.page);

        await jobPage.saveJobDetails();
    }
);

Then(
    'the job details should be saved successfully',
    async function () {
        const jobPage = new JobPage(this.page);

        await jobPage.verifySuccessfullySaved();
    }
);