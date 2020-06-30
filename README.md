![logo](https://user-images.githubusercontent.com/13404717/59300590-da2b6600-8c8f-11e9-82b2-ab3dc856ffdb.jpeg)

# youtrack-gs
Client library for accessing [YouTrack REST API](https://www.jetbrains.com/help/youtrack/standalone/youtrack-rest-api-reference.html) for [Google Apps Script](https://developers.google.com/apps-script)

**This is the Google Apps Scripts version of [youtrack-rest-client](https://github.com/shanehofstetter/youtrack-rest-client)**

## Install

* Open the Script Editor 
* Select File -> New -> Script file
* Input the file name as you want, for example: youtrack.gs
* Clear the default code in new gs file
* Copy the raw contents of the dist/youtrack-1.3.2.js file in this repo and paste it in the Script Editor pane on the youtrack.gs file.

## Usage

### Authentication

**With your permanent token (see [Manage-Permanent-Token](https://www.jetbrains.com/help/youtrack/incloud/Manage-Permanent-Token.html)):**

```javascript
const config = {
  baseUrl: "http://example.myjetbrains.com/youtrack",
  token: "perm:your-token"
};
const client = new ytGAS.Youtrack(config);
```

### [Users](https://www.jetbrains.com/help/youtrack/incloud/api-entity-User.html)

```javascript
// get the current user
client.users.current()
    .then((user) => {
      Logger.log(user);
    }).catch(err => {
      Logger.log(err);
    });

// get all users
client.users.all()
    .then((users) => {
      Logger.log(users);
    }).catch(err => {
      Logger.log(err);
    });
}

// get a user by id
client.users.byId('1-1')
    .then((user) => {
      Logger.log(user);
    }).catch(err => {
      Logger.log(err);
    });
```


### [Projects](https://www.jetbrains.com/help/youtrack/incloud/api-entity-Project.html)

```javascript
// get all projects
client.projects.all()
    .then((projects) => {
      Logger.log(projects);
    }).catch(err => {
      Logger.log(err);
    });

// get a project by its id
client.projects.byId('0-0')
    .then((project) => {
      Logger.log(project);
    }).catch(err => {
      Logger.log(err);
    });
```

### [Issues](https://www.jetbrains.com/help/youtrack/incloud/api-entity-Issue.html)

```javascript
// search/list issues
client.issues.search('project: SYT')
    .then((issues) => {
      Logger.log(issues);
    }).catch(err => {
      Logger.log(err);
    });
```

```javascript
// get issue by id
client.issues.byId('SYT-4')
    .then((issue) => {
      Logger.log(issue);
    }).catch(err => {
      Logger.log(err);
    });
```

```javascript
// delete an issue
client.issues.delete('SYT-4')
    .then(() => {
      Logger.log('issue deleted');
    }).catch(err => {
      Logger.log(err);
    });
```

```javascript
// create a new issue
client.issues.create({
    summary: 'lorem ipsum',
    description: 'created using rest api',
    project: {
      id: '0-0'
    }
  }).then(issue => {
    Logger.log(issue);
  }).catch(err => {
    Logger.log(err);
  });
```

```javascript
// update an issue
client.issues.update({
    id: 'SYT-4',
    summary: "updated summary"
  }).then(issue => {
    Logger.log(issue);
  }).catch(err => {
    Logger.log(err);
  });
```

### [Commands](https://www.jetbrains.com/help/youtrack/incloud/api-entity-CommandList.html)

```javascript
// execute command for issue(s) (internal id is used)
client.issues.executeCommand({
    query: 'for me',
    issues: [
      {
        id: '2-5'
      }
    ]
  }).then(response => {
    Logger.log(response);
  }).catch(err => {
    Logger.log(err);
  });
```

```javascript
// execute command for issue(s) and add a comment
client.issues.executeCommand({
    query: 'for me',
    comment: 'gonna solve this real quick',
    issues: [
      {
        id: '2-5'
      }
    ]
  }).then(response => {
    Logger.log(response);
  }).catch(err => {
    Logger.log(err);
  });
```

### [WorkItems (Time-Tracking)](https://www.jetbrains.com/help/youtrack/incloud/api-entity-IssueWorkItem.html)

```javascript
// get the configured workitem types for the project
client.projects.getWorkItemTypes('0-0')
    .then((workItemTypes) => {
      Logger.log(workItemTypes);
    }).catch(err => {
      Logger.log(err);
    });
```

```javascript
// list the workitems of a project
client.workItems.all('SYT-3')
    .then((workItems) => {
      Logger.log(workItems);
    }).catch(err => {
      Logger.log(err);
    });
```

```javascript
// add new workitem to project
client.workItems.create('SYT-3', {
    duration: {
      presentation: '30m'
    },
    text: 'fixed bug',
    type: {
      name: 'Development',
      id: '88-0'
    }
  }).then(workItem => {
    Logger.log(workItem);
  }).catch(err => {
    Logger.log(err);
  });
```

```javascript
// update workitem
client.workItems.update('SYT-3', {
    id: '136-0',
    duration: {
      presentation: '45m'
    }
  }).then(workItem => {
    Logger.log(workItem);
  }).catch(err => {
    Logger.log(err);
  });
```

```javascript
// delete work item
client.workItems.delete('SYT-3', '136-0')
    .then(() => {
      Logger.log('workitem deleted.');
    }).catch(err => {
      Logger.log(err);
    });
```

### [Issue Comments](https://www.jetbrains.com/help/youtrack/incloud/api-entity-IssueComment.html)

```javascript
// list comments of an issue
client.comments.all('SYT-3').then((comments) => {
    Logger.log(comments);
  }).catch(err => {
    Logger.log(err);
  });
```

```javascript
// add comment to issue
client.comments.create('SYT-3', {
    text: 'issue comment'
  }).then(comment => {
    Logger.log(comment);
  }).catch(err => {
    Logger.log(err);
  });
```

```javascript
// update comment
client.comments.update('SYT-3', {
    id: '4-3',
    text: 'updated issue comment'
  }).then(comment => {
    Logger.log(comment);
  }).catch(err => {
    Logger.log(err);
  });
```

```javascript
// delete a comment
client.comments.delete('SYT-3', '4-1')
    .then(() => {
      Logger.log('comment deleted.');
    }).catch(err => {
      Logger.log(err);
    });
```

### [Issue Tags](https://www.jetbrains.com/help/youtrack/incloud/api-entity-IssueTag.html)

```javascript
// get all tags
client.tags.all()
    .then((tags) => {
      Logger.log({ tags });
    }).catch(err => {
      Logger.log(err);
    });

// get tag by id
client.tags.byId('6-0')
    .then((tag) => {
      Logger.log(tag);
    }).catch(err => {
      Logger.log(err);
    });
```

### [Issue Links](https://www.jetbrains.com/help/youtrack/incloud/api-entity-IssueLink.html)

```javascript
// get issue links of issue
client.issues.byId('SYT-3')
    .then((issue) => {
      Logger.log({ links: issue.links });
    }).catch(err => {
      Logger.log(err);
    });

// update issue link(s)
client.issues.update({
    id: 'SYT-3',
    links: [
      {
        issues: [
          {
            id: '2-7'
          }
        ],
        id: '104-3s',
      }
    ]
  }).then((issue) => {
    Logger.log({ links: issue.links });
  }).catch(err => {
    Logger.log(err);
  });
```

### [Agiles](https://www.jetbrains.com/help/youtrack/incloud/api-entity-Agile.html)

```javascript
// get all agile boards
client.agiles.all()
    .then((agiles) => {
      Logger.log(agiles);
    }).catch(err => {
      Logger.log(err);
    });

// get specific agile board by id
client.agiles.byId('115-0')
    .then((agile) => {
      Logger.log(agile);
    }).catch(err => {
      Logger.log(err);
    });

// create new agile board
client.agiles.create({
    name: '19-15',
    projects: [{ id: '0-0' }]
  }).then((agile) => {
    Logger.log(agile);
  }).catch(err => {
    Logger.log(err);
  });

// delete an agile board 
client.agiles.delete('115-2')
    .then(() => {
      Logger.log('agile deleted.');
    }).catch(err => {
      Logger.log(err);
    });

// update an agile board
client.agiles.update({
    id: '115-2', projects: [{ id: '0-0' }]
  }).then((agile) => {
    Logger.log(agile);
  }).catch(err => {
    Logger.log(err);
  });
```

### [Sprints](https://www.jetbrains.com/help/youtrack/incloud/api-entity-Sprint.html)

```javascript
const agileId = '104-0';

// get all sprints of an agile board
client.sprints.all(agileId)
    .then(sprints => {
      Logger.log(sprints);
    }).catch(err => {
      Logger.log(err);
    });

// get agile sprint by id
client.sprints.byId(agileId, '116-1')
    .then(sprint => {
      Logger.log(sprint);
    }).catch(err => {
      Logger.log(err);
    });

// create new sprint
client.sprints.create(agileId, { name: 'my sprint' })
    .then(sprint => {
      Logger.log(sprint);
    }).catch(err => {
      Logger.log(err);
    });

// update a sprint
client.sprints.update(agileId, { id: '116-1', name: 'my sprint 3' })
    .then(sprint => {
      Logger.log(sprint);
    }).catch(err => {
      Logger.log(err);
    });

// delete a sprint
client.sprints.delete(agileId, '116-1')
    .then(() => {
      Logger.log('sprint deleted.');
    }).catch(err => {
      Logger.log(err);
    });
```

## Contributing

If you encounter any missing features or bugs, you're welcome to open an Issue! PRs are welcome too ;-)

1. Fork it (https://github.com/siquylee/youtrack-gs/fork)
2. Create your feature branch (git checkout -b my-new-feature)
3. Commit your changes (git commit -am 'Add some feature')
4. Push to the branch (git push origin my-new-feature)
5. Create a new Pull Request
