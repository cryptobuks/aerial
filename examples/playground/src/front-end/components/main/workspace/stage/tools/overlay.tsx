import "./overlay.scss";
const cx = require("classnames");
import * as React from "react";
import * as Hammer from "react-hammerjs";
import { Workspace } from "front-end/state";
import { mapValues, values } from "lodash";
import { compose, pure, withHandlers } from "recompose";
import { SyntheticNode, SyntheticWindow, SyntheticBrowser } from "aerial-browser-sandbox";
import { Dispatcher, Box, wrapEventToDispatch, weakMemo, StructReference } from "aerial-common2";
import { 
  stageToolOverlayMouseClicked,
  stageToolOverlayMouseMoved,
  stageToolOverlayMousePanStart,
  stageToolOverlayMousePanning,
  stageToolOverlayMousePanEnd,
  stageToolOverlayMouseDoubleClicked,
} from "front-end/actions";

export type VisualToolsComponentProps = {
  workspace: Workspace;
  browser: SyntheticBrowser;
  dispatch: Dispatcher<any>;
};

type WindowOverlayToolsOuterProps = {
  dispatch: Dispatcher<any>;
  window: SyntheticWindow;
  zoom: number;
  hoveringNodes: SyntheticNode[];
};

type WindowOverlayToolsInnerProps = {
  onPanStart(event: any);
  onPan(event: any);
  onPanEnd(event: any);
} & WindowOverlayToolsOuterProps;

type NodeOverlayProps = {
  windowId: string;
  box: Box;
  zoom: number;
  hovering: boolean;
  node: SyntheticNode;
  dispatch: Dispatcher<any>;
};

const NodeOverlayBase = ({ windowId, zoom, box, node, dispatch, hovering }: NodeOverlayProps) => {

  const borderWidth = 2 / zoom;

  const style = {
    left: box.left,
    top: box.top,
    width: box.right - box.left,
    pointerEvents: "none",
    height: box.bottom - box.top,
    boxShadow: `inset 0 0 0 ${borderWidth}px #00B5FF`,
  };

  return <div 
  className={cx("visual-tools-node-overlay", { hovering: hovering })}
  style={style} />;
}

const NodeOverlay = pure(NodeOverlayBase as any) as typeof NodeOverlayBase;

const WindowOverlayToolsBase = ({ dispatch, window, hoveringNodes, zoom, onPanStart, onPan, onPanEnd }: WindowOverlayToolsInnerProps) => {

  const style = {
    position: "absolute",
    left: window.box.left,
    top: window.box.top,
    width: window.box.right - window.box.left,
    height: window.box.bottom - window.box.top
  };

  return <div style={style as any}>
    <Hammer onPanStart={onPanStart} onPan={onPan} onPanEnd={onPanEnd} direction="DIRECTION_ALL">
      <div 
        style={{ width: "100%", height: "100%", position: "absolute" } as any} 
        onMouseMove={wrapEventToDispatch(dispatch, stageToolOverlayMouseMoved.bind(this, window.$$id))} 
        onClick={wrapEventToDispatch(dispatch, stageToolOverlayMouseClicked.bind(this, window.$$id))} 
        onDoubleClick={wrapEventToDispatch(dispatch, stageToolOverlayMouseDoubleClicked.bind(this, window.$$id))} 
        onMouseLeave={wrapEventToDispatch(dispatch, stageToolOverlayMouseMoved.bind(this, window.$$id))}
        />
    </Hammer>
    {
      hoveringNodes.map((node) => <NodeOverlay 
        windowId={window.$$id} 
        zoom={zoom} 
        key={node.$$id} 
        node={node} 
        box={window.computedBoxes[node.$$id]} 
        dispatch={dispatch} 
        hovering={true} />)
    }
  </div>
};

const enhanceWindowOverlayTools = compose<WindowOverlayToolsInnerProps, WindowOverlayToolsOuterProps>(
  pure,
  withHandlers({
    onPanStart: ({ dispatch, window }: WindowOverlayToolsOuterProps) => (event) => {
      dispatch(stageToolOverlayMousePanStart(window.$$id));
    },
    onPan: ({ dispatch, window }: WindowOverlayToolsOuterProps) => (event) => {
      dispatch(stageToolOverlayMousePanning(window.$$id, { left: event.center.x, top: event.center.y }, event.deltaY, event.overallVelocityY));
    },
    onPanEnd: ({ dispatch, window }: WindowOverlayToolsOuterProps) => (event) => {
      setImmediate(() => {
        dispatch(stageToolOverlayMousePanEnd(window.$$id));
      });
    }
  })
);

const WindowOverlayTools = enhanceWindowOverlayTools(WindowOverlayToolsBase);


const getHoveringSyntheticNodes = weakMemo((hoveringRefs: StructReference[], { allNodes }: SyntheticWindow) => {
  return hoveringRefs.map(([type, id]) => allNodes[id]).filter((id) => !!id);
});

export const NodeOverlaysToolComponentBase = ({ workspace, browser, dispatch }: VisualToolsComponentProps) => {
  return <div className="visual-tools-layer-component">
    {
      browser.windows.map((window) => {
        return <WindowOverlayTools key={window.$$id} hoveringNodes={getHoveringSyntheticNodes(workspace.hoveringRefs, window)} window={window} dispatch={dispatch} zoom={workspace.stage.translate.zoom} />;
      })
    }
  </div>
}

export const NodeOverlaysToolComponent = pure(NodeOverlaysToolComponentBase as any) as typeof NodeOverlaysToolComponentBase;