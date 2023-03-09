import React, {Component} from "react";
import ResizeObserver from 'rc-resize-observer';
import './graph.css'
import {clicked, drawCanvas} from "../../../app/canvas";

class Graph extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ResizeObserver
                onResize={(dimensions) => {
                    const MAX_DIMENSION = 350
                    try {
                      const canvas = document.getElementById("canvas")
                      const screenW = window.innerWidth
                      if (screenW > MAX_DIMENSION * 3) {
                        canvas.width = Math.min(Math.min(dimensions.width, dimensions.height), screenW / 3)
                        canvas.height = Math.min(Math.min(dimensions.width, dimensions.height), screenW / 3)
                      } else {
                        if (canvas.width !== Math.min(screenW, MAX_DIMENSION)) {
                          canvas.width = Math.min(screenW, MAX_DIMENSION)
                          canvas.height = Math.min(screenW, MAX_DIMENSION)
                        }
                      }
                      drawCanvas(canvas)
                    } catch (e) {
                      console.log(e.message)
                    }
                }}
            >
                <div ref={this.ref} id={"canvas-wrapper"} className={"canvas-wrapper"}>
                    <canvas id="canvas" width={2800} height={2800}
                            onClick={(e) => {
                                clicked(e, this.props.submitInfo)
                            }}/>
                </div>
            </ResizeObserver>
        )
    }

}

export default Graph;
