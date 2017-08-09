import React, { Component } from 'react';
import WorldWind from '@nasaworldwind/worldwind';

class WorldWindComponent extends Component{

    shouldComponentUpdate(){
        // WorldWind is not a regular React UI component. It should
        // be loaded once and never be updated again
        return false;
    }

    componentDidMount(){
        // Code to execute when the component is called and mounted.
        // Usual WorldWind boilerplate (creating WorldWindow, 
        // adding layers, etc.) applies here.
        
        // Create a World Window for the canvas. Note passing the
        // Canvas id through a React ref.
        this.wwd = new WorldWind.WorldWindow(this.refs.canvasOne.id);
        
        // Add layers to the WorldWindow
        this.wwd.addLayer(new WorldWind.BMNGOneImageLayer());
        this.wwd.addLayer(new WorldWind.BingAerialWithLabelsLayer());
        
        // Add a compass, a coordinates display and some view controls to the World Window.
        this.wwd.addLayer(new WorldWind.CompassLayer());
        this.wwd.addLayer(new WorldWind.CoordinatesDisplayLayer(this.wwd));
        this.wwd.addLayer(new WorldWind.ViewControlsLayer(this.wwd));

        var kmlFilePromise = new KmlFile('data/KML_Samples.kml', [new KmlTreeVisibility('treeControls', this.wwd)]);
        kmlFilePromise.then(function (kmlFile) {
            var renderableLayer = new WorldWind.RenderableLayer("Surface Shapes");
            renderableLayer.currentTimeInterval = [
                new Date("Mon Aug 09 2015 12:10:10 GMT+0200 (Střední Evropa (letní čas))").valueOf(),
                new Date("Mon Aug 11 2015 12:10:10 GMT+0200 (Střední Evropa (letní čas))").valueOf()
            ];
            renderableLayer.addRenderable(kmlFile);

            this.wwd.addLayer(renderableLayer);
            this.wwd.redraw();
        });

        var highlightController = new WorldWind.HighlightController(this.wwd);

    }

    render() {
        const style = {
            flexGrow: 1,
            width: '100vw'
        }
        
        // JSX code to create canvas with WorldWindow
        return(
            <canvas id="canvasOne" ref="canvasOne" style={style}>
                Your browser does not support HTML5 Canvas.
            </canvas>
        )
    }
}

export default WorldWindComponent;