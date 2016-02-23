// New post email
Picker.route('/email/new-post/:id?', function(params, req, res, next) {
  var html;
  var post = typeof params.id === "undefined" ? Posts.findOne() : Posts.findOne(params.id);
  if (!!post) {
    html = Telescope.email.getTemplate('newPost')(Posts.getNotificationProperties(post));
  } else {
    html = "<h3>No post found.</h3>"
  }
  res.end(Telescope.email.buildTemplate(html));
});

// Post approved
Picker.route('/email/post-approved/:id?', function(params, req, res, next) {
  var html;
  var post = typeof params.id === "undefined" ? Posts.findOne() : Posts.findOne(params.id);
  if (!!post) {
    html = Telescope.email.getTemplate('postApproved')(Posts.getNotificationProperties(post));
  } else {
    html = "<h3>No post found.</h3>"
  }
  res.end(Telescope.email.buildTemplate(html));
});

// New comment email
Picker.route('/email/new-comment/:id?', function(params, req, res, next) {
  var html;
  var comment = typeof params.id === "undefined" ? Comments.findOne() : Comments.findOne(params.id);
  var post = Posts.findOne(comment.postId);
  if (!!comment) {
    html = Telescope.email.getTemplate('newComment')(Comments.getNotificationProperties(comment, post));
  } else {
    html = "<h3>No post found.</h3>"
  }
  res.end(Telescope.email.buildTemplate(html));
});

// New reply email
Picker.route('/email/new-reply/:id?', function(params, req, res, next) {
  var html;
  var comment = typeof params.id === "undefined" ? Comments.findOne() : Comments.findOne(params.id);
  var post = Posts.findOne(comment.postId);
  if (!!comment) {
    html = Telescope.email.getTemplate('newReply')(Comments.getNotificationProperties(comment, post));
  } else {
    html = "<h3>No post found.</h3>"
  }
  res.end(Telescope.email.buildTemplate(html));
});

// New user email
Picker.route('/email/new-user/:id?', function(params, req, res, next) {
  var html;
  var user = typeof params.id === "undefined" ? Meteor.users.findOne() : Meteor.users.findOne(params.id);
  var emailProperties = {
    profileUrl: Users.getProfileUrl(user),
    username: Users.getUserName(user)
  };
  html = Telescope.email.getTemplate('newUser')(emailProperties);
  res.end(Telescope.email.buildTemplate(html));
});

// Account approved email
Picker.route('/email/account-approved/:id?', function(params, req, res, next) {
  var user = typeof params.id === "undefined" ? Meteor.users.findOne() : Meteor.users.findOne(params.id);
  var emailProperties = {
    profileUrl: Users.getProfileUrl(user),
    username: Users.getUserName(user),
    siteTitle: Telescope.settings.get('title'),
    siteUrl: Telescope.utils.getSiteUrl()
  };
  var html = Telescope.email.getTemplate('accountApproved')(emailProperties);
  res.end(Telescope.email.buildTemplate(html));
});