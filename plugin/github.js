// Example url for PR against the default branch:
// https://github.com/bryanyee/trackme/compare/123456789/feature/story-description-text

// Example url for PR against a specific branch:
// https://github.com/bryanyee/trackme/compare/987654321/feature/story-description-text...123456789/feature/story-description-text

// Branch name convention:
// <tracker-id>/<story-type>/<story-description-text>
// e.g. 123456789/feature/hello-my-feature

function getTrackerIdFromUrl(url) {
  const branchNameRegex = new RegExp(/(\d{9})\/(feature|bug|chore)/g);
  const branchNameMatch = url.match(branchNameRegex);
  if (branchNameMatch === null) {
    return null;
  }

  const comparisonOperatorRegex = new RegExp(/\.\.\./);
  const isComparingDefaultBranch = url.match(comparisonOperatorRegex) === null;
  if (isComparingDefaultBranch) {
    return url.match(/(\d{9})\/(feature|bug|chore)/)[1]
  }

  const rightSideBranchNameRegex = new RegExp(/\.\.\.(\d{9})\/(feature|bug|chore)/);
  const rightSideBranchNameMatch = url.match(rightSideBranchNameRegex);
  if (rightSideBranchNameMatch) {
    return rightSideBranchNameMatch[1];
  }
  return null;
}

function appendTrackerLink() {
  const prDescriptionTextArea = document.getElementById('pull_request_body');

  // Grab tracker id from the page url
  const storyId = getTrackerIdFromUrl(window.location.href);
  if (storyId === null) {
    prDescriptionTextArea.value = '';
    return;
  }
  // Generate tracker link
  const trackerUrl = `https://www.pivotaltracker.com/story/show/${storyId}`; // e.g. https://www.pivotaltracker.com/story/show/181903576
  const trackerMarkdownLink = `[Tracker ${storyId}](${trackerUrl})`;         // e.g. [Tracker 181903576](https://www.pivotaltracker.com/story/show/181903576)

  // Append tracker link to the PR description
  prDescriptionTextArea.value = trackerMarkdownLink;
}

waitForContent('#pull_request_body', 500, appendTrackerLink);
