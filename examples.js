const config = {
  baseUrl: "https://gslack.myjetbrains.com/youtrack",
  token: "perm:cXV5bHM=.NDctMA==.IdUew3Z7hMc47UB46zU4WZTsO7SeVE"
};

// Users

function getCurrentUser() {
  // get the current user
  const client = new ytGAS.Youtrack(config);
  client.users.current()
    .then((user) => {
      Logger.log(user);
    }).catch(err => {
      Logger.log(err);
    });
}

function getAllUsers() {
  // get all users
  const client = new ytGAS.Youtrack(config);
  client.users.all()
    .then((users) => {
      Logger.log(users);
    }).catch(err => {
      Logger.log(err);
    });
}

function getUserById() {
  // get a user by id
  const client = new ytGAS.Youtrack(config);
  client.users.byId('1-1')
    .then((user) => {
      Logger.log(user);
    }).catch(err => {
      Logger.log(err);
    });
}

// Projects

function getProjects() {
  // get all projects
  const client = new ytGAS.Youtrack(config);
  client.projects.all()
    .then((projects) => {
      Logger.log(projects);
    }).catch(err => {
      Logger.log(err);
    });
}

function getProjectById() {
  // get a project by its id
  const client = new ytGAS.Youtrack(config);
  client.projects.byId('0-0')
    .then((project) => {
      Logger.log(project);
    }).catch(err => {
      Logger.log(err);
    });
}

// Issues

function getIssues() {
  // search/list issues
  const client = new ytGAS.Youtrack(config);
  client.issues.search('project: SYT')
    .then((issues) => {
      Logger.log(issues);
    }).catch(err => {
      Logger.log(err);
    });
}

function getIssueById() {
  // get issue by id
  const client = new ytGAS.Youtrack(config);
  client.issues.byId('SYT-4')
    .then((issue) => {
      Logger.log(issue);
    }).catch(err => {
      Logger.log(err);
    });
}

function deleteIssue() {
  // delete an issue
  const client = new ytGAS.Youtrack(config);
  client.issues.delete('SYT-4')
    .then(() => {
      Logger.log('issue deleted');
    }).catch(err => {
      Logger.log(err);
    });
}

function createIssue() {
  // create a new issue
  const client = new ytGAS.Youtrack(config);
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
}

function updateIssue() {
  // update an issue
  const client = new ytGAS.Youtrack(config);
  client.issues.update({
    id: 'SYT-4',
    summary: "updated summary"
  }).then(issue => {
    Logger.log(issue);
  }).catch(err => {
    Logger.log(err);
  });
}

// Commands

function executeCommandAssign() {
  // execute command for issue(s) (internal id is used)
  const client = new ytGAS.Youtrack(config);
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
}

function executeCommandAddComment() {
  // execute command for issue(s) and add a comment
  const client = new ytGAS.Youtrack(config);
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
}

// WorkItems (Time-Tracking)

function getWorkItemTypes() {
  // get the configured workitem types for the project
  const client = new ytGAS.Youtrack(config);
  client.projects.getWorkItemTypes('0-0')
    .then((workItemTypes) => {
      Logger.log(workItemTypes);
    }).catch(err => {
      Logger.log(err);
    });
}

function getWorkItems() {
  // list the workitems of a project
  const client = new ytGAS.Youtrack(config);
  client.workItems.all('SYT-3')
    .then((workItems) => {
      Logger.log(workItems);
    }).catch(err => {
      Logger.log(err);
    });
}

function createWorkItem() {
  // add new workitem to project
  const client = new ytGAS.Youtrack(config);
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
}

function updateWorkItem() {
  // update workitem
  const client = new ytGAS.Youtrack(config);
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
}

function deleteWorkItem() {
  // delete work item
  const client = new ytGAS.Youtrack(config);
  client.workItems.delete('SYT-3', '136-0')
    .then(() => {
      Logger.log('workitem deleted.');
    }).catch(err => {
      Logger.log(err);
    });
}