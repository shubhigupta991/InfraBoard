'use client';
import { useState, useEffect, ReactElement, FunctionComponent } from 'react';
import { Dictionary,  } from 'lodash';
import eventBus from '../../events/eventBus';
import {
  CallbackFunction,
  INodeItem,
} from '../../types';
import { IJsPlumb } from './useJsPlumb';
import Drag from 'components/drag';


export interface ICanvasProps {
  nodes: Dictionary<INodeItem>;
  canvasPosition: any;
  onCanvasUpdate: CallbackFunction;
  onCanvasClick: CallbackFunction;
  setTemplateToEdit: CallbackFunction;
  setNodeToDelete: CallbackFunction;
  selectedNodes: Record<string, any>;

  jsPlumb: IJsPlumb;
}

export const Canvas: FunctionComponent<ICanvasProps> = (
  props: ICanvasProps
): ReactElement => {
  const {
    nodes,
    canvasPosition,
    onCanvasUpdate,
    onCanvasClick,
    setTemplateToEdit,
    setNodeToDelete,
    selectedNodes,
    jsPlumb,
  } = props;

  const [dragging, setDragging] = useState(false);
  const [scale, setScale] = useState(1);
  const [_scale, _setScale] = useState(1);
  const [_left, _setLeft] = useState(0);
  const [_top, _setTop] = useState(0);
  const [_initX, _setInitX] = useState(0);
  const [_initY, _setInitY] = useState(0);

  const onCanvasMousewheel = (e: any) => {
    if (e.deltaY < 0) {
      _setScale(_scale + _scale * 0.25);
      setScale(_scale + _scale * 0.25);
    }

    if (e.deltaY > 0) {
      _setScale(_scale - _scale * 0.25);
      setScale(_scale - _scale * 0.25);
    }
  };

  const onCanvasMouseMove = (e: any) => {
    if (!dragging) {
      return;
    }

    if (e.pageX && e.pageY) {
      const styles = {
        left: _left + e.pageX - _initX + 'px',
        top: _top + e.pageY - _initY + 'px',
      };
      jsPlumb.setStyle(styles);
    }
  };

  const onCanvasMouseUpLeave = (e: any) => {
    if (dragging && e.pageX && e.pageY) {
      const left = _left + e.pageX - _initX;
      const top = _top + e.pageY - _initY;

      _setLeft(left);
      _setTop(top);
      setDragging(false);
      onCanvasUpdate({
        left: left,
        top: top,
      });
    }
  };

  const onCanvasMouseDown = (e: any) => {
    if (e.pageX && e.pageY) {
      _setInitX(e.pageX);
      _setInitY(e.pageY);
      setDragging(true);
    }
  };

  useEffect(() => {
    jsPlumb.setZoom(_scale);
  }, [_scale]);

  useEffect(() => {
    onCanvasUpdate({
      scale: scale,
    });
  }, [scale]);

  useEffect(() => {
    const styles = {
      left: _left + 'px',
      top: _top + 'px',
    };

    jsPlumb.setStyle(styles);
  }, [_left, _top, jsPlumb.setStyle]);

  useEffect(() => {
    _setTop(canvasPosition.top);
    _setLeft(canvasPosition.left);
    _setScale(canvasPosition.scale);
  }, [canvasPosition]);

  useEffect(() => {
    eventBus.on('NODE_DELETED', (data: any) => {
      jsPlumb.removeEndpoint(data.detail.message.node);
    });

    return () => {
      eventBus.remove('NODE_DELETED', () => undefined);
    };
  }, []);

  return (
    <>
      {nodes && (
        <div
          className="jsplumb-box"
          onWheel={onCanvasMousewheel}
          onMouseMove={onCanvasMouseMove}
          onMouseDown={onCanvasMouseDown}
          onMouseUp={onCanvasMouseUpLeave}
          onMouseLeave={onCanvasMouseUpLeave}
          onContextMenu={(event) => {
            event.stopPropagation();
            event.preventDefault();
          }}
        >
          <Drag />
        </div>
      )}
    </>
  );
};
