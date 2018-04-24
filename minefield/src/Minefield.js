import React, {Component} from 'react'

export default class Minefield extends Component {
  constructor(props) {
    super(props);
    var table = [];
    for(var row = 0; row < this.props.rows; row++) {
      table[row] = [];
      for (var col = 0; col < this.props.cols; col++) {
        table[row][col] = 0;
      }
    }
    this.state = {table: generateMines(table, this.props.rows, this.props.cols, this.props.numMines)};
    this.grid = table.map((row, index) => {
      var list = row.map((item, i) => <Cell key={i + ',' + index} id={i + ',' + index} rows={this.props.rows} cols={this.props.cols} content={table[index][i]} numMines={this.props.numMines}/>);
      return <tr key={index}>{list}</tr>
    });
  }
  render () {
    return <table id="minefield" className="bevel-out" align="center" cellSpacing="0" cellPadding="0" rows={this.props.rows} cols={this.props.cols}><tbody>{this.grid}</tbody></table>;
  }
}

export class Cell extends Component {
  render () {
    return (
      <td>
        <div id={this.props.id} className={this.props.content === 0 ? "tile tile-untouched tile-zero":"tile tile-untouched"} onClick={() => {
          var e = document.getElementById(this.props.id);
          if(e.innerHTML === '0') openNeighbours(e, this.props.rows, this.props.cols);
          else e.classList.remove('tile-untouched');
          if(e.innerHTML === '💣') alert('Game Over');
          else if(document.getElementsByClassName('tile-untouched').length === this.props.numMines) alert('You Win!');
        }}
        >{(this.props.content < 0 ? '💣':this.props.content)}</div>
      </td>
    );
  }
}

var generateMines = function (grid, rows, cols, mine_count) {
  var mine_value = -(mine_count * 2), mine_x, mine_y;

  for (var k = 0; k < mine_count; k++) {
    while (true) {
      mine_x = Math.floor(Math.random() * cols);
      mine_y = Math.floor(Math.random() * rows);

      if (0 <= grid[mine_x][mine_y]) {
        break;
      }
    }
    for (var n = -1; n < 2; n++) {
      for (var m = -1; m < 2; m++) {
        if (0 === n && 0 === m) {
          grid[mine_x][mine_y] = mine_value;
        } else if (_between(mine_x + n, 0, cols - 1) && _between(mine_y + m, 0, rows - 1)) {
          grid[mine_x + n][mine_y + m]++;
        }
      }
    }
  }

  return grid;
}

var _show_neighbour_count = 0;
function openNeighbours(el, rows, cols) {
  el.classList.remove('tile-untouched');
  if (parseInt(el.innerHTML, 10) !== 0) return;

  var pos = el.id;
  var comma = pos.indexOf(',');
  var n = parseInt(pos.substring(0, comma), 10), m = parseInt(pos.substring(comma+1, pos.length), 10);

  var _d = function (e) {
    _show_neighbour_count++;
    return function () {
      openNeighbours(e, rows, cols);
      if (--_show_neighbour_count === 0) console.log('c00l');
    };
  };

  for (var x = -1; x < 2; x++) {
    for (var y = -1; y < 2; y++) {
      if (_between(x + n, 0, cols - 1) && _between(y + m, 0, rows - 1)
        && document.getElementById((x + n) + ',' + (y + m)).classList.contains('tile-untouched')
        && !_isMine(document.getElementById((x + n) + ',' + (y + m)))
      ) {
        setTimeout(_d(document.getElementById((x + n) + ',' + (y + m))), 50);
      }
    }
  }

};

var _between = function (v, a, b) { return (v >= a) && (v <= b); }

var _isMine = (el) => {
  return el.innerHTML === '💣';
};