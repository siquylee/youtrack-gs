const config = {
  baseUrl: "https://gslack.myjetbrains.com/youtrack",
  token: "perm:cXV5bHM=.NDctMA==.IdUew3Z7hMc47UB46zU4WZTsO7SeVE"
};

// Users

function getCurrentUser() {
  // get the current user
  const client = new youtrack.Youtrack(config);
  client.users.current().then((user) => {
    Logger.log({ user });
  });
}

function getAllUsers() {
  // get all users
  const client = new youtrack.Youtrack(config);
  client.users.all().then((users) => {
    Logger.log({ users });
  });
}

function getUserById() {
  // get a user by id
  const client = new youtrack.Youtrack(config);
  client.users.byId('1-1').then((user) => {
    Logger.log({ user });
  });
}

function getIssueById() {
  const client = new youtrack.Youtrack(config);
  client.issues.byId('SYT-2').then((issue) => {
    Logger.log(issue);
  }).catch(e => Logger.log(e));
}

// Projects

function getAllProjects() {
  // get all projects
  const client = new youtrack.Youtrack(config);
  client.projects.all().then((projects) => {
    Logger.log(projects);
  });
}

function getProjectById() {
  // get a project by its id
  const client = new youtrack.Youtrack(config);
  client.projects.byId('0-0').then((project) => {
    Logger.log(project);
  });
}

function getTemplate() {
  const client = new youtrack.Youtrack(config);
}