"use strict";



define('capstone_front_end/adapters/application', ['exports', 'capstone_front_end/config/environment', 'active-model-adapter', 'ember'], function (exports, _capstone_front_endConfigEnvironment, _activeModelAdapter, _ember) {
  exports['default'] = _activeModelAdapter['default'].extend({
    host: _capstone_front_endConfigEnvironment['default'].apiHost,

    auth: _ember['default'].inject.service(),

    headers: _ember['default'].computed('auth.credentials.token', {
      get: function get() {
        var headers = {};
        var token = this.get('auth.credentials.token');
        if (token) {
          headers.Authorization = 'Token token=' + token;
        }

        return headers;
      }
    })
  });
});
define('capstone_front_end/app', ['exports', 'ember', 'capstone_front_end/resolver', 'ember-load-initializers', 'capstone_front_end/config/environment'], function (exports, _ember, _capstone_front_endResolver, _emberLoadInitializers, _capstone_front_endConfigEnvironment) {

  var App = undefined;

  _ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = _ember['default'].Application.extend({
    modulePrefix: _capstone_front_endConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _capstone_front_endConfigEnvironment['default'].podModulePrefix,
    Resolver: _capstone_front_endResolver['default']
  });

  (0, _emberLoadInitializers['default'])(App, _capstone_front_endConfigEnvironment['default'].modulePrefix);

  exports['default'] = App;
});
define('capstone_front_end/components/add-doc', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    auth: _ember['default'].inject.service(),

    user: _ember['default'].computed.alias('auth.credentials.email'),
    isAuthenticated: _ember['default'].computed.alias('auth.isAuthenticated'),
    docs: _ember['default'].inject.service(),

    actions: {
      saveDoc: function saveDoc() {
        console.log($('textarea').val());
        var input = $('textarea').val();
        var title = $('.title').val();
        this.get('docs').saveDoc(input, title);
      },
      mouseUp: function mouseUp() {
        console.log('in mouse up');
        window.mySelection = $('textarea').val().substring(this.selectionStart, this.selectionEnd);
        console.log(window.getSelection().toString());
      }
    }
  });
});
define('capstone_front_end/components/change-password-form', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    tagName: 'form',
    classNames: ['form-horizontal'],

    passwords: {},

    actions: {
      submit: function submit() {
        this.sendAction('submit', this.get('passwords'));
      },

      reset: function reset() {
        this.set('passwords', {});
      }
    }
  });
});
define('capstone_front_end/components/custom-textarea', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].TextArea.extend({
    didRender: function didRender() {
      $('textarea').mouseup(function () {
        console.log('inside text area');
        window.mySelection = $('textarea').val().substring(this.selectionStart, this.selectionEnd);
        console.log(window.getSelection().toString());
      });
    }
  });
});
define('capstone_front_end/components/delete-docs', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    auth: _ember['default'].inject.service(),

    user: _ember['default'].computed.alias('auth.credentials.email'),
    isAuthenticated: _ember['default'].computed.alias('auth.isAuthenticated'),
    docs: _ember['default'].inject.service(),

    actions: {
      deleteDocs: function deleteDocs(id) {
        console.log(id);
        console.log('in delete component');
        // this.get('docs').deleteDoc(id)
        return this.sendAction('deleteItem');
      }
    }
  });
});
define('capstone_front_end/components/docs', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    auth: _ember['default'].inject.service(),

    user: _ember['default'].computed.alias('auth.credentials.email'),
    isAuthenticated: _ember['default'].computed.alias('auth.isAuthenticated'),
    docs: _ember['default'].inject.service(),

    actions: {
      deleteDocs: function deleteDocs(id) {
        console.log(id);
        console.log('in new delete component');
        // this.get('docs').deleteDoc(id)
        return this.sendAction('deleteDocs');
      },
      edit: function edit(doc) {
        console.log('inside edit component');
        console.log(this.get('doc.title'));
        console.log(this.get('doc.text'));
        var title = this.get('doc.title');
        console.log(title);
        this.get('docs').set('currentDoc', doc);
        console.log(this.get('docs.currentDoc'));
        return this.sendAction('edit', doc);
      },
      toggle: function toggle() {
        console.log('inside docs component');
      },
      mouseUp: function mouseUp() {
        console.log('in mouse up');
        window.mySelection = $('textarea').val().substring(this.selectionStart, this.selectionEnd);
        console.log(window.getSelection().toString());
      }
    }
  });
});
define('capstone_front_end/components/edit-doc', ['exports', 'ember', 'ember-local-storage', 'capstone_front_end/storages/auth', 'capstone_front_end/storages/docs'], function (exports, _ember, _emberLocalStorage, _capstone_front_endStoragesAuth, _capstone_front_endStoragesDocs) {
  exports['default'] = _ember['default'].Component.extend({
    auth: _ember['default'].inject.service(),

    user: _ember['default'].computed.alias('auth.credentials.email'),
    isAuthenticated: _ember['default'].computed.alias('auth.isAuthenticated'),
    docs: _ember['default'].inject.service(),

    actions: {
      edit: function edit(doc) {
        console.log(doc.title);
      },
      mouseUp: function mouseUp() {
        console.log('in mouse up');
        window.mySelection = $('textarea').val().substring(this.selectionStart, this.selectionEnd);
        console.log(window.getSelection().toString());
      },
      saveDoc: function saveDoc() {
        console.log($('textarea').val());
        var input = $('textarea').val();
        var title = $('.title').val();
        this.get('docs').saveDoc(input, title);
      }
    }
  });
});
define('capstone_front_end/components/email-input', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    tagName: 'div',
    classNames: ['form-group']
  });
});
define('capstone_front_end/components/flash-message', ['exports', 'ember-cli-flash/components/flash-message'], function (exports, _emberCliFlashComponentsFlashMessage) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliFlashComponentsFlashMessage['default'];
    }
  });
});
define('capstone_front_end/components/hamburger-menu', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    tagName: 'button',
    classNames: ['navbar-toggle', 'collapsed'],
    attributeBindings: ['toggle:data-toggle', 'target:data-target', 'expanded:aria-expanded'],
    toggle: 'collapse',
    target: '#navigation',
    expanded: false
  });
});
define('capstone_front_end/components/my-application', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    auth: _ember['default'].inject.service(),

    user: _ember['default'].computed.alias('auth.credentials.email'),
    isAuthenticated: _ember['default'].computed.alias('auth.isAuthenticated'),

    actions: {
      signOut: function signOut() {
        this.sendAction('signOut');
      },
      show: function show() {
        console.log('inside show');
        $('#popover').popover('toggle');
      }
    }
  });
});
define('capstone_front_end/components/my-docs', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    auth: _ember['default'].inject.service(),

    user: _ember['default'].computed.alias('auth.credentials.email'),
    isAuthenticated: _ember['default'].computed.alias('auth.isAuthenticated'),
    docs: _ember['default'].inject.service(),

    actions: {
      deleteDocs: function deleteDocs() {
        console.log('in delete docs component');
        // this.get('docs').getDocs()
      }
    }
  });
});
define('capstone_front_end/components/my-documents/docs', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({});
});
define('capstone_front_end/components/my-map', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({});
});
define('capstone_front_end/components/navbar-header', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    tagName: 'div',
    classNames: ['navbar-header']
  });
});
define('capstone_front_end/components/new-document', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    auth: _ember['default'].inject.service(),

    user: _ember['default'].computed.alias('auth.credentials.email'),
    isAuthenticated: _ember['default'].computed.alias('auth.isAuthenticated'),
    docs: _ember['default'].inject.service(),

    actions: {
      newDoc: function newDoc() {
        console.log('inside component');
        this.sendAction('newDoc');
        this.get('docs').newDoc();
      }
    }
  });
});
define('capstone_front_end/components/password-confirmation-input', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    tagName: 'div',
    classNames: ['form-group']
  });
});
define('capstone_front_end/components/password-input', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    tagName: 'div',
    classNames: ['form-group']
  });
});
define('capstone_front_end/components/sign-in-form', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    tagName: 'form',
    classNames: ['form-horizontal'],

    actions: {
      submit: function submit() {
        this.sendAction('submit', this.get('credentials'));
      },

      reset: function reset() {
        this.set('credentials', {});
      }
    }
  });
});
define('capstone_front_end/components/sign-up-form', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    tagName: 'form',
    classNames: ['form-horizontal'],

    credentials: {},

    actions: {
      submit: function submit() {
        this.sendAction('submit', this.get('credentials'));
      },
      reset: function reset() {
        this.set('credentials', {});
      }
    }
  });
});
define('capstone_front_end/components/text-editor', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    classNames: ['text-editor'],

    _options: {
      skin_url: '/tinymce/skins/lightgray',
      theme_url: '/tinymce/themes/modern/theme.min.js',
      external_plugins: {
        image: '/tinymce/plugins/image/plugin.min.js',
        link: '/tinymce/plugins/link/plugin.min.js',
        table: '/tinymce/plugins/table/plugin.min.js'
      },
      menubar: false,
      toolbar1: 'bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link table image'
    },

    didInsertElement: (function () {
      var component = this;
      var options = this.get('_options');

      _ember['default'].merge(options, {
        setup: function setup(editor) {
          // bind change event
          editor.on('change', function () {
            component.set('value', editor.getContent());
          });
        }
      });

      this.$('textarea').tinymce(options);
    }).on('didInsertElement')
  });
});
// app/components/text-editor.js
define('capstone_front_end/components/tinymce-editor', ['exports', 'ember-cli-tinymce/components/tinymce-editor'], function (exports, _emberCliTinymceComponentsTinymceEditor) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliTinymceComponentsTinymceEditor['default'];
    }
  });
});
define('capstone_front_end/controllers/array', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller;
});
define('capstone_front_end/controllers/docs', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    actions: {
      toggle: function toggle(id) {
        console.log('inside docs route');
        console.log(id);
        $('#' + id).show();
      }
    }
  });
});
define('capstone_front_end/controllers/object', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller;
});
define('capstone_front_end/flash/object', ['exports', 'ember-cli-flash/flash/object'], function (exports, _emberCliFlashFlashObject) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliFlashFlashObject['default'];
    }
  });
});
define('capstone_front_end/helpers/app-version', ['exports', 'ember', 'capstone_front_end/config/environment', 'ember-cli-app-version/utils/regexp'], function (exports, _ember, _capstone_front_endConfigEnvironment, _emberCliAppVersionUtilsRegexp) {
  exports.appVersion = appVersion;
  var version = _capstone_front_endConfigEnvironment['default'].APP.version;

  function appVersion(_) {
    var hash = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    if (hash.hideSha) {
      return version.match(_emberCliAppVersionUtilsRegexp.versionRegExp)[0];
    }

    if (hash.hideVersion) {
      return version.match(_emberCliAppVersionUtilsRegexp.shaRegExp)[0];
    }

    return version;
  }

  exports['default'] = _ember['default'].Helper.helper(appVersion);
});
define('capstone_front_end/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _emberInflectorLibHelpersPluralize) {
  exports['default'] = _emberInflectorLibHelpersPluralize['default'];
});
define('capstone_front_end/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _emberInflectorLibHelpersSingularize) {
  exports['default'] = _emberInflectorLibHelpersSingularize['default'];
});
define("capstone_front_end/initializers/active-model-adapter", ["exports", "active-model-adapter", "active-model-adapter/active-model-serializer"], function (exports, _activeModelAdapter, _activeModelAdapterActiveModelSerializer) {
  exports["default"] = {
    name: 'active-model-adapter',
    initialize: function initialize() {
      var application = arguments[1] || arguments[0];
      application.register('adapter:-active-model', _activeModelAdapter["default"]);
      application.register('serializer:-active-model', _activeModelAdapterActiveModelSerializer["default"]);
    }
  };
});
define('capstone_front_end/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'capstone_front_end/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _capstone_front_endConfigEnvironment) {
  var _config$APP = _capstone_front_endConfigEnvironment['default'].APP;
  var name = _config$APP.name;
  var version = _config$APP.version;
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(name, version)
  };
});
define('capstone_front_end/initializers/container-debug-adapter', ['exports', 'ember-resolver/container-debug-adapter'], function (exports, _emberResolverContainerDebugAdapter) {
  exports['default'] = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _emberResolverContainerDebugAdapter['default']);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('capstone_front_end/initializers/data-adapter', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `data-adapter` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'data-adapter',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('capstone_front_end/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data/index'], function (exports, _emberDataSetupContainer, _emberDataIndex) {

  /*
  
    This code initializes Ember-Data onto an Ember application.
  
    If an Ember.js developer defines a subclass of DS.Store on their application,
    as `App.StoreService` (or via a module system that resolves to `service:store`)
    this code will automatically instantiate it and make it available on the
    router.
  
    Additionally, after an application's controllers have been injected, they will
    each have the store made available to them.
  
    For example, imagine an Ember.js application with the following classes:
  
    App.StoreService = DS.Store.extend({
      adapter: 'custom'
    });
  
    App.PostsController = Ember.Controller.extend({
      // ...
    });
  
    When the application is initialized, `App.ApplicationStore` will automatically be
    instantiated, and the instance of `App.PostsController` will have its `store`
    property set to that instance.
  
    Note that this code will only be run if the `ember-application` package is
    loaded. If Ember Data is being used in an environment other than a
    typical application (e.g., node.js where only `ember-runtime` is available),
    this code will be ignored.
  */

  exports['default'] = {
    name: 'ember-data',
    initialize: _emberDataSetupContainer['default']
  };
});
define('capstone_front_end/initializers/ember-simple-auth', ['exports', 'capstone_front_end/config/environment', 'ember-simple-auth/configuration', 'ember-simple-auth/initializers/setup-session', 'ember-simple-auth/initializers/setup-session-service'], function (exports, _capstone_front_endConfigEnvironment, _emberSimpleAuthConfiguration, _emberSimpleAuthInitializersSetupSession, _emberSimpleAuthInitializersSetupSessionService) {
  exports['default'] = {
    name: 'ember-simple-auth',

    initialize: function initialize(registry) {
      var config = _capstone_front_endConfigEnvironment['default']['ember-simple-auth'] || {};
      config.baseURL = _capstone_front_endConfigEnvironment['default'].rootURL || _capstone_front_endConfigEnvironment['default'].baseURL;
      _emberSimpleAuthConfiguration['default'].load(config);

      (0, _emberSimpleAuthInitializersSetupSession['default'])(registry);
      (0, _emberSimpleAuthInitializersSetupSessionService['default'])(registry);
    }
  };
});
define('capstone_front_end/initializers/export-application-global', ['exports', 'ember', 'capstone_front_end/config/environment'], function (exports, _ember, _capstone_front_endConfigEnvironment) {
  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_capstone_front_endConfigEnvironment['default'].exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _capstone_front_endConfigEnvironment['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = _ember['default'].String.classify(_capstone_front_endConfigEnvironment['default'].modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('capstone_front_end/initializers/flash-messages', ['exports', 'ember', 'capstone_front_end/config/environment'], function (exports, _ember, _capstone_front_endConfigEnvironment) {
  exports.initialize = initialize;
  var deprecate = _ember['default'].deprecate;

  var merge = _ember['default'].assign || _ember['default'].merge;
  var INJECTION_FACTORIES_DEPRECATION_MESSAGE = '[ember-cli-flash] Future versions of ember-cli-flash will no longer inject the service automatically. Instead, you should explicitly inject it into your Route, Controller or Component with `Ember.inject.service`.';
  var addonDefaults = {
    timeout: 3000,
    extendedTimeout: 0,
    priority: 100,
    sticky: false,
    showProgress: false,
    type: 'info',
    types: ['success', 'info', 'warning', 'danger', 'alert', 'secondary'],
    injectionFactories: ['route', 'controller', 'view', 'component'],
    preventDuplicates: false
  };

  function initialize() {
    var application = arguments[1] || arguments[0];

    var _ref = _capstone_front_endConfigEnvironment['default'] || {};

    var flashMessageDefaults = _ref.flashMessageDefaults;

    var _ref2 = flashMessageDefaults || [];

    var injectionFactories = _ref2.injectionFactories;

    var options = merge(addonDefaults, flashMessageDefaults);
    var shouldShowDeprecation = !(injectionFactories && injectionFactories.length);

    application.register('config:flash-messages', options, { instantiate: false });
    application.inject('service:flash-messages', 'flashMessageDefaults', 'config:flash-messages');

    deprecate(INJECTION_FACTORIES_DEPRECATION_MESSAGE, shouldShowDeprecation, {
      id: 'ember-cli-flash.deprecate-injection-factories',
      until: '2.0.0'
    });

    options.injectionFactories.forEach(function (factory) {
      application.inject(factory, 'flashMessages', 'service:flash-messages');
    });
  }

  exports['default'] = {
    name: 'flash-messages',
    initialize: initialize
  };
});
define('capstone_front_end/initializers/injectStore', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `injectStore` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'injectStore',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('capstone_front_end/initializers/local-storage-adapter', ['exports', 'ember-local-storage/initializers/local-storage-adapter'], function (exports, _emberLocalStorageInitializersLocalStorageAdapter) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberLocalStorageInitializersLocalStorageAdapter['default'];
    }
  });
  Object.defineProperty(exports, 'initialize', {
    enumerable: true,
    get: function get() {
      return _emberLocalStorageInitializersLocalStorageAdapter.initialize;
    }
  });
});
define('capstone_front_end/initializers/simple-auth-token', ['exports', 'ember-simple-auth-token/authenticators/token', 'ember-simple-auth-token/authenticators/jwt', 'ember-simple-auth-token/authorizers/token', 'ember-simple-auth-token/configuration', 'capstone_front_end/config/environment'], function (exports, _emberSimpleAuthTokenAuthenticatorsToken, _emberSimpleAuthTokenAuthenticatorsJwt, _emberSimpleAuthTokenAuthorizersToken, _emberSimpleAuthTokenConfiguration, _capstone_front_endConfigEnvironment) {

  /**
    Ember Simple Auth Token's Initializer.
    By default load both the Token and JWT (with refresh) Authenticators.
  */
  exports['default'] = {
    name: 'ember-simple-auth-token',
    before: 'ember-simple-auth',
    initialize: function initialize(container) {
      _emberSimpleAuthTokenConfiguration['default'].load(container, _capstone_front_endConfigEnvironment['default']['ember-simple-auth-token'] || {});
      container.register('authorizer:token', _emberSimpleAuthTokenAuthorizersToken['default']);
      container.register('authenticator:token', _emberSimpleAuthTokenAuthenticatorsToken['default']);
      container.register('authenticator:jwt', _emberSimpleAuthTokenAuthenticatorsJwt['default']);
    }
  };
});
define('capstone_front_end/initializers/store', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `store` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'store',
    after: 'ember-data',
    initialize: function initialize() {}
  };
});
define('capstone_front_end/initializers/text-field', ['exports', 'ember'], function (exports, _ember) {
  exports.initialize = initialize;

  function initialize() {
    _ember['default'].TextField.reopen({
      classNames: ['form-control']
    });
  }

  exports['default'] = {
    name: 'text-field',
    initialize: initialize
  };
});
define('capstone_front_end/initializers/transforms', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `transforms` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'transforms',
    before: 'store',
    initialize: function initialize() {}
  };
});
define("capstone_front_end/instance-initializers/ember-data", ["exports", "ember-data/-private/instance-initializers/initialize-store-service"], function (exports, _emberDataPrivateInstanceInitializersInitializeStoreService) {
  exports["default"] = {
    name: "ember-data",
    initialize: _emberDataPrivateInstanceInitializersInitializeStoreService["default"]
  };
});
define('capstone_front_end/instance-initializers/ember-simple-auth', ['exports', 'ember-simple-auth/instance-initializers/setup-session-restoration'], function (exports, _emberSimpleAuthInstanceInitializersSetupSessionRestoration) {
  exports['default'] = {
    name: 'ember-simple-auth',

    initialize: function initialize(instance) {
      (0, _emberSimpleAuthInstanceInitializersSetupSessionRestoration['default'])(instance);
    }
  };
});
define('capstone_front_end/models/doc', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].Model.extend({
    text: _emberData['default'].attr('string'),
    title: _emberData['default'].attr('string'),
    _id: _emberData['default'].attr('string')
  });
});
define('capstone_front_end/models/document', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].Model.extend({
    text: _emberData['default'].attr('string')
  });
});
define('capstone_front_end/models/user', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].Model.extend({
    email: _emberData['default'].attr('string')
  });
});
define('capstone_front_end/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  exports['default'] = _emberResolver['default'];
});
define('capstone_front_end/router', ['exports', 'ember', 'capstone_front_end/config/environment'], function (exports, _ember, _capstone_front_endConfigEnvironment) {

  var Router = _ember['default'].Router.extend({
    location: _capstone_front_endConfigEnvironment['default'].locationType
  });

  Router.map(function () {
    this.route('sign-up');
    this.route('sign-in');
    this.route('change-password');
    this.route('users');
    this.route('testResource');
    this.route('new-document');
    this.route('my-documents');
    this.route('test-docs');
    this.route('documents');
    this.route('docs');
    this.route('doc', { path: '/docs/:doc_id' });
    this.route('edit-doc');
  });

  exports['default'] = Router;
});
define('capstone_front_end/routes/application', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    auth: _ember['default'].inject.service(),
    flashMessages: _ember['default'].inject.service(),

    actions: {
      signOut: function signOut() {
        var _this = this;

        this.get('auth').signOut().then(function () {
          return _this.get('store').unloadAll();
        }).then(function () {
          return _this.transitionTo('sign-in');
        }).then(function () {
          _this.get('flashMessages').warning('You have been signed out.');
        })['catch'](function () {
          _this.get('flashMessages').danger('There was a problem. Are you sure you\'re signed-in?');
        });
      },

      error: function error(reason) {
        var unauthorized = reason.errors && reason.errors.some(function (error) {
          return error.status === '401';
        });

        if (unauthorized) {
          this.get('flashMessages').danger('You must be authenticated to access this page.');
          this.transitionTo('/sign-in');
        } else {
          this.get('flashMessages').danger('There was a problem. Please try again.');
        }

        return false;
      },

      newDoc: function newDoc() {
        var _this2 = this;

        console.log('inside route');
        this.get('docs').newDoc().then(function () {
          return _this2.transitionTo('new-document');
        }).then(function () {
          return _this2.get('flashMessages').warning('New Document Created');
        });
      }
    }
  });
});
define('capstone_front_end/routes/change-password', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    auth: _ember['default'].inject.service(),
    flashMessages: _ember['default'].inject.service(),

    actions: {
      changePassword: function changePassword(passwords) {
        var _this = this;

        this.get('auth').changePassword(passwords).then(function () {
          return _this.get('auth').signOut();
        }).then(function () {
          return _this.transitionTo('sign-in');
        }).then(function () {
          _this.get('flashMessages').success('Successfully changed your password!');
        }).then(function () {
          _this.get('flashMessages').warning('You have been signed out.');
        })['catch'](function () {
          _this.get('flashMessages').danger('There was a problem. Please try again.');
        });
      }
    }
  });
});
define('capstone_front_end/routes/doc', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
});
define('capstone_front_end/routes/docs', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    model: function model() {
      return this.get('store').findAll('doc');
    },
    activate: function activate() {
      console.log('activated');
    },

    actions: {
      deleteDocs: function deleteDocs(item) {
        console.log('inside delete route');
        console.log(item);
        item.destroyRecord();
        this.get('flashMessages').success('Document Deleted');
      },
      edit: function edit(title, text) {
        console.log('inside edit route');
        console.log(title);
        console.log(text);
        console.log('still in docs route');
      },
      mouseUp: function mouseUp() {
        console.log('in mouse up');
        window.mySelection = $('textarea').val().substring(this.selectionStart, this.selectionEnd);
        console.log(window.getSelection().toString());
      }
    }
  });
});
define('capstone_front_end/routes/documents', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    model: function model() {
      return this.get('store').findAll('document');
    }
  });
});
define('capstone_front_end/routes/edit-doc', ['exports', 'ember', 'ember-local-storage', 'capstone_front_end/storages/auth', 'capstone_front_end/storages/docs'], function (exports, _ember, _emberLocalStorage, _capstone_front_endStoragesAuth, _capstone_front_endStoragesDocs) {
  exports['default'] = _ember['default'].Route.extend({
    docs: (0, _emberLocalStorage.storageFor)('docs'),

    activate: function activate(params) {
      console.log('inside edit route');
      console.log(this.get('docs.currentDoc.title'));
      var ourDoc = this.get('docs.currentDoc');
      var docTitle = this.get('docs.currentDoc.title');
      var docText = this.get('docs.currentDoc.text');
    }
  });
});
define('capstone_front_end/routes/login', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    session: _ember['default'].inject.service(),

    actions: {
      authenticate: function authenticate() {
        var credentials = this.get('identification', 'password');
        authenticator = 'authenticator:tokent';

        this.get('session').authenticate(authenticator);
      }
    }
  });
});
define('capstone_front_end/routes/my-documents', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    model: function model() {
      return this.get('docs').findAll('myDocs');
    }
  });
});
define('capstone_front_end/routes/new-document', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    actions: {
      newDoc: function newDoc() {
        this.get('flashMessages').success('Document Created');
      }
    }
  });
});
define('capstone_front_end/routes/sign-in', ['exports', 'ember', 'rsvp'], function (exports, _ember, _rsvp) {
  exports['default'] = _ember['default'].Route.extend({
    auth: _ember['default'].inject.service(),
    flashMessages: _ember['default'].inject.service(),

    model: function model() {
      return _rsvp['default'].Promise.resolve({});
    },

    actions: {
      signIn: function signIn(credentials) {
        var _this = this;

        return this.get('auth').signIn(credentials).then(function () {
          return _this.transitionTo('application');
        }).then(function () {
          return _this.get('flashMessages').success('Thanks for signing in!');
        })['catch'](function () {
          _this.get('flashMessages').danger('There was a problem. Please try again.');
        });
      }
    }
  });
});
define('capstone_front_end/routes/sign-up', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    auth: _ember['default'].inject.service(),
    flashMessages: _ember['default'].inject.service(),

    actions: {
      signUp: function signUp(credentials) {
        var _this = this;

        this.get('auth').signUp(credentials).then(function () {
          return _this.get('auth').signIn(credentials);
        }).then(function () {
          return _this.transitionTo('application');
        }).then(function () {
          _this.get('flashMessages').success('Successfully signed-up! You have also been signed-in.');
        })['catch'](function () {
          _this.get('flashMessages').danger('There was a problem. Please try again.');
        });
      }
    }
  });
});
define('capstone_front_end/routes/test-docs', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    model: function model() {
      return this.get('docs').findAll('myDocs');
    }
  });
});
define('capstone_front_end/routes/test-resource', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    auth: _ember['default'].inject.service(),
    tester: _ember['default'].inject.service(),
    actions: {
      getTests: function getTests() {
        console.log('testing');
        this.get('tester').getTests().then(function (tests) {
          return $('.tests').text(tests.tests[0].totalPrice);
        });
        //$('.tests').text(tests.totalPrice))
      }
    }
  });
});
define('capstone_front_end/routes/users', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    model: function model() {
      return this.get('store').findAll('user');
    }
  });
});
define('capstone_front_end/serializers/application', ['exports', 'active-model-adapter'], function (exports, _activeModelAdapter) {
  exports['default'] = _activeModelAdapter.ActiveModelSerializer.extend({});
});
define('capstone_front_end/serializers/doc', ['exports', 'capstone_front_end/serializers/application'], function (exports, _capstone_front_endSerializersApplication) {
  exports['default'] = _capstone_front_endSerializersApplication['default'].extend({
    primaryKey: '_id'
  });
});
define('capstone_front_end/services/ajax', ['exports', 'ember', 'ember-ajax/services/ajax', 'capstone_front_end/storages/auth', 'capstone_front_end/config/environment'], function (exports, _ember, _emberAjaxServicesAjax, _capstone_front_endStoragesAuth, _capstone_front_endConfigEnvironment) {
  exports['default'] = _emberAjaxServicesAjax['default'].extend({
    host: _capstone_front_endConfigEnvironment['default'].apiHost,

    auth: _ember['default'].inject.service(),
    headers: _ember['default'].computed('auth.credentials.token', {
      get: function get() {
        var headers = {};
        var token = this.get('auth.credentials.token');
        _capstone_front_endStoragesAuth['default'].token = token;
        if (token) {
          headers.Authorization = 'Token token=' + token;
        }

        return headers;
      }
    })
  });
});
define('capstone_front_end/services/auth', ['exports', 'ember', 'ember-local-storage'], function (exports, _ember, _emberLocalStorage) {
  exports['default'] = _ember['default'].Service.extend({
    ajax: _ember['default'].inject.service(),
    credentials: (0, _emberLocalStorage.storageFor)('auth'),
    isAuthenticated: _ember['default'].computed.bool('credentials.token'),

    signUp: function signUp(credentials) {
      return this.get('ajax').post('/sign-up', {
        data: {
          credentials: {
            email: credentials.email,
            password: credentials.password,
            password_confirmation: credentials.passwordConfirmation
          }
        }
      });
    },

    signIn: function signIn(credentials) {
      var _this = this;

      return this.get('ajax').post('/sign-in', {
        data: {
          credentials: {
            email: credentials.email,
            password: credentials.password
          }
        }
      }).then(function (result) {
        _this.get('credentials').set('id', result.user.id);
        _this.get('credentials').set('email', result.user.email);
        _this.get('credentials').set('token', result.user.token);
      });
    },

    changePassword: function changePassword(passwords) {
      return this.get('ajax').patch('/change-password/' + this.get('credentials.id'), {
        data: {
          passwords: {
            old: passwords.previous,
            'new': passwords.next
          }
        }
      });
    },

    signOut: function signOut() {
      var _this2 = this;

      return this.get('ajax').del('/sign-out/' + this.get('credentials.id'))['finally'](function () {
        return _this2.get('credentials').reset();
      });
    }
  });
});
define('capstone_front_end/services/cookies', ['exports', 'ember-cookies/services/cookies'], function (exports, _emberCookiesServicesCookies) {
  exports['default'] = _emberCookiesServicesCookies['default'];
});
define('capstone_front_end/services/docs', ['exports', 'ember', 'ember-local-storage', 'capstone_front_end/storages/auth', 'capstone_front_end/storages/docs'], function (exports, _ember, _emberLocalStorage, _capstone_front_endStoragesAuth, _capstone_front_endStoragesDocs) {
  exports['default'] = _ember['default'].Service.extend({
    ajax: _ember['default'].inject.service(),
    credentials: (0, _emberLocalStorage.storageFor)('auth'),
    isAuthenticated: _ember['default'].computed.bool('credentials.token'),
    docs: (0, _emberLocalStorage.storageFor)('docs'),

    newDoc: function newDoc() {
      var _this = this;

      console.log('inside service');
      console.log(this.get('credentials.id'));

      var id = this.get('credentials.id');
      return this.get('ajax').post('/docs', {
        data: {
          doc: {
            text: '',
            _owner: id
          }
        }
      }).then(console.log('created')).then(function (result) {
        console.log(result);
        _this.get('docs').set('thisDocID', result.doc._id);
      }).then(function () {
        console.log(_this.get('docs.thisDocID'));
      }).then(function () {
        $('#createSuccess').modal('show');
      });
    },

    saveDoc: function saveDoc(input, title) {
      console.log('inside service');
      var id = this.get('credentials.id');
      $('#saveSuccess').modal('show');
      return this.get('ajax').patch('/docs/' + this.get('docs.thisDocID'), {
        data: {
          doc: {
            text: input,
            title: title,
            _owner: id
          }
        }
      });
    },

    deleteDoc: function deleteDoc(id) {
      return this.get('ajax').request('/docs/' + id, {
        method: 'DELETE'
      }).then(function () {
        console.log('doc destroyed');
      }).then(function () {
        docsRoute.model();
      });
    },

    getDocs: function getDocs() {
      var _this2 = this;

      var id = this.get('credentials.id');
      return this.get('ajax').request('/docs', {
        method: 'GET'
      }).then(function (result) {
        _this2.get('docs').set('myDocs', result);
      }).then(function () {
        console.log(_this2.get('docs.myDocs'));
      });
    }
  });
});
define('capstone_front_end/services/flash-messages', ['exports', 'ember-cli-flash/services/flash-messages'], function (exports, _emberCliFlashServicesFlashMessages) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliFlashServicesFlashMessages['default'];
    }
  });
});
define('capstone_front_end/services/session', ['exports', 'ember-simple-auth/services/session'], function (exports, _emberSimpleAuthServicesSession) {
  exports['default'] = _emberSimpleAuthServicesSession['default'];
});
define('capstone_front_end/services/tester', ['exports', 'ember', 'ember-local-storage'], function (exports, _ember, _emberLocalStorage) {
  exports['default'] = _ember['default'].Service.extend({
    ajax: _ember['default'].inject.service(),
    credentials: (0, _emberLocalStorage.storageFor)('auth'),

    getTests: function getTests() {
      console.log('in tester');
      return this.get('ajax').request('/tests', {
        method: 'GET'
      });
    }
  });
});
define('capstone_front_end/session-stores/application', ['exports', 'ember-simple-auth/session-stores/adaptive'], function (exports, _emberSimpleAuthSessionStoresAdaptive) {
  exports['default'] = _emberSimpleAuthSessionStoresAdaptive['default'].extend();
});
define('capstone_front_end/storages/auth', ['exports', 'ember-local-storage/local/object'], function (exports, _emberLocalStorageLocalObject) {
  exports['default'] = _emberLocalStorageLocalObject['default'].extend({});
});
define('capstone_front_end/storages/docs', ['exports', 'ember-local-storage/local/object'], function (exports, _emberLocalStorageLocalObject) {

  var Docs = _emberLocalStorageLocalObject['default'].extend();

  // Uncomment if you would like to set initialState
  // Storage.reopenClass({
  //   initialState() {
  //     return {};
  //   }
  // });

  exports['default'] = Docs;
});
define("capstone_front_end/templates/application", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "zCRvhI9f", "block": "{\"statements\":[[\"append\",[\"helper\",[\"my-application\"],null,[[\"signOut\"],[\"signOut\"]]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "capstone_front_end/templates/application.hbs" } });
});
define("capstone_front_end/templates/change-password", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "cHLQ9TrW", "block": "{\"statements\":[[\"open-element\",\"h2\",[]],[\"flush-element\"],[\"text\",\"Change Password\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"append\",[\"helper\",[\"change-password-form\"],null,[[\"submit\"],[\"changePassword\"]]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "capstone_front_end/templates/change-password.hbs" } });
});
define("capstone_front_end/templates/components/add-doc", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "Y4vyJsOT", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"textAreaBoundary\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"textarea\"],[[\"get\",[\"action\"]],\"mouseUp\"],[[\"id\",\"rows\",\"cols\",\"class\"],[\"doc\",\"15\",\"80\",\"jumbotron\"]]],false],[\"text\",\"\\n\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"button\"],[\"static-attr\",\"data-dismiss\",\"alert\"],[\"static-attr\",\"aria-label\",\"Close\"],[\"static-attr\",\"class\",\"textButton\"],[\"static-attr\",\"style\",\"color: black;\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"saveDoc\"]],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"style\",\"font-size: 3em;\"],[\"flush-element\"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"glyphicon glyphicon-pencil\"],[\"static-attr\",\"aria-hidden\",\"true\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n  Save Document\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"yield\",\"default\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[\"default\"],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "capstone_front_end/templates/components/add-doc.hbs" } });
});
define("capstone_front_end/templates/components/change-password-form", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "sGCLMrwY", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"previous\"],[\"flush-element\"],[\"text\",\"Old Password\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"class\",\"id\",\"placeholder\",\"value\"],[\"password\",\"form-control\",\"previous\",\"Old password\",[\"get\",[\"passwords\",\"previous\"]]]]],false],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"next\"],[\"flush-element\"],[\"text\",\"New Password\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"class\",\"id\",\"placeholder\",\"value\"],[\"password\",\"form-control\",\"next\",\"New password\",[\"get\",[\"passwords\",\"next\"]]]]],false],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"submit\"],[\"static-attr\",\"class\",\"btn btn-primary\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"submit\"]],[\"flush-element\"],[\"text\",\"\\n  Change Password\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"btn btn-default\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"reset\"]],[\"flush-element\"],[\"text\",\"\\n  Cancel\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "capstone_front_end/templates/components/change-password-form.hbs" } });
});
define("capstone_front_end/templates/components/custom-textarea", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "3Y/TucFC", "block": "{\"statements\":[[\"yield\",\"default\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[\"default\"],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "capstone_front_end/templates/components/custom-textarea.hbs" } });
});
define("capstone_front_end/templates/components/delete-docs", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "p5lGDa3L", "block": "{\"statements\":[],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "capstone_front_end/templates/components/delete-docs.hbs" } });
});
define("capstone_front_end/templates/components/edit-doc", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "LGhKNiSr", "block": "{\"statements\":[[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"edit-doc-wrap\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"h1\",[]],[\"static-attr\",\"class\",\"titleHeader\"],[\"flush-element\"],[\"text\",\"Edit title here\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"append\",[\"helper\",[\"input\"],null,[[\"class\",\"type\",\"value\"],[\"editedTitle\",\"text\",[\"get\",[\"newDoc\",\"title\"]]]]],false],[\"text\",\"\\n  \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"textAreaBoundary\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"append\",[\"helper\",[\"textarea\"],[[\"get\",[\"action\"]],\"mouseUp\"],[[\"cols\",\"rows\",\"class\",\"id\",\"value\"],[\"80\",\"15\",\"jumbotron testTextArea\",[\"get\",[\"newDoc\",\"_id\"]],[\"get\",[\"newDoc\",\"text\"]]]]],false],[\"text\",\"\\n\"],[\"text\",\"  \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"button\"],[\"static-attr\",\"data-dismiss\",\"alert\"],[\"static-attr\",\"aria-label\",\"Close\"],[\"static-attr\",\"class\",\"textButton\"],[\"static-attr\",\"style\",\"color: black;\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"saveDoc\"]],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"style\",\"font-size: 3em;\"],[\"flush-element\"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"glyphicon glyphicon-pencil\"],[\"static-attr\",\"aria-hidden\",\"true\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n    Save Document\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\\n  \"],[\"yield\",\"default\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[\"default\"],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "capstone_front_end/templates/components/edit-doc.hbs" } });
});
define("capstone_front_end/templates/components/email-input", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "98Xjr719", "block": "{\"statements\":[[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"identification\"],[\"flush-element\"],[\"text\",\"Email\"],[\"close-element\"],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"id\",\"placeholder\",\"value\"],[\"email\",\"identification\",\"Email\",[\"get\",[\"email\"]]]]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "capstone_front_end/templates/components/email-input.hbs" } });
});
define("capstone_front_end/templates/components/hamburger-menu", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "0ZN+9IIg", "block": "{\"statements\":[[\"text\",\"  \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"sr-only\"],[\"flush-element\"],[\"text\",\"Toggle navigation\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"icon-bar\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"icon-bar\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"icon-bar\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "capstone_front_end/templates/components/hamburger-menu.hbs" } });
});
define("capstone_front_end/templates/components/my-application", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "LcXr5RRl", "block": "{\"statements\":[[\"open-element\",\"nav\",[]],[\"static-attr\",\"class\",\"navbar navbar-default\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"container-fluid\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"append\",[\"unknown\",[\"navbar-header\"]],false],[\"text\",\"\\n\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"collapse navbar-collapse\"],[\"static-attr\",\"id\",\"navigation\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"ul\",[]],[\"static-attr\",\"class\",\"nav navbar-nav navbar-right\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"isAuthenticated\"]]],null,5,3],[\"text\",\"      \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"flashMessages\",\"queue\"]]],null,0],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"popover-container\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"button\"],[\"static-attr\",\"id\",\"popover\"],[\"static-attr\",\"class\",\"btn btn-default\"],[\"static-attr\",\"aria-label\",\"Left Align\"],[\"static-attr\",\"style\",\"color:black;\"],[\"static-attr\",\"data-toggle\",\"popover\"],[\"static-attr\",\"data-trigger\",\"focus\"],[\"static-attr\",\"title\",\"Dismissible popover\"],[\"static-attr\",\"title\",\"Welcome to Writr!\"],[\"static-attr\",\"data-content\",\"This app, Writr, was created by Jonathan Cohen as a capstonen project for the General Assembly WDI program.  Let's start writing!\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"show\"]],[\"flush-element\"],[\"text\",\"\\n\"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"NewDoc\"],[\"static-attr\",\"style\",\"font-size:3em;\"],[\"flush-element\"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"glyphicon glyphicon-off\"],[\"static-attr\",\"aria-hidden\",\"true\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"    \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"textButton\"],[\"flush-element\"],[\"text\",\"About this Site\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-md-8 col-md-offset-2\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"id\",\"saveSuccess\"],[\"static-attr\",\"class\",\"modal fade\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"modal-dialog\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"modal-content\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"alert alert-success\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"h4\",[]],[\"flush-element\"],[\"text\",\"Your document has been saved!\"],[\"close-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"Click here to return\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-md-8 col-md-offset-2\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"id\",\"createSuccess\"],[\"static-attr\",\"class\",\"modal fade\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"modal-dialog\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"modal-content\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"alert alert-success\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"h4\",[]],[\"flush-element\"],[\"text\",\"New Document Created\"],[\"close-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"Click here to return\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\\n  \"],[\"append\",[\"unknown\",[\"new-document\"]],false],[\"text\",\"\\n  \"],[\"append\",[\"unknown\",[\"my-docs\"]],false],[\"text\",\"\\n  \"],[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"  \"],[\"append\",[\"helper\",[\"flash-message\"],null,[[\"flash\"],[[\"get\",[\"flash\"]]]]],false],[\"text\",\"\\n\"]],\"locals\":[\"flash\"]},{\"statements\":[[\"text\",\"Sign In\"]],\"locals\":[]},{\"statements\":[[\"text\",\"Sign Up\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"block\",[\"link-to\"],[\"sign-up\"],null,2],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"block\",[\"link-to\"],[\"sign-in\"],null,1],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"Change Password\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"block\",[\"link-to\"],[\"change-password\"],null,4],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"signOut\"]],[\"flush-element\"],[\"text\",\"Sign Out\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "capstone_front_end/templates/components/my-application.hbs" } });
});
define("capstone_front_end/templates/components/my-docs", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "AdLbA/1Q", "block": "{\"statements\":[[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"button\"],[\"static-attr\",\"class\",\"btn btn-default\"],[\"static-attr\",\"aria-label\",\"Left Align\"],[\"static-attr\",\"style\",\"color:black;\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"block\",[\"link-to\"],[\"docs\"],null,0],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"NewDoc\"],[\"static-attr\",\"style\",\"font-size:3em;\"],[\"flush-element\"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"glyphicon glyphicon-folder-open\"],[\"static-attr\",\"aria-hidden\",\"true\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"    \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"textButton\"],[\"flush-element\"],[\"text\",\"Get Your Documents\"],[\"close-element\"],[\"close-element\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "capstone_front_end/templates/components/my-docs.hbs" } });
});
define("capstone_front_end/templates/components/my-documents/docs", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "52lKwdeR", "block": "{\"statements\":[[\"yield\",\"default\"],[\"text\",\"\\n\"],[\"open-element\",\"ul\",[]],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"document\",\"doc\"]]],null,0],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[\"default\"],\"blocks\":[{\"statements\":[[\"text\",\"  \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"doc\",\"text\"]],false],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"doc\"]}],\"hasPartials\":false}", "meta": { "moduleName": "capstone_front_end/templates/components/my-documents/docs.hbs" } });
});
define("capstone_front_end/templates/components/my-map", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "Vwqp81Y6", "block": "{\"statements\":[[\"yield\",\"default\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[\"default\"],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "capstone_front_end/templates/components/my-map.hbs" } });
});
define("capstone_front_end/templates/components/navbar-header", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "9BNeZjs+", "block": "{\"statements\":[[\"append\",[\"unknown\",[\"hamburger-menu\"]],false],[\"text\",\"\\n\"],[\"block\",[\"link-to\"],[\"application\"],[[\"class\"],[\"navbar-brand\"]],0],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"glyphicon glyphicon-book\"],[\"static-attr\",\"aria-hidden\",\"true\"],[\"static-attr\",\"style\",\"font-size: 1.5em;\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"Home\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "capstone_front_end/templates/components/navbar-header.hbs" } });
});
define("capstone_front_end/templates/components/new-document", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "/SfWEdr8", "block": "{\"statements\":[[\"yield\",\"default\"],[\"text\",\"\\n\"],[\"open-element\",\"p\",[]],[\"static-attr\",\"class\",\"NewDoc\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"button\"],[\"static-attr\",\"class\",\"btn btn-default\"],[\"static-attr\",\"aria-label\",\"Left Align\"],[\"static-attr\",\"style\",\"color:black;\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"newDoc\"]],[\"flush-element\"],[\"text\",\"\\n  \"],[\"block\",[\"link-to\"],[\"new-document\"],null,0],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[\"default\"],\"blocks\":[{\"statements\":[[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"NewDoc\"],[\"static-attr\",\"style\",\"font-size:3em;\"],[\"flush-element\"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"glyphicon glyphicon-plus\"],[\"static-attr\",\"aria-hidden\",\"true\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"    \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"textButton\"],[\"flush-element\"],[\"text\",\"New Document\"],[\"close-element\"],[\"close-element\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "capstone_front_end/templates/components/new-document.hbs" } });
});
define("capstone_front_end/templates/components/password-confirmation-input", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "7vxeF+8A", "block": "{\"statements\":[[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"password-confirmation\"],[\"flush-element\"],[\"text\",\"Password Confirmation\"],[\"close-element\"],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"id\",\"placeholder\",\"value\"],[\"password\",\"password-confirmation\",\"Password Confirmation\",[\"get\",[\"password\"]]]]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "capstone_front_end/templates/components/password-confirmation-input.hbs" } });
});
define("capstone_front_end/templates/components/password-input", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "vo8CSPfq", "block": "{\"statements\":[[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"password\"],[\"flush-element\"],[\"text\",\"Password\"],[\"close-element\"],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"id\",\"placeholder\",\"value\"],[\"password\",\"password\",\"Password\",[\"get\",[\"password\"]]]]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "capstone_front_end/templates/components/password-input.hbs" } });
});
define("capstone_front_end/templates/components/sign-in-form", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "WnE556Ge", "block": "{\"statements\":[[\"append\",[\"helper\",[\"email-input\"],null,[[\"email\"],[[\"get\",[\"credentials\",\"email\"]]]]],false],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"password-input\"],null,[[\"password\"],[[\"get\",[\"credentials\",\"password\"]]]]],false],[\"text\",\"\\n\\n\"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"submit\"],[\"static-attr\",\"class\",\"btn btn-primary\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"submit\"]],[\"flush-element\"],[\"text\",\"\\n  Sign In\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"btn btn-default\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"reset\"]],[\"flush-element\"],[\"text\",\"\\n  Cancel\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "capstone_front_end/templates/components/sign-in-form.hbs" } });
});
define("capstone_front_end/templates/components/sign-up-form", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "eo4Eu81n", "block": "{\"statements\":[[\"append\",[\"helper\",[\"email-input\"],null,[[\"email\"],[[\"get\",[\"credentials\",\"email\"]]]]],false],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"password-input\"],null,[[\"password\"],[[\"get\",[\"credentials\",\"password\"]]]]],false],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"password-confirmation-input\"],null,[[\"password\"],[[\"get\",[\"credentials\",\"passwordConfirmation\"]]]]],false],[\"text\",\"\\n\\n\"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"submit\"],[\"static-attr\",\"class\",\"btn btn-primary\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"submit\"]],[\"flush-element\"],[\"text\",\"\\n  Sign Up\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"btn btn-default\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"reset\"]],[\"flush-element\"],[\"text\",\"\\n  Cancel\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "capstone_front_end/templates/components/sign-up-form.hbs" } });
});
define("capstone_front_end/templates/components/text-editor", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "UC44Asp7", "block": "{\"statements\":[[\"yield\",\"default\"],[\"text\",\"\\n\\n\"],[\"append\",[\"helper\",[\"textarea\"],null,[[\"value\"],[\"test\"]]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[\"default\"],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "capstone_front_end/templates/components/text-editor.hbs" } });
});
define("capstone_front_end/templates/doc", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "MmaM/xh4", "block": "{\"statements\":[[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "capstone_front_end/templates/doc.hbs" } });
});
define("capstone_front_end/templates/docs", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "PO/xJOkg", "block": "{\"statements\":[[\"open-element\",\"h2\",[]],[\"static-attr\",\"class\",\"titleHeader\"],[\"flush-element\"],[\"text\",\"Your Documents\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"block\",[\"each\"],[[\"get\",[\"model\"]]],null,0]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"open-element\",\"h1\",[]],[\"static-attr\",\"class\",\"titleHeader\"],[\"flush-element\"],[\"append\",[\"unknown\",[\"doc\",\"title\"]],false],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"button\"],[\"static-attr\",\"class\",\"btn btn-default\"],[\"static-attr\",\"aria-label\",\"Left Align\"],[\"static-attr\",\"style\",\"color:black;\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"toggle\",[\"get\",[\"doc\",\"_id\"]]]],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"NewDoc\"],[\"static-attr\",\"style\",\"font-size:2em;\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"glyphicon glyphicon-pencil\"],[\"static-attr\",\"aria-hidden\",\"true\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"textButton\"],[\"flush-element\"],[\"text\",\"Edit this doc\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"div\",[]],[\"dynamic-attr\",\"id\",[\"unknown\",[\"doc\",\"_id\"]],null],[\"static-attr\",\"class\",\"toggle\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"edit-doc\"],null,[[\"newDoc\"],[[\"get\",[\"doc\"]]]]],false],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"button\"],[\"static-attr\",\"class\",\"btn btn-default\"],[\"static-attr\",\"aria-label\",\"Left Align\"],[\"static-attr\",\"style\",\"color:black;\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"deleteDocs\",[\"get\",[\"doc\"]]]],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"NewDoc\"],[\"static-attr\",\"style\",\"font-size:2em;\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"glyphicon glyphicon-remove\"],[\"static-attr\",\"aria-hidden\",\"true\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\\n    \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"textButton\"],[\"flush-element\"],[\"text\",\"Delete this document\\n  \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"doc\"]}],\"hasPartials\":false}", "meta": { "moduleName": "capstone_front_end/templates/docs.hbs" } });
});
define("capstone_front_end/templates/documents", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "hb0yOVuQ", "block": "{\"statements\":[[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n\"],[\"open-element\",\"h2\",[]],[\"flush-element\"],[\"text\",\"Documents\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"ul\",[]],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"model\"]]],null,0],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"  \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"document\",\"title\"]],false],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"document\",\"text\"]],false],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"document\"]}],\"hasPartials\":false}", "meta": { "moduleName": "capstone_front_end/templates/documents.hbs" } });
});
define("capstone_front_end/templates/edit-doc", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "f/+MPF97", "block": "{\"statements\":[[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"new-doc-wrap\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"h1\",[]],[\"static-attr\",\"class\",\"titleHeader\"],[\"flush-element\"],[\"text\",\"Edit title here\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"class\",\"editedTitle\"],[\"static-attr\",\"type\",\"text\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"Doc: \"],[\"append\",[\"unknown\",[\"doc\",\"title\"]],false],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"textAreaBoundary\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"append\",[\"helper\",[\"textarea\"],[[\"get\",[\"action\"]],\"mouseUp\"],[[\"cols\",\"rows\",\"class\",\"id\",\"value\"],[\"80\",\"15\",\"jumbotron\",\"doc\",[\"helper\",[\"mut\"],[[\"helper\",[\"get\"],[[\"get\",[\"doc\"]],[\"get\",[\"text\"]]],null]],null]]]],false],[\"text\",\"\\n\"],[\"text\",\"  \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"button\"],[\"static-attr\",\"data-dismiss\",\"alert\"],[\"static-attr\",\"aria-label\",\"Close\"],[\"static-attr\",\"class\",\"textButton\"],[\"static-attr\",\"style\",\"color: black;\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"saveDoc\"]],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"style\",\"font-size: 3em;\"],[\"flush-element\"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"glyphicon glyphicon-pencil\"],[\"static-attr\",\"aria-hidden\",\"true\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n    Save Document\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\\n  \"],[\"yield\",\"default\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[\"default\"],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "capstone_front_end/templates/edit-doc.hbs" } });
});
define("capstone_front_end/templates/login", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "0t8yIWBV", "block": "{\"statements\":[[\"open-element\",\"h2\",[]],[\"flush-element\"],[\"text\",\"Log In\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"append\",[\"helper\",[\"sign-in-form\"],null,[[\"submit\"],[\"signUp\"]]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "capstone_front_end/templates/login.hbs" } });
});
define("capstone_front_end/templates/my-documents", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "Ga+JsKu2", "block": "{\"statements\":[[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n\"],[\"open-element\",\"h2\",[]],[\"flush-element\"],[\"text\",\"Your Documents\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "capstone_front_end/templates/my-documents.hbs" } });
});
define("capstone_front_end/templates/new-document", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "UfdCmyzT", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"new-doc-wrap\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"h1\",[]],[\"static-attr\",\"class\",\"titleHeader\"],[\"flush-element\"],[\"text\",\"Put your title here\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"class\",\"title\"],[\"static-attr\",\"type\",\"text\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"append\",[\"unknown\",[\"add-doc\"]],false],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "capstone_front_end/templates/new-document.hbs" } });
});
define("capstone_front_end/templates/sign-in", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "YKzwXd8R", "block": "{\"statements\":[[\"open-element\",\"h2\",[]],[\"flush-element\"],[\"text\",\"Sign In\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"append\",[\"helper\",[\"sign-in-form\"],null,[[\"submit\",\"reset\",\"credentials\"],[\"signIn\",\"reset\",[\"get\",[\"model\"]]]]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "capstone_front_end/templates/sign-in.hbs" } });
});
define("capstone_front_end/templates/sign-up", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "0XV6pI1L", "block": "{\"statements\":[[\"open-element\",\"h2\",[]],[\"flush-element\"],[\"text\",\"Sign Up\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"append\",[\"helper\",[\"sign-up-form\"],null,[[\"submit\"],[\"signUp\"]]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "capstone_front_end/templates/sign-up.hbs" } });
});
define("capstone_front_end/templates/test-docs", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "hLiZK0eP", "block": "{\"statements\":[[\"open-element\",\"h2\",[]],[\"flush-element\"],[\"text\",\"Documents\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"ul\",[]],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"model\"]]],null,0],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"  \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"user\",\"email\"]],false],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"user\"]}],\"hasPartials\":false}", "meta": { "moduleName": "capstone_front_end/templates/test-docs.hbs" } });
});
define("capstone_front_end/templates/test-resource", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "EQjDTzB3", "block": "{\"statements\":[[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n\"],[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"btn btn-default\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"getTests\"]],[\"flush-element\"],[\"text\",\"\\nGet Tests\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"tests\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "capstone_front_end/templates/test-resource.hbs" } });
});
define("capstone_front_end/templates/users", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "Ygto0eCa", "block": "{\"statements\":[[\"open-element\",\"h2\",[]],[\"flush-element\"],[\"text\",\"Users\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"ul\",[]],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"model\"]]],null,0],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"  \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"user\",\"email\"]],false],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"user\"]}],\"hasPartials\":false}", "meta": { "moduleName": "capstone_front_end/templates/users.hbs" } });
});


define('capstone_front_end/config/environment', ['ember'], function(Ember) {
  var prefix = 'capstone_front_end';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

if (!runningTests) {
  require("capstone_front_end/app")["default"].create({"name":"capstone_front_end","version":"0.0.0+2b3ed9c2"});
}
//# sourceMappingURL=capstone_front_end.map
