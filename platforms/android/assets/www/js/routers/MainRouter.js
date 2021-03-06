define(['backbone', '../views/GameView', '../models/game', '../views/HomeView', '../views/LoginView', '../views/JoinView', '../models/map'], function(Backbone, GameView, Game, HomeView, LoginView, JoinView, Map){
  var Router = Backbone.Router.extend({
    initialize: function(options){
      this.app = options.app;
    },

    routes: {
      '': 'login',
      'home': 'home',
      'leaderboard': 'leaderboard',
      'join': 'join',
      'game': 'game',
      'inventory': 'inventory'
    },

    login: function(){
      new LoginView();
    },

    home: function(){
      if($('#home').length === 0){
        new HomeView();
      } else {
        this.slidePageFrom($('#leaderboard'), $('#home'), 'left');
      }
    },

    join: function(){
      this.app.set('game', new Game({currentPlayer: this.app.get('user'), socket: this.app.socket}));
      new JoinView({model: this.app.get('game'), user: this.app.get('user')});
    },

    leaderboard: function(){
      this.slidePageFrom($('#home'), $('#leaderboard'), 'right');
    },

    game: function(){
      if($('#game').length === 0){
        var game = this.app.get('game');
        new GameView({model: game, socket: game.socket});
        var that = this;
        // Display loading window while map is calibrating
        setTimeout(function(){that.slidePageFrom($('#loadingView'), $('#game'), 'right');}, 4000);
      } else {
        this.slidePageFrom($('#inventory'), $('#game'), 'left');
      }
    },

    inventory: function(){
      this.slidePageFrom($('#game'), $('#inventory'), 'right');
    },

    slidePageFrom: function(start, end, slideDirection) {
      end.removeClass().addClass('page transition center');
      var startClass = (slideDirection === 'left') ? 'right' : 'left';
      start.removeClass().addClass('page transition ' + startClass);
    }
  });
  return Router;
});
