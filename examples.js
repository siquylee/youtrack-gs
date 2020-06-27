const config = {
  baseUrl: "https://gslack.myjetbrains.com/youtrack",
  token: "perm:cXV5bHM=.NDctMA==.IdUew3Z7hMc47UB46zU4WZTsO7SeVE"
};

function getIssueById() {
  const client = new youtrack.Youtrack(config);
  client.issues.byId('SYT-2').then((issue) => {
    Logger.log(issue);
  }).catch(e => Logger.log(e));
}
