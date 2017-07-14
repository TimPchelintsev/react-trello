'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Base = require('../styles/Base');

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _reactDnd = require('react-dnd');

var _reactDndMultiBackend = require('react-dnd-multi-backend');

var _reactDndMultiBackend2 = _interopRequireDefault(_reactDndMultiBackend);

var _HTML5toTouch = require('react-dnd-multi-backend/lib/HTML5toTouch');

var _HTML5toTouch2 = _interopRequireDefault(_HTML5toTouch);

var _Lane = require('./Lane');

var _Lane2 = _interopRequireDefault(_Lane);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var boardActions = require('../actions/BoardActions');
var laneActions = require('../actions/LaneActions');

var BoardContainer = function (_Component) {
  _inherits(BoardContainer, _Component);

  function BoardContainer() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, BoardContainer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = BoardContainer.__proto__ || Object.getPrototypeOf(BoardContainer)).call.apply(_ref, [this].concat(args))), _this), _this.wireEventBus = function () {
      var eventBus = {
        publish: function publish(event) {
          switch (event.type) {
            case 'ADD_CARD':
              return _this.props.actions.addCard({ laneId: event.laneId, card: event.card });
            case 'REMOVE_CARD':
              return _this.props.actions.removeCard({ laneId: event.laneId, cardId: event.cardId });
            case 'REFRESH_BOARD':
              return _this.props.actions.loadBoard(event.data);
          }
        }
      };
      _this.props.eventBusHandle(eventBus);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(BoardContainer, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.props.actions.loadBoard(this.props.data);
      if (this.props.eventBusHandle) {
        this.wireEventBus();
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.data) {
        this.props.onDataChange && this.props.onDataChange(nextProps.data);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var data = this.props.data;

      return _react2.default.createElement(
        _Base.BoardDiv,
        null,
        data.lanes.map(function (lane) {
          var id = lane.id,
              otherProps = _objectWithoutProperties(lane, ['id']);

          var _props = _this2.props,
              tagStyle = _props.tagStyle,
              draggable = _props.draggable,
              handleDragStart = _props.handleDragStart,
              handleDragEnd = _props.handleDragEnd,
              onCardClick = _props.onCardClick,
              onLaneScroll = _props.onLaneScroll,
              laneSortFunction = _props.laneSortFunction,
              customCardLayout = _props.customCardLayout,
              cardStyle = _props.cardStyle,
              children = _props.children;

          return _react2.default.createElement(_Lane2.default, _extends({ key: '' + id,
            id: id
          }, otherProps, { tagStyle: tagStyle, draggable: draggable, handleDragStart: handleDragStart, handleDragEnd: handleDragEnd, onCardClick: onCardClick, onLaneScroll: onLaneScroll, laneSortFunction: laneSortFunction, customCardLayout: customCardLayout, cardStyle: cardStyle, children: children }));
        })
      );
    }
  }]);

  return BoardContainer;
}(_react.Component);

BoardContainer.propTypes = {
  data: _react.PropTypes.object.isRequired,
  onLaneScroll: _react.PropTypes.func,
  onCardClick: _react.PropTypes.func,
  eventBusHandle: _react.PropTypes.func,
  laneSortFunction: _react.PropTypes.func,
  draggable: _react.PropTypes.bool,
  handleDragStart: _react.PropTypes.func,
  handleDragEnd: _react.PropTypes.func,
  onDataChange: _react.PropTypes.func,
  customCardLayout: _react.PropTypes.bool
};

var mapStateToProps = function mapStateToProps(state) {
  return state.lanes ? { data: state } : {};
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return { actions: (0, _redux.bindActionCreators)(_extends({}, boardActions, laneActions), dispatch) };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)((0, _reactDnd.DragDropContext)((0, _reactDndMultiBackend2.default)(_HTML5toTouch2.default))(BoardContainer));