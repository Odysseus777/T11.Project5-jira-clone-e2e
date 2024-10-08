/*POM approach - before running, download TimeTracking.js to your ../pages folder and update import path if needed:

https://github.com/Odysseus777/T11.Project5-jira-clone-e2e/blob/master/cypress/pages/TimeTracking.js

*/

import TimeTracking from '../pages/TimeTracking';

describe('Time tracking', () => {
  const originalEstimateHours = '10';
  const updatedEstimateHours = '20';
  const timeSpent = '2';
  const timeRemaining = '5';

  beforeEach(() => {
    cy.visit('/');
    cy.url()
      .should('eq', `${Cypress.env('baseUrl')}project/board`)
      .then((url) => {
        cy.visit(url + '/board');
        TimeTracking.getIssueDetailModal();
      });
  });

  it('Should test time estimation functionality', () => {
    // Reset time tracker and estimate hours on existing task:
    TimeTracking.clearEstimateHours();
    TimeTracking.clearTimeTrackingModal();
    TimeTracking.checkNoTimeLoggedIsVisible();
    // Add estimation 10h and validate:
    TimeTracking.insertEstimateHours(originalEstimateHours);
    TimeTracking.closeIssueDetailModal();
    TimeTracking.getIssueDetailModal();
    TimeTracking.validateEstimationValue(originalEstimateHours);
    TimeTracking.validateTTrackerSyncOriginal(originalEstimateHours);
    // Update estimation to 20h and validate:
    TimeTracking.insertEstimateHours(updatedEstimateHours);
    TimeTracking.closeIssueDetailModal();
    TimeTracking.getIssueDetailModal();
    TimeTracking.validateEstimationValue(updatedEstimateHours);
    TimeTracking.validateTTrackerSyncUpdated(updatedEstimateHours);
    // Remove estimation and validate removal:
    TimeTracking.clearEstimateHours();
    TimeTracking.closeIssueDetailModal();
    TimeTracking.getIssueDetailModal();
    TimeTracking.validateEstimateHoursRemoval();
  });

  it('Should test time logging functionality', () => {
    // Adding original estimation 10h:
    TimeTracking.insertEstimateHours(originalEstimateHours);
    // Log time:
    TimeTracking.getTimeTrackingModal();
    TimeTracking.insertTimeSpent(timeSpent);
    TimeTracking.insertTimeRemaining(timeRemaining);
    TimeTracking.clickDoneButton();
    TimeTracking.checkNoTimeLoggedIsNotVisible();
    TimeTracking.checkNewTimeLoggedRemaining(timeSpent, timeRemaining);
    // Remove logged time:
    TimeTracking.clearTimeTrackingModal();
    TimeTracking.checkNoTimeLoggedIsVisible();
    TimeTracking.validateTTrackerSyncOriginal(originalEstimateHours);
  });
});