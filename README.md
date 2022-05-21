## Trackme

A chrome extension that adds the following capabilities:
- On a Pivotal Tracker story page, adds a button to automatically generate a branch name and copy it to the clipboard.
- When creating a GitHub PR, adds a link to the Tracker ticket into the PR desciption.

**Branch name convention:**
```
<tracker-id>/<story-type>/<story-description-text>

e.g. 123456789/feature/hello-my-feature
```

### Add extension
- Clone the repo.
- Open the options menu in the top right corner of a Chrome browser > "More Tools" > "Extensions".
- Click "Load Unpacked".
- Select the `plugins` folder in the repo.
