const config = {
  baseUrl: "https://gslack.myjetbrains.com/youtrack",
  token: "perm:cXV5bHM=.NDctMQ==.l64FIOR6KEGaCAKq3FiZI33dyccBIY"
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

// Issue Comments

function getComments() {
  // list comments of an issue
  const client = new ytGAS.Youtrack(config);
  client.comments.all('SYT-3').then((comments) => {
    Logger.log(comments);
  }).catch(err => {
    Logger.log(err);
  });
}

function createComment() {
  // add comment to issue
  const client = new ytGAS.Youtrack(config);
  client.comments.create('SYT-3', {
    text: 'issue comment'
  }).then(comment => {
    Logger.log(comment);
  }).catch(err => {
    Logger.log(err);
  });
}

function updateComment() {
  // update comment
  const client = new ytGAS.Youtrack(config);
  client.comments.update('SYT-3', {
    id: '4-3',
    text: 'updated issue comment'
  }).then(comment => {
    Logger.log(comment);
  }).catch(err => {
    Logger.log(err);
  });
}

function deleteComment() {
  // delete a comment
  const client = new ytGAS.Youtrack(config);
  client.comments.delete('SYT-3', '4-1')
    .then(() => {
      Logger.log('comment deleted.');
    }).catch(err => {
      Logger.log(err);
    });
}

// Issue Tags

function getTags() {
  // get all tags
  const client = new ytGAS.Youtrack(config);
  client.tags.all()
    .then((tags) => {
      Logger.log({ tags });
    }).catch(err => {
      Logger.log(err);
    });
}

function getTagById() {
  // get tag by id
  const client = new ytGAS.Youtrack(config);
  client.tags.byId('6-0')
    .then((tag) => {
      Logger.log(tag);
    }).catch(err => {
      Logger.log(err);
    });
}

// Issue Links

function getIssueLinks() {
  // get issue links of issue
  const client = new ytGAS.Youtrack(config);
  client.issues.byId('SYT-3')
    .then((issue) => {
      Logger.log({ links: issue.links });
    }).catch(err => {
      Logger.log(err);
    });
}

function updateIssueLinks() {
  // update issue link(s)
  const client = new ytGAS.Youtrack(config);
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
}

// Agiles

function getAgiles() {
  // get all agile boards
  const client = new ytGAS.Youtrack(config);
  client.agiles.all()
    .then((agiles) => {
      Logger.log(agiles);
    }).catch(err => {
      Logger.log(err);
    });
}

function getAgileById() {
  // get specific agile board by id
  const client = new ytGAS.Youtrack(config);
  client.agiles.byId('115-0')
    .then((agile) => {
      Logger.log(agile);
    }).catch(err => {
      Logger.log(err);
    });
}

function createAgile() {
  // create new agile board
  const client = new ytGAS.Youtrack(config);
  client.agiles.create({
    name: '19-15',
    projects: [{ id: '0-0' }]
  }).then((agile) => {
    Logger.log(agile);
  }).catch(err => {
    Logger.log(err);
  });
}

function deleteAgile() {
  // delete an agile board 
  const client = new ytGAS.Youtrack(config);
  client.agiles.delete('115-2')
    .then(() => {
      Logger.log('agile deleted.');
    }).catch(err => {
      Logger.log(err);
    });
}

function updateAgile() {
  // update an agile board
  const client = new ytGAS.Youtrack(config);
  client.agiles.update({
    id: '115-2', projects: [{ id: '0-0' }]
  }).then((agile) => {
    Logger.log(agile);
  }).catch(err => {
    Logger.log(err);
  });
}

// Sprints

const agileId = '115-1';

function getSprints() {
  // get all sprints of an agile board
  const client = new ytGAS.Youtrack(config);
  client.sprints.all(agileId)
    .then(sprints => {
      Logger.log(sprints);
    }).catch(err => {
      Logger.log(err);
    });
}

function getSprintById() {
  // get agile sprint by id
  const client = new ytGAS.Youtrack(config);
  client.sprints.byId(agileId, '116-1')
    .then(sprint => {
      Logger.log(sprint);
    }).catch(err => {
      Logger.log(err);
    });
}

function createSprint() {
  // create new sprint
  const client = new ytGAS.Youtrack(config);
  client.sprints.create(agileId, { name: 'my sprint' })
    .then(sprint => {
      Logger.log(sprint);
    }).catch(err => {
      Logger.log(err);
    });
}

function updateSprint() {
  // update a sprint
  const client = new ytGAS.Youtrack(config);
  client.sprints.update(agileId, { id: '116-1', name: 'my sprint 3' })
    .then(sprint => {
      Logger.log( sprint );
    }).catch(err => {
      Logger.log(err);
    });
}

function deleteSprint() {
  // delete a sprint
  const client = new ytGAS.Youtrack(config);
  client.sprints.delete(agileId, '116-1')
    .then(() => {
      Logger.log('sprint deleted.');
    }).catch(err => {
      Logger.log(err);
    });
}