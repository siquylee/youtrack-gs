var ytGAS = function(e) {
    var t = {};
    function __webpack_require__(s) {
        if (t[s]) {
            return t[s].exports;
        }
        var r = t[s] = {
            i: s,
            l: !1,
            exports: {}
        };
        return e[s].call(r.exports, r, r.exports, __webpack_require__), r.l = !0, r.exports;
    }
    return __webpack_require__.m = e, __webpack_require__.c = t, __webpack_require__.d = function(e, t, s) {
        __webpack_require__.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: s
        });
    }, __webpack_require__.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        });
    }, __webpack_require__.t = function(e, t) {
        if (1 & t && (e = __webpack_require__(e)), 8 & t) {
            return e;
        }
        if (4 & t && "object" == typeof e && e && e.__esModule) {
            return e;
        }
        var s = Object.create(null);
        if (__webpack_require__.r(s), Object.defineProperty(s, "default", {
            enumerable: !0,
            value: e
        }), 2 & t && "string" != typeof e) {
            for (var r in e) {
                __webpack_require__.d(s, r, function(t) {
                    return e[t];
                }.bind(null, r));
            }
        }
        return s;
    }, __webpack_require__.n = function(e) {
        var t = e && e.__esModule ? function getDefault() {
            return e.default;
        } : function getModuleExports() {
            return e;
        };
        return __webpack_require__.d(t, "a", t), t;
    }, __webpack_require__.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
    }, __webpack_require__.p = "", __webpack_require__(__webpack_require__.s = "./src/index.ts");
}({
    "./node_modules/@babel/runtime/helpers/defineProperty.js": function(e, t) {
        e.exports = function _defineProperty(e, t, s) {
            return t in e ? Object.defineProperty(e, t, {
                value: s,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = s, e;
        };
    },
    "./node_modules/@babel/runtime/helpers/objectWithoutProperties.js": function(e, t, s) {
        var r = s("./node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js");
        e.exports = function _objectWithoutProperties(e, t) {
            if (null == e) {
                return {};
            }
            var s, i, n = r(e, t);
            if (Object.getOwnPropertySymbols) {
                var o = Object.getOwnPropertySymbols(e);
                for (i = 0; i < o.length; i++) {
                    s = o[i], t.indexOf(s) >= 0 || Object.prototype.propertyIsEnumerable.call(e, s) && (n[s] = e[s]);
                }
            }
            return n;
        };
    },
    "./node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js": function(e, t) {
        e.exports = function _objectWithoutPropertiesLoose(e, t) {
            if (null == e) {
                return {};
            }
            var s, r, i = {}, n = Object.keys(e);
            for (r = 0; r < n.length; r++) {
                s = n[r], t.indexOf(s) >= 0 || (i[s] = e[s]);
            }
            return i;
        };
    },
    "./node_modules/string-template/index.js": function(e, t) {
        var s = /\{([0-9a-zA-Z_]+)\}/g;
        e.exports = function template(e) {
            var t;
            if (2 === arguments.length && "object" == typeof arguments[1]) {
                t = arguments[1];
            } else {
                t = new Array(arguments.length - 1);
                for (var r = 1; r < arguments.length; ++r) {
                    t[r - 1] = arguments[r];
                }
            }
            t && t.hasOwnProperty || (t = {});
            return e.replace(s, (function replaceArg(s, r, i) {
                var n;
                return "{" === e[i - 1] && "}" === e[i + s.length] ? r : null == (n = t.hasOwnProperty(r) ? t[r] : null) ? "" : n;
            }));
        };
    },
    "./src/endpoints/agile.ts": function(e, t, s) {
        "use strict";
        s.r(t), s.d(t, "AgilePaths", (function() {
            return n;
        })), s.d(t, "AgileEndpoint", (function() {
            return AgileEndpoint;
        }));
        var r = s("./src/endpoints/base.ts"), i = s("./src/index.ts");
        const n = {
            agiles: "/agiles",
            agile: "/agiles/{agileId}"
        };
        class AgileEndpoint extends r.BaseEndpoint {
            all(e = {}) {
                return this.getResourceWithFields(n.agiles, i.ReducedAgileImpl, {
                    qs: e
                });
            }
            byId(e) {
                return this.getResourceWithFields(this.format(n.agile, {
                    agileId: e
                }), i.AgileImpl);
            }
            delete(e) {
                return this.toPromise(this.client.delete(this.format(n.agile, {
                    agileId: e
                })));
            }
            create(e) {
                return this.postResourceWithFields(n.agiles, i.AgileImpl, {
                    body: e
                });
            }
            update(e) {
                return this.postResourceWithFields(this.format(n.agile, {
                    agileId: e.id
                }), i.AgileImpl, {
                    body: e
                });
            }
        }
    },
    "./src/endpoints/base.ts": function(e, t, s) {
        "use strict";
        s.r(t), s.d(t, "BaseEndpoint", (function() {
            return BaseEndpoint;
        }));
        var r = s("./node_modules/@babel/runtime/helpers/defineProperty.js"), i = s.n(r), n = s("./node_modules/string-template/index.js"), o = s.n(n), u = s("./src/entities/fields/utils.ts");
        function ownKeys(e, t) {
            var s = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var r = Object.getOwnPropertySymbols(e);
                t && (r = r.filter((function(t) {
                    return Object.getOwnPropertyDescriptor(e, t).enumerable;
                }))), s.push.apply(s, r);
            }
            return s;
        }
        function _objectSpread(e) {
            for (var t = 1; t < arguments.length; t++) {
                var s = null != arguments[t] ? arguments[t] : {};
                t % 2 ? ownKeys(Object(s), !0).forEach((function(t) {
                    i()(e, t, s[t]);
                })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(s)) : ownKeys(Object(s)).forEach((function(t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(s, t));
                }));
            }
            return e;
        }
        class BaseEndpoint {
            constructor(e) {
                this.client = e;
            }
            format(e, t) {
                return o()(e, t);
            }
            toPromise(e) {
                return new Promise((t, s) => {
                    let r = e.getResponseCode(), i = e.getContentText(), n = e.getHeaders()["Content-Type"], o = !!n && n.includes("application/json");
                    try {
                        let e = o ? JSON.parse(i) : i;
                        200 <= r && r < 300 ? t(e) : s(e);
                    } catch (e) {
                        s(e);
                    }
                });
            }
            getResource(e, t = {}) {
                return this.toPromise(this.client.get(e, t));
            }
            postResource(e, t = {}) {
                return this.toPromise(this.client.post(e, t));
            }
            getResourceWithFields(e, t, s = {}) {
                return this.getResource(e, {
                    qs: _objectSpread({
                        fields: Object(u.generateFieldsQuery)(new t)
                    }, s.qs || {})
                });
            }
            postResourceWithFields(e, t, s = {}) {
                return this.postResource(e, _objectSpread(_objectSpread({}, s), {}, {
                    qs: _objectSpread({
                        fields: Object(u.generateFieldsQuery)(new t)
                    }, s.qs || {})
                }));
            }
        }
    },
    "./src/endpoints/comment.ts": function(e, t, s) {
        "use strict";
        s.r(t), s.d(t, "CommentPaths", (function() {
            return n;
        })), s.d(t, "CommentEndpoint", (function() {
            return CommentEndpoint;
        }));
        var r = s("./src/endpoints/base.ts"), i = s("./src/entities/comment.ts");
        const n = {
            comment: "/issues/{issueId}/comments/{commentId}",
            comments: "/issues/{issueId}/comments"
        };
        class CommentEndpoint extends r.BaseEndpoint {
            all(e, t = {}) {
                return this.getResourceWithFields(this.format(n.comments, {
                    issueId: e
                }), i.IssueCommentImpl, {
                    qs: t
                });
            }
            create(e, t) {
                return this.postResourceWithFields(this.format(n.comments, {
                    issueId: e
                }), i.IssueCommentImpl, {
                    body: t
                });
            }
            update(e, t) {
                return this.postResourceWithFields(this.format(n.comment, {
                    issueId: e,
                    commentId: t.id
                }), i.IssueCommentImpl, {
                    body: t
                });
            }
            delete(e, t) {
                return this.toPromise(this.client.delete(this.format(n.comment, {
                    issueId: e,
                    commentId: t
                })));
            }
        }
    },
    "./src/endpoints/issue.ts": function(e, t, s) {
        "use strict";
        s.r(t), s.d(t, "IssuePaths", (function() {
            return c;
        })), s.d(t, "CommandPaths", (function() {
            return d;
        })), s.d(t, "IssueEndpoint", (function() {
            return IssueEndpoint;
        }));
        var r = s("./node_modules/@babel/runtime/helpers/defineProperty.js"), i = s.n(r), n = s("./src/endpoints/base.ts"), o = s("./src/index.ts"), u = s("./src/entities/command.ts");
        function ownKeys(e, t) {
            var s = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var r = Object.getOwnPropertySymbols(e);
                t && (r = r.filter((function(t) {
                    return Object.getOwnPropertyDescriptor(e, t).enumerable;
                }))), s.push.apply(s, r);
            }
            return s;
        }
        function _objectSpread(e) {
            for (var t = 1; t < arguments.length; t++) {
                var s = null != arguments[t] ? arguments[t] : {};
                t % 2 ? ownKeys(Object(s), !0).forEach((function(t) {
                    i()(e, t, s[t]);
                })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(s)) : ownKeys(Object(s)).forEach((function(t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(s, t));
                }));
            }
            return e;
        }
        const c = {
            issue: "/issues/{issueId}",
            issues: "/issues"
        }, d = {
            commands: "/commands"
        };
        class IssueEndpoint extends n.BaseEndpoint {
            byId(e) {
                return this.getResourceWithFields(this.format(c.issue, {
                    issueId: e
                }), o.IssueImpl);
            }
            search(e, t = {}) {
                return this.getResourceWithFields(c.issues, o.ReducedIssueImpl, {
                    qs: _objectSpread({
                        query: e
                    }, t)
                });
            }
            delete(e) {
                return this.toPromise(this.client.delete(this.format(c.issue, {
                    issueId: e
                })));
            }
            create(e) {
                return this.postResourceWithFields(c.issues, o.IssueImpl, {
                    body: e
                });
            }
            update(e) {
                return this.postResourceWithFields(this.format(c.issue, {
                    issueId: e.id
                }), o.IssueImpl, {
                    body: e
                });
            }
            executeCommand(e) {
                return this.postResourceWithFields(d.commands, u.CommandListImpl, {
                    body: e
                });
            }
        }
    },
    "./src/endpoints/project.ts": function(e, t, s) {
        "use strict";
        s.r(t), s.d(t, "ProjectPaths", (function() {
            return o;
        })), s.d(t, "ProjectEndpoint", (function() {
            return ProjectEndpoint;
        }));
        var r = s("./src/endpoints/base.ts"), i = s("./src/index.ts"), n = s("./src/entities/workItem.ts");
        const o = {
            projects: "/admin/projects",
            project: "/admin/projects/{projectId}",
            workItemTypes: "/admin/projects/{projectId}/timeTrackingSettings/workItemTypes"
        };
        class ProjectEndpoint extends r.BaseEndpoint {
            all(e = {}) {
                return this.getResourceWithFields(o.projects, i.ReducedProjectImpl, {
                    qs: e
                });
            }
            byId(e) {
                return this.getResourceWithFields(this.format(o.project, {
                    projectId: e
                }), i.ProjectImpl);
            }
            getWorkItemTypes(e) {
                return this.getResourceWithFields(this.format(o.workItemTypes, {
                    projectId: e
                }), n.WorkItemTypeImpl);
            }
        }
    },
    "./src/endpoints/sprint.ts": function(e, t, s) {
        "use strict";
        s.r(t), s.d(t, "SprintPaths", (function() {
            return n;
        })), s.d(t, "SprintEndpoint", (function() {
            return SprintEndpoint;
        }));
        var r = s("./src/endpoints/base.ts"), i = s("./src/index.ts");
        const n = {
            sprints: "/agiles/{agileId}/sprints",
            sprint: "/agiles/{agileId}/sprints/{sprintId}"
        };
        class SprintEndpoint extends r.BaseEndpoint {
            all(e, t = {}) {
                return this.getResourceWithFields(this.format(n.sprints, {
                    agileId: e
                }), i.ReducedSprintImpl, {
                    qs: t
                });
            }
            byId(e, t) {
                return this.getResourceWithFields(this.format(n.sprint, {
                    agileId: e,
                    sprintId: t
                }), i.SprintImpl);
            }
            delete(e, t) {
                return this.toPromise(this.client.delete(this.format(n.sprint, {
                    agileId: e,
                    sprintId: t
                })));
            }
            create(e, t) {
                return this.postResourceWithFields(this.format(n.sprints, {
                    agileId: e
                }), i.SprintImpl, {
                    body: t
                });
            }
            update(e, t) {
                return this.postResourceWithFields(this.format(n.sprint, {
                    agileId: e,
                    sprintId: t.id
                }), i.SprintImpl, {
                    body: t
                });
            }
        }
    },
    "./src/endpoints/tag.ts": function(e, t, s) {
        "use strict";
        s.r(t), s.d(t, "TagPaths", (function() {
            return n;
        })), s.d(t, "TagEndpoint", (function() {
            return TagEndpoint;
        }));
        var r = s("./src/endpoints/base.ts"), i = s("./src/entities/issueTag.ts");
        const n = {
            issueTags: "/issueTags",
            issueTag: "/issueTags/{tagId}"
        };
        class TagEndpoint extends r.BaseEndpoint {
            all(e = {}) {
                return this.getResourceWithFields(n.issueTags, i.IssueTagImpl, {
                    qs: e
                });
            }
            byId(e) {
                return this.getResourceWithFields(this.format(n.issueTag, {
                    tagId: e
                }), i.IssueTagImpl);
            }
        }
    },
    "./src/endpoints/user.ts": function(e, t, s) {
        "use strict";
        s.r(t), s.d(t, "UserPaths", (function() {
            return n;
        })), s.d(t, "UserEndpoint", (function() {
            return UserEndpoint;
        }));
        var r = s("./src/endpoints/base.ts"), i = s("./src/index.ts");
        const n = {
            current: "/admin/users/me",
            users: "/admin/users",
            user: "/admin/users/{userId}"
        };
        class UserEndpoint extends r.BaseEndpoint {
            current() {
                return this.getResourceWithFields(n.current, i.UserImpl);
            }
            all(e = {}) {
                return this.getResourceWithFields(n.users, i.ReducedUserImpl, {
                    qs: e
                });
            }
            byId(e) {
                return this.getResourceWithFields(this.format(n.user, {
                    userId: e
                }), i.UserImpl);
            }
        }
    },
    "./src/endpoints/workitem.ts": function(e, t, s) {
        "use strict";
        s.r(t), s.d(t, "WorkItemPaths", (function() {
            return n;
        })), s.d(t, "WorkItemEndpoint", (function() {
            return WorkItemEndpoint;
        }));
        var r = s("./src/endpoints/base.ts"), i = s("./src/index.ts");
        const n = {
            workitems: "/issues/{issueId}/timeTracking/workItems",
            workitem: "/issues/{issueId}/timeTracking/workItems/{workItemId}"
        };
        class WorkItemEndpoint extends r.BaseEndpoint {
            all(e, t = {}) {
                return this.getResourceWithFields(this.format(n.workitems, {
                    issueId: e
                }), i.WorkItemImpl, {
                    qs: t
                });
            }
            create(e, t) {
                return this.postResourceWithFields(this.format(n.workitems, {
                    issueId: e
                }), i.WorkItemImpl, {
                    body: t
                });
            }
            update(e, t) {
                return this.postResourceWithFields(this.format(n.workitem, {
                    issueId: e,
                    workItemId: t.id
                }), i.WorkItemImpl, {
                    body: t
                });
            }
            delete(e, t) {
                return this.toPromise(this.client.delete(this.format(n.workitem, {
                    issueId: e,
                    workItemId: t
                })));
            }
        }
    },
    "./src/entities/agile.ts": function(e, t, s) {
        "use strict";
        s.r(t), s.d(t, "ReducedAgileImpl", (function() {
            return ReducedAgileImpl;
        })), s.d(t, "AgileImpl", (function() {
            return AgileImpl;
        }));
        var r = s("./node_modules/@babel/runtime/helpers/defineProperty.js"), i = s.n(r), n = s("./src/entities/project.ts"), o = s("./src/entities/user.ts"), u = s("./src/entities/sprint.ts");
        class ReducedAgileImpl {
            constructor() {
                i()(this, "id", ""), i()(this, "name", ""), i()(this, "owner", new o.ReducedUserImpl), 
                i()(this, "projects", [ new n.ReducedProjectImpl ]), i()(this, "sprints", [ new u.ReducedSprintImpl ]), 
                i()(this, "currentSprint", new u.ReducedSprintImpl);
            }
        }
        class AgileImpl extends ReducedAgileImpl {
            constructor(...e) {
                super(...e), i()(this, "orphansAtTheTop", !1), i()(this, "hideOrphansSwimlane", !1);
            }
        }
    },
    "./src/entities/command.ts": function(e, t, s) {
        "use strict";
        s.r(t), s.d(t, "CommandListImpl", (function() {
            return CommandListImpl;
        }));
        var r = s("./node_modules/@babel/runtime/helpers/defineProperty.js"), i = s.n(r), n = s("./src/entities/issue.ts");
        class CommandListImpl {
            constructor() {
                i()(this, "id", ""), i()(this, "caret", 0), i()(this, "commands", []), i()(this, "comment", ""), 
                i()(this, "issues", [ new n.ReducedIssueImpl ]), i()(this, "query", ""), i()(this, "runAs", ""), 
                i()(this, "silent", !1), i()(this, "suggestions", []), i()(this, "usesMarkdown", !1), 
                i()(this, "visibility", null);
            }
        }
    },
    "./src/entities/comment.ts": function(e, t, s) {
        "use strict";
        s.r(t), s.d(t, "IssueCommentImpl", (function() {
            return IssueCommentImpl;
        }));
        var r = s("./node_modules/@babel/runtime/helpers/defineProperty.js"), i = s.n(r), n = s("./src/entities/user.ts"), o = s("./src/entities/issue.ts");
        class IssueCommentImpl {
            constructor() {
                i()(this, "author", new n.ReducedUserImpl), i()(this, "deleted", !1), i()(this, "issue", new o.ReducedIssueImpl), 
                i()(this, "attachments", []), i()(this, "created", 0), i()(this, "id", ""), i()(this, "text", ""), 
                i()(this, "textPreview", ""), i()(this, "updated", 0), i()(this, "usesMarkdown", !1), 
                i()(this, "visibility", null);
            }
        }
    },
    "./src/entities/customField.ts": function(e, t, s) {
        "use strict";
        s.r(t), s.d(t, "CustomFieldImpl", (function() {
            return CustomFieldImpl;
        }));
        var r = s("./node_modules/@babel/runtime/helpers/defineProperty.js"), i = s.n(r), n = s("./src/entities/customFieldDefaults.ts");
        class CustomFieldImpl {
            constructor() {
                i()(this, "aliases", ""), i()(this, "fieldDefaults", new n.CustomFieldDefaultsImpl), 
                i()(this, "hasRunningJob", !1), i()(this, "isAutoAttached", !1), i()(this, "isDisplayedInIssueList", !1), 
                i()(this, "isUpdateable", !1), i()(this, "localizedName", ""), i()(this, "name", ""), 
                i()(this, "ordinal", 0), i()(this, "id", "");
            }
        }
    },
    "./src/entities/customFieldDefaults.ts": function(e, t, s) {
        "use strict";
        s.r(t), s.d(t, "CustomFieldDefaultsImpl", (function() {
            return CustomFieldDefaultsImpl;
        }));
        var r = s("./node_modules/@babel/runtime/helpers/defineProperty.js"), i = s.n(r);
        class CustomFieldDefaultsImpl {
            constructor() {
                i()(this, "canBeEmpty", !1), i()(this, "emptyFieldText", ""), i()(this, "isPublic", !1), 
                i()(this, "id", "");
            }
        }
    },
    "./src/entities/fieldStyle.ts": function(e, t, s) {
        "use strict";
        s.r(t), s.d(t, "FieldStyleImpl", (function() {
            return FieldStyleImpl;
        }));
        var r = s("./node_modules/@babel/runtime/helpers/defineProperty.js"), i = s.n(r);
        class FieldStyleImpl {
            constructor() {
                i()(this, "id", ""), i()(this, "background", ""), i()(this, "foreground", "");
            }
        }
    },
    "./src/entities/fields/utils.ts": function(e, t, s) {
        "use strict";
        s.r(t), s.d(t, "generateFields", (function() {
            return generateFields;
        })), s.d(t, "generateFieldsQuery", (function() {
            return generateFieldsQuery;
        }));
        const nestedField = (e, t) => `${e}(${t.join(",")})`, generateFields = e => Object.getOwnPropertyNames(e).map(t => {
            const s = e[t];
            if ("object" == typeof s && s) {
                if (!Array.isArray(s)) {
                    return nestedField(t, generateFields(s));
                }
                if (s.length > 0) {
                    return nestedField(t, generateFields(s[0]));
                }
            }
            return t;
        }), generateFieldsQuery = e => generateFields(e).join(",");
    },
    "./src/entities/issue.ts": function(e, t, s) {
        "use strict";
        s.r(t), s.d(t, "ReducedIssueImpl", (function() {
            return ReducedIssueImpl;
        })), s.d(t, "IssueImpl", (function() {
            return IssueImpl;
        }));
        var r = s("./node_modules/@babel/runtime/helpers/defineProperty.js"), i = s.n(r), n = s("./src/entities/project.ts"), o = s("./src/entities/user.ts"), u = s("./src/entities/issueTag.ts"), c = s("./src/entities/issueLink.ts"), d = s("./src/entities/issueCustomField.ts"), l = s("./src/entities/comment.ts");
        class ReducedIssueImpl {
            constructor() {
                i()(this, "id", ""), i()(this, "numberInProject", 0), i()(this, "created", 0), i()(this, "updated", 0), 
                i()(this, "project", new n.ReducedProjectImpl), i()(this, "summary", ""), i()(this, "description", "");
            }
        }
        class IssueImpl extends ReducedIssueImpl {
            constructor(...e) {
                super(...e), i()(this, "reporter", new o.ReducedUserImpl), i()(this, "updater", new o.ReducedUserImpl), 
                i()(this, "wikifiedDescription", void 0), i()(this, "usesMarkdown", !1), i()(this, "fields", [ new d.IssueCustomFieldImpl ]), 
                i()(this, "isDraft", !1), i()(this, "tags", [ new u.IssueTagImpl ]), i()(this, "links", [ new c.IssueLinkImpl ]), 
                i()(this, "comments", [ new l.IssueCommentImpl ]);
            }
        }
    },
    "./src/entities/issueCustomField.ts": function(e, t, s) {
        "use strict";
        s.r(t), s.d(t, "IssueCustomFieldValueImpl", (function() {
            return IssueCustomFieldValueImpl;
        })), s.d(t, "IssueCustomFieldImpl", (function() {
            return IssueCustomFieldImpl;
        }));
        var r = s("./node_modules/@babel/runtime/helpers/defineProperty.js"), i = s.n(r), n = s("./src/entities/fieldStyle.ts"), o = s("./src/entities/projectCustomField.ts");
        class IssueCustomFieldValueImpl {
            constructor() {
                i()(this, "id", ""), i()(this, "name", ""), i()(this, "localizedName", ""), i()(this, "fullName", ""), 
                i()(this, "login", ""), i()(this, "avatarUrl", ""), i()(this, "isResolved", !1), 
                i()(this, "color", new n.FieldStyleImpl);
            }
        }
        class IssueCustomFieldImpl {
            constructor() {
                i()(this, "id", ""), i()(this, "projectCustomField", new o.ProjectCustomFieldImpl), 
                i()(this, "value", new IssueCustomFieldValueImpl), i()(this, "$type", ""), i()(this, "name", "");
            }
        }
    },
    "./src/entities/issueLink.ts": function(e, t, s) {
        "use strict";
        s.r(t), s.d(t, "IssueLinkTypeImpl", (function() {
            return IssueLinkTypeImpl;
        })), s.d(t, "IssueLinkImpl", (function() {
            return IssueLinkImpl;
        }));
        var r = s("./node_modules/@babel/runtime/helpers/defineProperty.js"), i = s.n(r), n = s("./src/entities/issue.ts");
        class IssueLinkTypeImpl {
            constructor() {
                i()(this, "id", ""), i()(this, "name", ""), i()(this, "sourceToTarget", ""), i()(this, "targetToSource", ""), 
                i()(this, "directed", !1), i()(this, "aggregation", !1), i()(this, "readOnly", !1);
            }
        }
        class IssueLinkImpl {
            constructor() {
                i()(this, "id", ""), i()(this, "direction", ""), i()(this, "linkType", new IssueLinkTypeImpl), 
                i()(this, "issue", new n.ReducedIssueImpl), i()(this, "issues", [ new n.ReducedIssueImpl ]);
            }
        }
    },
    "./src/entities/issueTag.ts": function(e, t, s) {
        "use strict";
        s.r(t), s.d(t, "ReducedIssueTagImpl", (function() {
            return ReducedIssueTagImpl;
        })), s.d(t, "IssueTagImpl", (function() {
            return IssueTagImpl;
        }));
        var r = s("./node_modules/@babel/runtime/helpers/defineProperty.js"), i = s.n(r), n = s("./src/entities/user.ts");
        class ReducedIssueTagImpl {
            constructor() {
                i()(this, "name", ""), i()(this, "id", "");
            }
        }
        class IssueTagImpl extends ReducedIssueTagImpl {
            constructor(...e) {
                super(...e), i()(this, "untagOnResolve", !1), i()(this, "owner", new n.ReducedUserImpl);
            }
        }
    },
    "./src/entities/project.ts": function(e, t, s) {
        "use strict";
        s.r(t), s.d(t, "ReducedProjectImpl", (function() {
            return ReducedProjectImpl;
        })), s.d(t, "ProjectImpl", (function() {
            return ProjectImpl;
        }));
        var r = s("./node_modules/@babel/runtime/helpers/defineProperty.js"), i = s.n(r), n = s("./src/entities/user.ts"), o = s("./src/entities/projectCustomField.ts");
        class ReducedProjectImpl {
            constructor() {
                i()(this, "id", ""), i()(this, "name", ""), i()(this, "shortName", ""), i()(this, "description", ""), 
                i()(this, "archived", !1);
            }
        }
        class ProjectImpl extends ReducedProjectImpl {
            constructor(...e) {
                super(...e), i()(this, "createdBy", new n.ReducedUserImpl), i()(this, "fields", [ new o.ProjectCustomFieldImpl ]), 
                i()(this, "fromEmail", ""), i()(this, "hubResourceId", ""), i()(this, "iconUrl", ""), 
                i()(this, "timeTrackingEnabled", !1), i()(this, "leader", new n.ReducedUserImpl);
            }
        }
    },
    "./src/entities/projectCustomField.ts": function(e, t, s) {
        "use strict";
        s.r(t), s.d(t, "ProjectCustomFieldImpl", (function() {
            return ProjectCustomFieldImpl;
        }));
        var r = s("./node_modules/@babel/runtime/helpers/defineProperty.js"), i = s.n(r), n = s("./src/entities/customField.ts");
        class ProjectCustomFieldImpl {
            constructor() {
                i()(this, "canBeEmpty", !1), i()(this, "emptyFieldText", ""), i()(this, "field", new n.CustomFieldImpl), 
                i()(this, "hasRunningJob", !1), i()(this, "isPublic", !1), i()(this, "ordinal", 0), 
                i()(this, "id", "");
            }
        }
    },
    "./src/entities/sprint.ts": function(e, t, s) {
        "use strict";
        s.r(t), s.d(t, "ReducedSprintImpl", (function() {
            return ReducedSprintImpl;
        })), s.d(t, "SprintImpl", (function() {
            return SprintImpl;
        }));
        var r = s("./node_modules/@babel/runtime/helpers/defineProperty.js"), i = s.n(r), n = s("./src/entities/agile.ts"), o = s("./src/entities/issue.ts");
        class ReducedSprintImpl {
            constructor() {
                i()(this, "id", ""), i()(this, "name", ""), i()(this, "goal", ""), i()(this, "start", 0), 
                i()(this, "finish", 0), i()(this, "archived", !1), i()(this, "unresolvedIssuesCount", 0), 
                i()(this, "previousSprint", void 0);
            }
        }
        class SprintImpl extends ReducedSprintImpl {
            constructor(...e) {
                super(...e), i()(this, "agile", new n.ReducedAgileImpl), i()(this, "issues", [ new o.ReducedIssueImpl ]), 
                i()(this, "isDefault", !1);
            }
        }
    },
    "./src/entities/user.ts": function(e, t, s) {
        "use strict";
        s.r(t), s.d(t, "ReducedUserImpl", (function() {
            return ReducedUserImpl;
        })), s.d(t, "UserImpl", (function() {
            return UserImpl;
        }));
        var r = s("./node_modules/@babel/runtime/helpers/defineProperty.js"), i = s.n(r), n = s("./src/entities/issueTag.ts");
        class ReducedUserImpl {
            constructor() {
                i()(this, "email", ""), i()(this, "fullName", ""), i()(this, "login", ""), i()(this, "name", ""), 
                i()(this, "id", "");
            }
        }
        class UserImpl extends ReducedUserImpl {
            constructor(...e) {
                super(...e), i()(this, "avatarUrl", ""), i()(this, "banned", !1), i()(this, "online", !1), 
                i()(this, "guest", !1), i()(this, "jabberAccountName", ""), i()(this, "ringId", ""), 
                i()(this, "tags", [ new n.ReducedIssueTagImpl ]);
            }
        }
    },
    "./src/entities/workItem.ts": function(e, t, s) {
        "use strict";
        s.r(t), s.d(t, "DurationValueImpl", (function() {
            return DurationValueImpl;
        })), s.d(t, "WorkItemTypeImpl", (function() {
            return WorkItemTypeImpl;
        })), s.d(t, "WorkItemImpl", (function() {
            return WorkItemImpl;
        }));
        var r = s("./node_modules/@babel/runtime/helpers/defineProperty.js"), i = s.n(r), n = s("./src/entities/issue.ts"), o = s("./src/entities/user.ts");
        class DurationValueImpl {
            constructor() {
                i()(this, "presentation", ""), i()(this, "id", ""), i()(this, "minutes", 0);
            }
        }
        class WorkItemTypeImpl {
            constructor() {
                i()(this, "id", ""), i()(this, "name", ""), i()(this, "autoAttached", !1);
            }
        }
        class WorkItemImpl {
            constructor() {
                i()(this, "id", ""), i()(this, "created", 0), i()(this, "date", 0), i()(this, "duration", new DurationValueImpl), 
                i()(this, "issue", new n.ReducedIssueImpl), i()(this, "updated", 0), i()(this, "author", new o.ReducedUserImpl), 
                i()(this, "creator", new o.ReducedUserImpl), i()(this, "text", ""), i()(this, "textPreview", ""), 
                i()(this, "type", new WorkItemTypeImpl), i()(this, "usesMarkdown", !1);
            }
        }
    },
    "./src/index.ts": function(e, t, s) {
        "use strict";
        s.r(t);
        var r = s("./src/youtrack.ts");
        s.d(t, "Youtrack", (function() {
            return r.Youtrack;
        }));
        var i = s("./src/entities/command.ts");
        s.d(t, "CommandListImpl", (function() {
            return i.CommandListImpl;
        }));
        var n = s("./src/entities/comment.ts");
        s.d(t, "IssueCommentImpl", (function() {
            return n.IssueCommentImpl;
        }));
        var o = s("./src/entities/customField.ts");
        s.d(t, "CustomFieldImpl", (function() {
            return o.CustomFieldImpl;
        }));
        var u = s("./src/entities/customFieldDefaults.ts");
        s.d(t, "CustomFieldDefaultsImpl", (function() {
            return u.CustomFieldDefaultsImpl;
        }));
        var c = s("./src/entities/issue.ts");
        s.d(t, "ReducedIssueImpl", (function() {
            return c.ReducedIssueImpl;
        })), s.d(t, "IssueImpl", (function() {
            return c.IssueImpl;
        }));
        var d = s("./src/entities/issueTag.ts");
        s.d(t, "ReducedIssueTagImpl", (function() {
            return d.ReducedIssueTagImpl;
        })), s.d(t, "IssueTagImpl", (function() {
            return d.IssueTagImpl;
        }));
        var l = s("./src/entities/project.ts");
        s.d(t, "ReducedProjectImpl", (function() {
            return l.ReducedProjectImpl;
        })), s.d(t, "ProjectImpl", (function() {
            return l.ProjectImpl;
        }));
        var p = s("./src/entities/projectCustomField.ts");
        s.d(t, "ProjectCustomFieldImpl", (function() {
            return p.ProjectCustomFieldImpl;
        }));
        var a = s("./src/entities/agile.ts");
        s.d(t, "ReducedAgileImpl", (function() {
            return a.ReducedAgileImpl;
        })), s.d(t, "AgileImpl", (function() {
            return a.AgileImpl;
        }));
        var m = s("./src/entities/sprint.ts");
        s.d(t, "ReducedSprintImpl", (function() {
            return m.ReducedSprintImpl;
        })), s.d(t, "SprintImpl", (function() {
            return m.SprintImpl;
        }));
        var h = s("./src/entities/user.ts");
        s.d(t, "ReducedUserImpl", (function() {
            return h.ReducedUserImpl;
        })), s.d(t, "UserImpl", (function() {
            return h.UserImpl;
        }));
        var I = s("./src/entities/workItem.ts");
        s.d(t, "DurationValueImpl", (function() {
            return I.DurationValueImpl;
        })), s.d(t, "WorkItemTypeImpl", (function() {
            return I.WorkItemTypeImpl;
        })), s.d(t, "WorkItemImpl", (function() {
            return I.WorkItemImpl;
        }));
        var f = s("./src/endpoints/comment.ts");
        s.d(t, "CommentPaths", (function() {
            return f.CommentPaths;
        })), s.d(t, "CommentEndpoint", (function() {
            return f.CommentEndpoint;
        }));
        var b = s("./src/endpoints/issue.ts");
        s.d(t, "IssuePaths", (function() {
            return b.IssuePaths;
        })), s.d(t, "CommandPaths", (function() {
            return b.CommandPaths;
        })), s.d(t, "IssueEndpoint", (function() {
            return b.IssueEndpoint;
        }));
        var g = s("./src/endpoints/project.ts");
        s.d(t, "ProjectPaths", (function() {
            return g.ProjectPaths;
        })), s.d(t, "ProjectEndpoint", (function() {
            return g.ProjectEndpoint;
        }));
        var j = s("./src/endpoints/agile.ts");
        s.d(t, "AgilePaths", (function() {
            return j.AgilePaths;
        })), s.d(t, "AgileEndpoint", (function() {
            return j.AgileEndpoint;
        }));
        var y = s("./src/endpoints/sprint.ts");
        s.d(t, "SprintPaths", (function() {
            return y.SprintPaths;
        })), s.d(t, "SprintEndpoint", (function() {
            return y.SprintEndpoint;
        }));
        var _ = s("./src/endpoints/tag.ts");
        s.d(t, "TagPaths", (function() {
            return _.TagPaths;
        })), s.d(t, "TagEndpoint", (function() {
            return _.TagEndpoint;
        }));
        var P = s("./src/endpoints/user.ts");
        s.d(t, "UserPaths", (function() {
            return P.UserPaths;
        })), s.d(t, "UserEndpoint", (function() {
            return P.UserEndpoint;
        }));
        var w = s("./src/endpoints/workitem.ts");
        s.d(t, "WorkItemPaths", (function() {
            return w.WorkItemPaths;
        })), s.d(t, "WorkItemEndpoint", (function() {
            return w.WorkItemEndpoint;
        }));
    },
    "./src/youtrack.ts": function(e, t, s) {
        "use strict";
        s.r(t), s.d(t, "Youtrack", (function() {
            return Youtrack;
        }));
        var r = s("./node_modules/@babel/runtime/helpers/objectWithoutProperties.js"), i = s.n(r), n = s("./node_modules/@babel/runtime/helpers/defineProperty.js"), o = s.n(n), u = s("./src/endpoints/user.ts"), c = s("./src/endpoints/tag.ts"), d = s("./src/endpoints/issue.ts"), l = s("./src/endpoints/project.ts"), p = s("./src/endpoints/agile.ts"), a = s("./src/endpoints/sprint.ts"), m = s("./src/endpoints/workitem.ts"), h = s("./src/endpoints/comment.ts");
        function ownKeys(e, t) {
            var s = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var r = Object.getOwnPropertySymbols(e);
                t && (r = r.filter((function(t) {
                    return Object.getOwnPropertyDescriptor(e, t).enumerable;
                }))), s.push.apply(s, r);
            }
            return s;
        }
        function _objectSpread(e) {
            for (var t = 1; t < arguments.length; t++) {
                var s = null != arguments[t] ? arguments[t] : {};
                t % 2 ? ownKeys(Object(s), !0).forEach((function(t) {
                    o()(e, t, s[t]);
                })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(s)) : ownKeys(Object(s)).forEach((function(t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(s, t));
                }));
            }
            return e;
        }
        class Youtrack {
            constructor(e) {
                o()(this, "baseUrl", void 0), o()(this, "defaultRequestOptions", {
                    muteHttpExceptions: !0,
                    contentType: "application/json"
                }), o()(this, "users", void 0), o()(this, "tags", void 0), o()(this, "issues", void 0), 
                o()(this, "projects", void 0), o()(this, "agiles", void 0), o()(this, "sprints", void 0), 
                o()(this, "workItems", void 0), o()(this, "comments", void 0), this.defaultRequestOptions = _objectSpread(_objectSpread({}, this.defaultRequestOptions), {}, {
                    headers: {
                        Authorization: "Bearer " + e.token
                    }
                }), this.baseUrl = this.formBaseUrl(e.baseUrl), this.users = new u.UserEndpoint(this), 
                this.tags = new c.TagEndpoint(this), this.issues = new d.IssueEndpoint(this), this.projects = new l.ProjectEndpoint(this), 
                this.agiles = new p.AgileEndpoint(this), this.sprints = new a.SprintEndpoint(this), 
                this.workItems = new m.WorkItemEndpoint(this), this.comments = new h.CommentEndpoint(this);
            }
            post(e, t = {}, s = {}) {
                return this.fetch(this.baseUrl + e, this.prepareParams("post", t, s));
            }
            get(e, t = {}, s = {}) {
                return this.fetch(this.baseUrl + e, this.prepareParams("get", t, s));
            }
            delete(e, t = {}, s = {}) {
                return this.fetch(this.baseUrl + e, this.prepareParams("delete", t, s));
            }
            put(e, t = {}, s = {}) {
                return this.fetch(this.baseUrl + e, this.prepareParams("put", t, s));
            }
            fetch(e, t) {
                return t.qs && (e = `${e}?${this.toQueryString(t.qs)}`, delete t.qs), UrlFetchApp.fetch(e, t);
            }
            formBaseUrl(e) {
                return e.match(/\/$/) && (e = e.slice(0, -1)), e.match(/api$/i) || (e += "/api"), 
                e;
            }
            prepareParams(e, t, s) {
                if ("get" !== e && (t.payload = JSON.stringify(t.body ? t.body : t)), t.method = e, 
                "headers" in this.defaultRequestOptions && Object.keys(s).length > 0) {
                    const e = this.defaultRequestOptions, {headers: r} = e;
                    return _objectSpread(_objectSpread(_objectSpread({}, i()(e, [ "headers" ])), t), {}, {
                        headers: _objectSpread(_objectSpread({}, r), s)
                    });
                }
                return "headers" in this.defaultRequestOptions ? _objectSpread(_objectSpread({}, this.defaultRequestOptions), t) : _objectSpread(_objectSpread(_objectSpread({}, this.defaultRequestOptions), t), {}, {
                    headers: _objectSpread({}, s)
                });
            }
            toQueryString(e) {
                return Object.keys(e).reduce((t, s) => {
                    const r = e[s];
                    return r ? (Array.isArray(r) ? r.forEach(e => t.push(`${s}[]=${encodeURIComponent(e)}`)) : t.push(`${s}=${encodeURIComponent(r)}`), 
                    t) : t;
                }, []).join("&");
            }
        }
    }
});