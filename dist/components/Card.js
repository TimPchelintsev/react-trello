'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Base = require('../styles/Base');

var _DragType = require('../helpers/DragType');

var _reactDnd = require('react-dnd');

var _reactDom = require('react-dom');

var _Tag = require('./Tag');

var _Tag2 = _interopRequireDefault(_Tag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var flow = require('lodash.flow');

var Card = function (_Component) {
  _inherits(Card, _Component);

  function Card() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Card);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Card.__proto__ || Object.getPrototypeOf(Card)).call.apply(_ref, [this].concat(args))), _this), _this.renderBody = function () {
      if (_this.props.customCardLayout) {
        var customCardWithProps = _react2.default.cloneElement(_this.props.customCard, _extends({}, _this.props));
        return _react2.default.createElement(
          'span',
          null,
          customCardWithProps
        );
      } else {
        var _this$props = _this.props,
            title = _this$props.title,
            description = _this$props.description,
            label = _this$props.label,
            tags = _this$props.tags;

        return _react2.default.createElement(
          'span',
          null,
          _react2.default.createElement(
            _Base.CardHeader,
            null,
            _react2.default.createElement(
              _Base.CardTitle,
              null,
              title
            ),
            _react2.default.createElement(
              _Base.CardRightContent,
              null,
              label
            )
          ),
          _react2.default.createElement(
            _Base.Detail,
            null,
            description
          ),
          tags && _react2.default.createElement(
            _Base.Footer,
            null,
            tags.map(function (tag) {
              return _react2.default.createElement(_Tag2.default, _extends({ key: tag.title }, tag, { tagStyle: _this.props.tagStyle }));
            })
          )
        );
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Card, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          id = _props.id,
          connectDragSource = _props.connectDragSource,
          connectDropTarget = _props.connectDropTarget,
          isDragging = _props.isDragging,
          cardStyle = _props.cardStyle,
          otherProps = _objectWithoutProperties(_props, ['id', 'connectDragSource', 'connectDropTarget', 'isDragging', 'cardStyle']);

      var opacity = isDragging ? 0 : 1;
      var background = isDragging ? '#CCC' : '#E3E3E3';
      return connectDragSource(connectDropTarget(_react2.default.createElement(
        'div',
        { style: { background: background } },
        _react2.default.createElement(
          _Base.CardWrapper,
          _extends({ key: id, 'data-id': id }, otherProps, { style: _extends({}, cardStyle, { opacity: opacity }) }),
          this.renderBody()
        )
      )));
    }
  }]);

  return Card;
}(_react.Component);

var cardSource = {
  canDrag: function canDrag(props) {
    return props.draggable;
  },
  beginDrag: function beginDrag(props) {
    props.handleDragStart(props.id, props.listId);
    return {
      id: props.id,
      listId: props.listId,
      index: props.index,
      card: props
    };
  },
  endDrag: function endDrag(props, monitor) {
    var item = monitor.getItem();
    var dropResult = monitor.getDropResult();
    if (dropResult && dropResult.listId !== item.listId) {
      props.removeCard(item.listId, item.id);
    }
    props.handleDragEnd(item.id, item.listId, dropResult ? dropResult.listId : item.listId);
  }
};

var cardTarget = {
  hover: function hover(props, monitor, component) {
    var dragIndex = monitor.getItem().index;
    var hoverIndex = props.index;
    var sourceListId = monitor.getItem().listId;

    if (dragIndex === hoverIndex) {
      return;
    }

    // Determine rectangle on screen
    var hoverBoundingRect = (0, _reactDom.findDOMNode)(component).getBoundingClientRect();

    // Get vertical middle
    var hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    var clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    var hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    if (props.listId === sourceListId) {
      props.moveCard(dragIndex, hoverIndex);
      monitor.getItem().index = hoverIndex;
    }
  }
};

Card.defaultProps = {
  cardStyle: {},
  customCardLayout: false
};

Card.propTypes = {
  id: _react.PropTypes.string.isRequired,
  title: _react.PropTypes.string,
  description: _react.PropTypes.string,
  label: _react.PropTypes.string,
  onClick: _react.PropTypes.func,
  metadata: _react.PropTypes.object,
  connectDragSource: _react.PropTypes.func.isRequired,
  isDragging: _react.PropTypes.bool.isRequired,
  handleDragStart: _react2.default.PropTypes.func,
  handleDragEnd: _react2.default.PropTypes.func,
  customCardLayout: _react2.default.PropTypes.bool,
  customCard: _react2.default.PropTypes.node
};

exports.default = flow((0, _reactDnd.DropTarget)(_DragType.DragType.CARD, cardTarget, function (connect) {
  return {
    connectDropTarget: connect.dropTarget()
  };
}), (0, _reactDnd.DragSource)(_DragType.DragType.CARD, cardSource, function (connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}))(Card);