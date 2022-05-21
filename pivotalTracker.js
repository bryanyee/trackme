

function createHtmlContent() {
  const htmlContent = document.createElement('div');
  htmlContent.setAttribute('id', 'branch-name-section');
  htmlContent.style.marginBottom = '10px';
  htmlContent.style.width = '100%';
  htmlContent.innerHTML = `<button id="branch-name-button" style="border: 1px solid #CCC; border-radius: 2px; cursor: pointer; padding: 2px; width: 100%;">Branch name</button>`;
  return htmlContent;
}

// Branch name convention:
// <tracker-id>/<story-type>/<story-description-text>
// e.g. 123456789/feature/hello-my-feature

function generateBranchName() {
  const rawTitle = document.querySelector('[aria-label="story title"]').value;
  const smallWords = ['a', 'the', 'an'];
  const titleValue = rawTitle.toLowerCase().split(/[^a-zA-Z\d]/).filter((word) => !smallWords.includes(word)).slice(0, 7).join('-');
  const rawId = document.querySelector('[aria-label="story id"]').value;
  const idValue = rawId.slice(1);
  const storyTypeValue = document.querySelector('[name="story[story_type]"]').value;
  return `${idValue}/${storyTypeValue}/${titleValue}`;
}

function copyBranchNameToClipboard() {
  const branchName = generateBranchName();
  navigator.clipboard.writeText(branchName);

  const button = document.querySelector('#branch-name-button');
  button.textContent = 'Copied to clipboard!';
  setTimeout(() => {
    button.textContent = 'Branch name';
  }, 2000);
}

function appendBranchNameButton() {
  // Create the html containing the button
  const htmlContent = createHtmlContent();

  // Add a click event handler, to copy a generated branch name to the clipboard
  htmlContent.addEventListener('click', function(e) {
    e.preventDefault();
    copyBranchNameToClipboard();
  });

  // Insert the html into Tracker page
  const navSection = document.querySelector('nav.edit');
  navSection.after(htmlContent);
}

function start() {
  const interval = setInterval(function() {
    if (document.querySelector('.project') !== null) {
      appendBranchNameButton();
      clearInterval(interval);
    }
  }, 1000);
}

start();
