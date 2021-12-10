import React, { Component } from 'react';
import { darkenScale, brightenScale, desaturateScale, saturateScale, colorPalette, PaletteAlgorithm, complimentTextForColor } from '../../utils/color';
import { CopyToClipboard } from '../../utils/copy';
import { toast } from 'react-toastify';

type CalculatorColorProps = {
  color: any;
};

export default class CalculatorColor extends Component<CalculatorColorProps> {
  state: any = {
    activeTab: 'convert'
  };

  tab = (name: string) => {
    this.setState({ activeTab: name });
  };

  isActiveTab = (name: string): boolean => {
    return name === this.state.activeTab;
  };

  copy = (color: string) => {
    return () => {
      CopyToClipboard(color);
      toast(`${color} copied!`, { hideProgressBar: true, type: 'info', style: { backgroundColor: color } });
    };
  };

  renderPalette = (color: any, index: number) => {
    return <div
      key={color.id + index}
      className="colorStrip"
      style={{
        backgroundColor: color.color,
        color: complimentTextForColor(color.color)
      }}
      onClick={this.copy(color.color)}
    ><span>{color.id} - {color.color}</span></div>;
  }

  renderTab = () => {
    const { color } = this.props;
    if (this.state.activeTab === 'convert') {
      return (
        <React.Fragment>
          <h6>Name: {color.result.name()}</h6>
          <h6>HEX value: {color.result.hex()}</h6>
          <h6>HSL value: {color.result.css('hsl')}</h6>
          <h6>Black or White text color: {complimentTextForColor(color.result.hex()) }</h6>
        </React.Fragment>
      );
    }

    if (this.state.activeTab === 'palette') {
      return (
        <React.Fragment>
          <div className="row around">

            <div className="calculator-scale column">
              <h5>Simple palette</h5>
              {
                colorPalette(color.result.hex())
                  .map(this.renderPalette)
              }
            </div>

            <div className="calculator-scale column">
              <h5>Basic palette</h5>
              {
                colorPalette(color.result.hex(), PaletteAlgorithm.BASIC)
                  .map(this.renderPalette)
              }
            </div>

            <div className="calculator-scale column">
              <h5>Buckner palette</h5>
              {
                colorPalette(color.result.hex(), PaletteAlgorithm.BUCKNER)
                  .map(this.renderPalette)
              }
            </div>

          </div>
        </React.Fragment>
      );
    }

    if (this.state.activeTab === 'shade') {
      return (
        <React.Fragment>
          <h5>Light</h5>
          <div className="calculator-scale row center">
            {
              brightenScale(color.result.hex()).map((color, index) => {
                return <div
                  key={index}
                  className="colorBox50"
                  style={{
                    backgroundColor: color,
                    color: complimentTextForColor(color)
                  }}
                  onClick={this.copy(color)}
                >{color}</div>;
              })
            }
            <div className="colorBox100" style={{ backgroundColor: color.result.hex() }} ></div>
            {
              darkenScale(color.result.hex()).map((color, index) => {
                return <div
                  key={index}
                  className="colorBox50"
                  style={{
                    backgroundColor: color,
                    color: complimentTextForColor(color)
                   }}
                  onClick={this.copy(color)}
                >{color}</div>;
              })
            }
          </div>

          <h5>Saturation</h5>
          <div className="calculator-scale row center">
            {
              saturateScale(color.result.hex()).map((color, index) => {
                return <div
                  key={index}
                  className="colorBox50"
                  style={{
                    backgroundColor: color,
                    color: complimentTextForColor(color)
                   }}
                  onClick={this.copy(color)}
                >{color}</div>;
              })
            }
            <div className="colorBox100" style={{ backgroundColor: color.result.hex() }} ></div>
            {
              desaturateScale(color.result.hex()).map((color, index) => {
                return <div
                  key={index}
                  className="colorBox50"
                  style={{
                    backgroundColor: color,
                    color: complimentTextForColor(color)
                   }}
                  onClick={this.copy(color)}
                >{color}</div>;
              })
            }
          </div>
        </React.Fragment>
      );
    }
  };

  render() {
    const { color } = this.props;

    if (color.error || typeof color.result === 'number' || color.result === null) {
      return null;
    }

    return (
      <div className='calculatorColor row'>
        <div className='color100' style={{ backgroundColor: color.resultStr }} />
        <div>
          <div className="tabs">
            <div className={this.isActiveTab('convert') ? 'tab active' : 'tab'} onClick={() => this.tab('convert')}>Convert</div>
            <div className={this.isActiveTab('shade') ? 'tab active' : 'tab'} onClick={() => this.tab('shade')}>Shades</div>
            <div className={this.isActiveTab('palette') ? 'tab active' : 'tab'} onClick={() => this.tab('palette')}>Palette</div>
          </div>
          {
            this.renderTab()
          }
        </div>
      </div>
    );
  }
}
